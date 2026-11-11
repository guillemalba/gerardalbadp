<template>
  <section class="hero">
    <div class="hero-video">
      <iframe :src="videoEmbedUrl" ref="videoIframe" title="Showreel" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="hero-shade"></div>

    <div class="hero-copy">
      <h1 class="hero-name">Gerard Alba</h1>
      <p class="hero-role label">Director of Photography</p>
    </div>

    <button class="hero-cue label" @click="$emit('scrollDown')" aria-label="Scroll to work">
      <span>Work</span>
      <i class="cue-line"></i>
    </button>
  </section>
</template>

<script>
export default {
  name: 'BackgroundVideo',
  emits: ['scrollDown'],
  props: {
    videoSrc: {
      type: String,
      required: true
    }
  },
  computed: {
    videoEmbedUrl() {
      const videoId = this.videoSrc.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1`;
    }
  },
  mounted() {
    this.adjustVideoSize();
    window.addEventListener('resize', this.adjustVideoSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustVideoSize);
  },
  methods: {
    adjustVideoSize() {
      const iframe = this.$refs.videoIframe;
      const hero = this.$el;
      if (!iframe || !hero) return;
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      const ratio = 16 / 9;
      if (w / h < ratio) {
        iframe.style.width = `${h * ratio}px`;
        iframe.style.height = `${h}px`;
      } else {
        iframe.style.width = `${w}px`;
        iframe.style.height = `${w / ratio}px`;
      }
    }
  }
};
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
  min-height: 560px;
  overflow: hidden;
  background: #000;
}

.hero-video { position: absolute; inset: 0; }
.hero-video iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* keeps text legible over any frame */
.hero-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%);
  pointer-events: none;
}

.hero-copy {
  position: absolute;
  left: calc(var(--rail) + var(--gutter));
  right: calc(var(--rail) + var(--gutter));
  bottom: clamp(72px, 12vh, 140px);
  display: flex;
  flex-direction: column;
  gap: 14px;
  animation: rise 1.2s var(--ease) both;
}

.hero-name {
  font-size: clamp(48px, 9vw, 148px);
  line-height: 0.95;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}

.hero-role { color: var(--ink-dim); }

.hero-cue {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: var(--tap);
  min-height: var(--tap);
  background: none;
  border: none;
  color: var(--ink-dim);
  cursor: pointer;
  transition: color var(--t);
}
.cue-line {
  display: block;
  width: 1px;
  height: 34px;
  background: var(--ink-faint);
  position: relative;
  overflow: hidden;
}
.cue-line::after {
  content: '';
  position: absolute;
  left: 0; top: 0;
  width: 1px; height: 100%;
  background: var(--accent);
  animation: cue 2.4s var(--ease) infinite;
}

@media (hover: hover) {
  .hero-cue:hover { color: var(--accent); }
}

@keyframes rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}
@keyframes cue {
  0% { transform: translateY(-100%); }
  60%, 100% { transform: translateY(100%); }
}

@media (max-width: 1000px) {
  .hero-copy { left: var(--gutter); right: var(--gutter); bottom: 96px; }
  .hero-name { font-size: clamp(44px, 14vw, 96px); }
}
</style>
