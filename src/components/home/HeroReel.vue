<template>
  <section class="hero" aria-label="Showreel">
    <div class="frame">
      <img class="poster" :src="poster" alt="" aria-hidden="true">
      <iframe
        class="reel"
        :class="{ ready }"
        :src="src"
        title="Gerard Alba showreel"
        frameborder="0"
        allow="autoplay; picture-in-picture"
        tabindex="-1"
        @load="onLoad"
      ></iframe>
      <div class="vignette" aria-hidden="true"></div>

      <!-- viewfinder HUD -->
      <div class="hud-layer" aria-hidden="true">
        <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
        <i class="cross"></i>
        <div class="hud hud-tl"><span class="rec-dot"></span> REC <span class="tc">{{ timecode }}</span></div>
        <div class="hud hud-tr">Showreel · 24 fps</div>
      </div>
    </div>

    <!-- letterbox bars -->
    <div class="bar bar-top" aria-hidden="true"></div>
    <div class="bar bar-bottom">
      <div class="bottom-row">
        <p class="hud role">Director of Photography<span class="sep">/</span>Barcelona</p>
        <button class="play-reel hud" @click="$emit('play')">
          <span class="ring"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>
          Play reel with sound
        </button>
      </div>
    </div>

    <h1 class="title serif" aria-label="Gerard Alba">
      <span class="line"><span>Gerard</span></span>
      <span class="line"><em>Alba</em></span>
    </h1>
  </section>
</template>

<script>
import { embedUrl } from '@/data/vimeo';
import { REEL_ID } from '@/data/projects';

export default {
  name: 'HeroReel',
  emits: ['play'],
  data() {
    return {
      ready: false,
      timecode: '00:00:00:00',
      src: embedUrl(REEL_ID, { background: 1, muted: 1, loop: 1 }),
      poster: require('@/assets/img/films.jpg'),
    };
  },
  mounted() {
    this.start = performance.now();
    const tick = () => {
      const f = Math.floor(((performance.now() - this.start) / 1000) * 24);
      const ff = f % 24, s = Math.floor(f / 24) % 60, m = Math.floor(f / 1440) % 60, h = Math.floor(f / 86400);
      const p = n => String(n).padStart(2, '0');
      this.timecode = `${p(h)}:${p(m)}:${p(s)}:${p(ff)}`;
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  },
  beforeUnmount() {
    cancelAnimationFrame(this.raf);
  },
  methods: {
    onLoad() {
      // Vimeo fires load before the first frame; give it a beat before fading in
      setTimeout(() => { this.ready = true; }, 600);
    },
  },
};
</script>

<style scoped>
.hero {
  --bar: clamp(56px, calc((100svh - 100vw / 2.39) / 2), 16svh);
  position: relative;
  height: 100vh;
  height: 100svh;
  min-height: 560px;
  overflow: hidden;
  background: #000;
}

.frame { position: absolute; inset: 0; overflow: hidden; }

.poster, .reel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: max(100vw, 177.78svh);
  height: max(56.25vw, 100svh);
  transform: translate(-50%, -50%);
  object-fit: cover;
  border: 0;
}
.poster { filter: saturate(0.9) brightness(0.8); animation: settle 2.4s var(--ease) both; }
.reel { pointer-events: none; opacity: 0; transition: opacity 1.2s var(--ease); }
.reel.ready { opacity: 1; }

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.55));
}

/* ---------- letterbox: closed shutter → 2.39:1 ---------- */
.bar {
  position: absolute;
  left: 0;
  right: 0;
  height: var(--bar);
  background: var(--bg);
  z-index: 3;
  animation: open 1.6s var(--ease-io) 0.2s both;
}
.bar-top { top: 0; --from: 50svh; }
.bar-bottom { bottom: 0; --from: 50svh; }
@keyframes open {
  from { height: 50.5svh; }
  to { height: var(--bar); }
}

.bottom-row {
  position: absolute;
  left: var(--edge);
  right: var(--edge);
  bottom: 0;
  height: min(var(--bar), 96px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  animation: fade 0.8s var(--ease) 1.5s both;
}
.role { color: var(--ink-2); }
.sep { margin: 0 10px; color: var(--ink-3); }

.play-reel {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: var(--tap);
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
  color: var(--ink);
  transition: color 0.25s;
}
.ring {
  width: var(--tap);
  height: var(--tap);
  border-radius: 50%;
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  transition: background 0.35s var(--ease), border-color 0.35s, color 0.35s, transform 0.35s var(--ease);
}
.ring svg { width: 16px; height: 16px; margin-left: 2px; }
.play-reel:active .ring { transform: scale(0.92); }
@media (hover: hover) {
  .play-reel:hover { color: var(--rec); }
  .play-reel:hover .ring { background: var(--rec); border-color: var(--rec); color: #000; }
}

/* ---------- viewfinder HUD ---------- */
.hud-layer {
  position: absolute;
  inset: calc(var(--bar) + 18px) var(--edge);
  z-index: 2;
  animation: fade 1s var(--ease) 1.4s both;
}
.corner { position: absolute; width: 22px; height: 22px; border: 0 solid rgba(255, 255, 255, 0.75); }
.tl { top: 0; left: 0; border-top-width: 1px; border-left-width: 1px; }
.tr { top: 0; right: 0; border-top-width: 1px; border-right-width: 1px; }
.bl { bottom: 0; left: 0; border-bottom-width: 1px; border-left-width: 1px; }
.br { bottom: 0; right: 0; border-bottom-width: 1px; border-right-width: 1px; }
.cross { position: absolute; left: 50%; top: 50%; width: 18px; height: 18px; transform: translate(-50%, -50%); }
.cross::before, .cross::after { content: ''; position: absolute; background: rgba(255, 255, 255, 0.55); }
.cross::before { left: 50%; top: 0; bottom: 0; width: 1px; }
.cross::after { top: 50%; left: 0; right: 0; height: 1px; }
.hud-tl, .hud-tr { position: absolute; top: 14px; color: rgba(255, 255, 255, 0.85); display: flex; align-items: center; gap: 8px; }
.hud-tl { left: 34px; }
.hud-tr { right: 34px; }
.tc { margin-left: 6px; }

/* ---------- title, sits across the bottom of the frame ---------- */
.title {
  position: absolute;
  z-index: 4;
  left: var(--edge);
  right: var(--edge);
  bottom: calc(min(var(--bar), 96px) + 4px);
  font-size: clamp(64px, 15.5vw, 260px);
  line-height: 0.82;
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.22em;
  pointer-events: none;
  mix-blend-mode: difference;
  color: #fff;
}
.line { display: block; overflow: hidden; padding-bottom: 0.06em; }
.line > * { display: block; animation: up 1.3s var(--ease) both; }
.line:nth-child(1) > * { animation-delay: 1s; }
.line:nth-child(2) > * { animation-delay: 1.12s; }
em { font-style: italic; }

@keyframes up { from { transform: translateY(140%); } to { transform: none; } }
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes settle { from { transform: translate(-50%, -50%) scale(1.12); } to { transform: translate(-50%, -50%) scale(1); } }

@media (max-width: 760px) {
  .hero { --bar: 13svh; }
  .hud-tr, .bl, .br, .role { display: none; }
  .hud-tl { left: 30px; }
  .play-reel { margin-left: auto; margin-right: auto; }
  .title { font-size: clamp(64px, 24vw, 140px); flex-direction: column; bottom: calc(var(--bar) + 8px); }
}
</style>
