<template>
  <a class="skip" href="#work" @click.prevent="skipToWork">Skip to work</a>
  <SiteNav />
  <router-view v-slot="{ Component, route }">
    <transition name="cut" mode="out-in">
      <component :is="Component" :key="route.name" />
    </transition>
  </router-view>
  <div class="grain" aria-hidden="true"></div>
</template>

<script>
import SiteNav from './components/SiteNav.vue';
import { PROJECTS, REEL_ID } from './data/projects';
import { loadAll } from './data/vimeo';

export default {
  name: 'App',
  components: { SiteNav },
  created() {
    loadAll([REEL_ID, ...PROJECTS.map(p => p.id)]);
  },
  methods: {
    skipToWork() {
      this.$router.push({ name: 'Home', hash: '#work' });
    },
  },
};
</script>

<style>
/* ======================================================
   design-3 · "Viewfinder"
   Instrument Serif (display) + Geist Mono (camera HUD)
   ====================================================== */
:root {
  --bg: #0b0b0a;
  --bg-2: #141413;
  --ink: #ecebe6;
  --ink-2: rgba(236, 235, 230, 0.6);
  --ink-3: rgba(236, 235, 230, 0.32);
  --line: rgba(236, 235, 230, 0.14);
  --rec: #ff4d2e;

  --serif: 'Instrument Serif', 'Times New Roman', serif;
  --mono: 'Geist Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;

  --edge: clamp(16px, 3.2vw, 44px);
  --nav-h: 64px;
  --tap: 44px;
  --ease: cubic-bezier(0.2, 0.7, 0.1, 1);
  --ease-io: cubic-bezier(0.7, 0, 0.2, 1);
}

*, *::before, *::after { box-sizing: border-box; }

html {
  overflow-x: hidden;
  overflow-x: clip;
  background: var(--bg);
  color: var(--ink);
  -webkit-text-size-adjust: 100%;
  scrollbar-color: #2a2a28 var(--bg);
}

body {
  margin: 0;
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
  overflow-x: clip;
  width: 100%;
}

#app { min-height: 100vh; }

img { display: block; max-width: 100%; }
a { color: inherit; }
button { font: inherit; color: inherit; }
h1, h2, h3, p { margin: 0; font-weight: 400; }

::selection { background: var(--rec); color: #000; }
:focus-visible { outline: 1.5px solid var(--rec); outline-offset: 3px; }

/* Mono HUD label */
.hud {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
}

.serif { font-family: var(--serif); font-weight: 400; letter-spacing: -0.02em; }

/* Underline that draws on hover */
.draw {
  text-decoration: none;
  background: linear-gradient(currentColor, currentColor) left 100% / 0 1px no-repeat;
  transition: background-size 0.45s var(--ease);
}
@media (hover: hover) { .draw:hover { background-size: 100% 1px; } }

/* REC dot */
.rec-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--rec);
  box-shadow: 0 0 12px rgba(255, 77, 46, 0.7);
  animation: blink 1.6s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0.15; } }

.skip {
  position: fixed; left: 12px; top: 12px; z-index: 9999;
  padding: 10px 14px; background: var(--ink); color: #000;
  transform: translateY(-200%);
  font-size: 12px;
}
.skip:focus { transform: none; }

/* Film grain overlay: one static noise tile, very low opacity */
.grain {
  position: fixed;
  inset: 0;
  z-index: 9000;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  animation: grain 0.9s steps(3) infinite;
}
/* moves the noise texture, not the layer, so nothing ever leaves the viewport */
@keyframes grain {
  0% { background-position: 0 0; }
  33% { background-position: -37px 23px; }
  66% { background-position: 29px -41px; }
}

/* Route change: a hard "cut" through black */
.cut-enter-active { transition: opacity 0.5s var(--ease); }
.cut-leave-active { transition: opacity 0.25s var(--ease-io); }
.cut-enter-from, .cut-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
