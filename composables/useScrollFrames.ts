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
  let loaded = 0,
    currentIdx = -1,
    tickPending = false;

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

  function onScroll() {
    if (tickPending) return;
    tickPending = true;
    requestAnimationFrame(() => {
      const container = scrollContainer.value;
      if (!container) {
        tickPending = false;
        return;
      }
      const maxScroll = container.scrollHeight - window.innerHeight;
      const frac = Math.max(
        0,
        Math.min(1, (window.scrollY - container.offsetTop) / maxScroll),
      );
      drawFrame(Math.min(frameCount - 1, Math.floor(frac * frameCount)));
      tickPending = false;
    });
  }

  function activate() {
    if (isReady.value) return;
    isReady.value = true;
    drawFrame(0);
    window.addEventListener("scroll", onScroll, { passive: true });
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

  onUnmounted(() => window.removeEventListener("scroll", onScroll));
  return { canvasRef, progress, isReady, init };
}
