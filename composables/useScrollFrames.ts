import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollFrames(opts: {
  startFrame: number;
  endFrame: number;
  framePath: (n: string) => string;
  videoWidth: number;
  videoHeight: number;
  scrollContainer: Ref<HTMLElement | null>;
  onReady?: () => void;
  onProgress?: (pct: number) => void;
}) {
  const canvasRef = ref<HTMLCanvasElement | null>(null);
  const progress = ref(0);
  const isReady = ref(false);

  const {
    startFrame,
    endFrame,
    framePath,
    videoWidth,
    videoHeight,
    scrollContainer,
    onReady,
    onProgress,
  } = opts;
  const frameCount = endFrame - startFrame + 1;
  const images: HTMLImageElement[] = [];
  const playhead = { frame: 0 };
  let loaded = 0,
    currentIdx = -1,
    tween: gsap.core.Tween | undefined;

  function drawFrame(idx: number) {
    const canvas = canvasRef.value;
    if (!canvas || idx === currentIdx) return;
    const img = images[idx];
    if (!img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    ctx.drawImage(img, 0, 0, videoWidth, videoHeight);
    currentIdx = idx;
  }

  function activate() {
    if (isReady.value) return;
    isReady.value = true;
    drawFrame(0);
    gsap.registerPlugin(ScrollTrigger);
    // El scroll del contenedor controla el frame con un scrub suavizado
    tween = gsap.to(playhead, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: scrollContainer.value,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
      },
      onUpdate: () => drawFrame(playhead.frame),
    });
    onReady?.();
  }

  function init() {
    const canvas = canvasRef.value;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = videoWidth * dpr;
    canvas.height = videoHeight * dpr;
    canvas.getContext("2d")!.scale(dpr, dpr);
    const priorityCount = Math.min(10, frameCount);
    const fallbackTimer = setTimeout(() => {
      if (!isReady.value) activate();
    }, 100);
    for (let i = startFrame; i <= endFrame; i++) {
      const img = new Image();
      img.src = framePath(String(i).padStart(4, "0"));
      img.onload = img.onerror = () => {
        loaded++;
        progress.value = Math.round((loaded / frameCount) * 100);
        onProgress?.(progress.value);
        // Si el frame actual acaba de cargar, píntalo
        if (images[playhead.frame] === img) {
          currentIdx = -1;
          drawFrame(playhead.frame);
        }
        if (loaded === priorityCount && !isReady.value) {
          clearTimeout(fallbackTimer);
          activate();
        }
        if (loaded === frameCount) {
          clearTimeout(fallbackTimer);
          activate();
        }
      };
      images.push(img);
    }
  }

  onUnmounted(() => {
    tween?.scrollTrigger?.kill();
    tween?.kill();
  });
  return { canvasRef, progress, isReady, init };
}
