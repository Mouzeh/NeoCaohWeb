<script setup lang="ts">
import gsap from "gsap";

// Envuelve una carta y la inclina en 3D siguiendo el cursor
const props = withDefaults(defineProps<{ max?: number }>(), { max: 12 });

const el = ref<HTMLElement | null>(null);
const shine = ref<HTMLElement | null>(null);
let rx: gsap.QuickToFunc | undefined;
let ry: gsap.QuickToFunc | undefined;

onMounted(() => {
  if (!el.value) return;
  rx = gsap.quickTo(el.value, "rotationX", { duration: 0.5, ease: "power3.out" });
  ry = gsap.quickTo(el.value, "rotationY", { duration: 0.5, ease: "power3.out" });
});

function onMove(e: PointerEvent) {
  if (e.pointerType !== "mouse" || !el.value) return;
  const r = el.value.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  ry?.((px - 0.5) * props.max * 2);
  rx?.((0.5 - py) * props.max * 2);
  if (shine.value) {
    shine.value.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.45), transparent 55%)`;
    shine.value.style.opacity = "1";
  }
}

function onLeave() {
  rx?.(0);
  ry?.(0);
  if (shine.value) shine.value.style.opacity = "0";
}
</script>

<template>
  <div class="[perspective:900px]" @pointermove="onMove" @pointerleave="onLeave">
    <div ref="el" class="relative [transform-style:preserve-3d] will-change-transform">
      <slot />
      <span
        ref="shine"
        class="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 mix-blend-overlay pointer-events-none"
        aria-hidden="true"
      />
    </div>
  </div>
</template>
