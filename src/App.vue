<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@font-face {
  font-family: 'NewYork';
  src: url('@/assets/fonts/NewYork.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Baskerville';
  src: url('@/assets/fonts/BASKRV_L.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

/* ---------- Design tokens (design-2) ---------- */
:root {
  --bg: #050505;
  --ink: #f3f0ea;
  --ink-dim: rgba(243, 240, 234, 0.62);
  --ink-faint: rgba(243, 240, 234, 0.28);
  --line: rgba(243, 240, 234, 0.18);
  --accent: #f2d24b;

  --font-display: 'Baskerville', 'Baskerville Old Face', Georgia, serif;
  --font-text: 'NewYork', 'Baskerville', Georgia, serif;

  --rail: 64px;            /* width of each side rail on desktop */
  --gutter: clamp(20px, 4vw, 48px);
  --tap: 44px;             /* minimum interactive size */
  --radius: 999px;
  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
  --t: 0.3s;
}

*, *::before, *::after { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--ink);
  scrollbar-color: #303030 #000;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-display);
  -webkit-font-smoothing: antialiased;
}

#app { min-height: 100vh; display: flex; flex-direction: column; }

h1, h2, h3, h4, h5, h6, p, span, button, a, li {
  font-family: var(--font-display);
  font-weight: 300;
}

h1, h2, h3 { margin: 0; letter-spacing: 0.01em; }

button { color: inherit; font: inherit; }

/* Small uppercase label used across the whole site */
.label {
  font-family: var(--font-text);
  font-size: 12px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

/* Round icon button: the one circular control of the site */
.btn-round {
  width: var(--tap);
  height: var(--tap);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: var(--ink);
  cursor: pointer;
  padding: 0;
  transition: transform var(--t) var(--ease), border-color var(--t), background var(--t), color var(--t);
}
.btn-round:active { transform: scale(0.94); }

/* Pill: the one text button of the site */
.btn-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: var(--tap);
  padding: 0 26px;
  border: 1px solid var(--ink);
  border-radius: var(--radius);
  background: var(--ink);
  color: #000;
  font-family: var(--font-text);
  font-size: 12px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  transition: transform var(--t) var(--ease), background var(--t), color var(--t), border-color var(--t);
}
.btn-pill:active { transform: scale(0.97); }

@media (hover: hover) {
  .btn-round:hover { border-color: var(--accent); color: var(--accent); background: rgba(0, 0, 0, 0.5); }
  .btn-pill:hover { background: var(--accent); border-color: var(--accent); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
</style>
