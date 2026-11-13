<template>
  <main class="project">
    <div class="screen-wrap">
      <div class="topline hud">
        <span><span class="rec-dot"></span> Playing{{ context ? ' · ' + context.title : '' }}</span>
        <span v-if="position">{{ position }}</span>
        <button class="close" aria-label="Close and go back to the work" @click="close">
          Close
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.5"/></svg>
        </button>
      </div>

      <div class="screen">
        <iframe
          :key="id"
          :src="src"
          :title="video.title || 'Video'"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>

    <section class="details">
      <h1 class="serif title">{{ video.title }}</h1>

      <dl class="meta">
        <div v-if="tags"><dt class="hud">Category</dt><dd>{{ tags }}</dd></div>
        <div v-if="video.duration"><dt class="hud">Runtime</dt><dd>{{ video.duration }}</dd></div>
        <div v-if="video.year"><dt class="hud">Year</dt><dd>{{ video.year }}</dd></div>
      </dl>

      <div v-if="description" class="credits" :class="{ open: showAll }">
        <div class="credits-text" v-html="description"></div>
        <button v-if="long" class="more hud" @click="showAll = !showAll">{{ showAll ? 'Less' : 'Full credits' }} <span>{{ showAll ? '−' : '+' }}</span></button>
      </div>
    </section>

    <nav v-if="next" class="next" aria-label="Next project">
      <router-link :to="linkTo(next.id)" class="next-link">
        <img v-if="nextVideo.thumb" :src="nextVideo.thumb" alt="" loading="lazy">
        <span class="next-shade"></span>
        <span class="hud next-label">Next <span class="arrow">→</span></span>
        <span class="serif next-title">{{ nextVideo.title }}</span>
      </router-link>
      <router-link v-if="prev && prev.id !== next.id" :to="linkTo(prev.id)" class="prev-link hud">← Previous · {{ prevVideo.title }}</router-link>
    </nav>
  </main>
</template>

<script>
import { PROJECTS, projectsIn, categoryBySlug } from '@/data/projects';
import store, { loadVideo, embedUrl } from '@/data/vimeo';

export default {
  name: 'ProjectView',
  props: { id: { type: String, required: true } },
  data() {
    return { showAll: false };
  },
  computed: {
    project() {
      return PROJECTS.find(p => p.id === this.id);
    },
    video() {
      loadVideo(this.id);
      return store[this.id] || {};
    },
    src() {
      return embedUrl(this.id);
    },
    contextSlug() {
      const q = this.$route.query.c;
      if (q && categoryBySlug(q)) return q;
      return this.project ? this.project.categories[0] : '';
    },
    context() {
      return this.contextSlug ? categoryBySlug(this.contextSlug) : null;
    },
    siblings() {
      return this.project ? projectsIn(this.contextSlug) : PROJECTS;
    },
    index() {
      return this.siblings.findIndex(p => p.id === this.id);
    },
    position() {
      if (this.index < 0) return '';
      return `${String(this.index + 1).padStart(2, '0')} / ${String(this.siblings.length).padStart(2, '0')}`;
    },
    next() {
      const list = this.siblings.length > 1 ? this.siblings : PROJECTS;
      const i = list.findIndex(p => p.id === this.id);
      return list[(i + 1) % list.length];
    },
    prev() {
      if (this.siblings.length < 3) return null;
      return this.siblings[(this.index - 1 + this.siblings.length) % this.siblings.length];
    },
    nextVideo() {
      return (this.next && store[this.next.id]) || {};
    },
    prevVideo() {
      return (this.prev && store[this.prev.id]) || {};
    },
    tags() {
      return this.project ? this.project.categories.map(s => categoryBySlug(s).title).join(', ') : 'Showreel';
    },
    description() {
      const d = (this.video.description || '').trim();
      // Vimeo v2 descriptions arrive with <br /> already; keep only line breaks and plain text
      return d.replace(/<(?!br\s*\/?)[^>]+>/gi, '').replace(/\n/g, '<br>').replace(/(\s*<br\s*\/?>\s*){3,}/gi, '<br><br>');
    },
    long() {
      return (this.video.description || '').length > 280;
    },
  },
  watch: {
    id() {
      this.showAll = false;
    },
  },
  mounted() {
    window.addEventListener('keydown', this.onKey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKey);
  },
  methods: {
    linkTo(id) {
      return { name: 'Project', params: { id }, query: this.$route.query.c ? { c: this.$route.query.c } : {} };
    },
    close() {
      const back = window.history.state && window.history.state.back;
      if (back && back.startsWith('/') && !back.startsWith('/work/')) this.$router.back();
      else this.$router.push({ name: 'Home', hash: '#work' });
    },
    onKey(e) {
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowRight' && this.next) this.$router.replace(this.linkTo(this.next.id));
      if (e.key === 'ArrowLeft' && this.prev) this.$router.replace(this.linkTo(this.prev.id));
    },
  },
};
</script>

<style scoped>
.project { min-height: 100vh; padding-top: var(--nav-h); }

.screen-wrap {
  --w: min(calc(100vw - var(--edge) * 2), calc((100svh - var(--nav-h) - 96px) * 16 / 9));
  width: var(--w);
  margin: 0 auto;
  padding-top: 12px;
}
.topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: var(--tap);
  color: var(--ink-2);
}
.topline > span:first-child { display: inline-flex; align-items: center; gap: 10px; color: var(--ink); }
.close {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: var(--tap);
  padding: 0 0 0 12px;
  background: none;
  border: 0;
  color: var(--ink);
  cursor: pointer;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  transition: color 0.25s;
}
.close svg { width: 18px; height: 18px; transition: transform 0.4s var(--ease); }
@media (hover: hover) {
  .close:hover { color: var(--rec); }
  .close:hover svg { transform: rotate(90deg); }
}

.screen {
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
  box-shadow: 0 40px 120px rgba(0, 0, 0, 0.6);
  animation: projector 0.9s var(--ease) both;
}
.screen iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
@keyframes projector {
  from { opacity: 0; clip-path: inset(48% 0 48% 0); }
  to { opacity: 1; clip-path: inset(0 0 0 0); }
}

/* ---------- details ---------- */
.details {
  padding: 72px var(--edge) 96px;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: clamp(12px, 1.6vw, 24px);
  row-gap: 40px;
}
.title {
  grid-column: 1 / -1;
  font-size: clamp(48px, 8vw, 140px);
  line-height: 0.92;
  max-width: 14ch;
}
.meta { grid-column: 1 / 5; margin: 0; border-top: 1px solid var(--line); align-self: start; }
.meta div { display: grid; grid-template-columns: 96px 1fr; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--line); }
dt { color: var(--ink-2); }
dd { margin: 0; }

.credits { grid-column: 6 / -1; }
.credits-text {
  font-size: 13px;
  line-height: 1.75;
  color: var(--ink-2);
  max-height: 11em;
  overflow: hidden;
  -webkit-mask: linear-gradient(#000 60%, transparent);
  mask: linear-gradient(#000 60%, transparent);
  max-width: 64ch;
}
.credits.open .credits-text { max-height: none; -webkit-mask: none; mask: none; }
.credits-text :deep(a) { color: var(--ink); }
.more {
  margin-top: 16px;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  min-height: var(--tap);
  padding: 0 18px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: none;
  color: var(--ink);
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s;
}
@media (hover: hover) { .more:hover { border-color: var(--ink); } }

/* ---------- next ---------- */
.next { padding: 0 var(--edge) 80px; display: flex; flex-direction: column; gap: 16px; }
.next-link {
  position: relative;
  display: block;
  height: 62svh;
  min-height: 360px;
  overflow: hidden;
  color: var(--ink);
  text-decoration: none;
  isolation: isolate;
}
.next-link img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; transition: transform 1.4s var(--ease), filter 0.6s; filter: brightness(0.7) saturate(0.9); }
.next-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent 60%); }
.next-label { position: absolute; top: 24px; left: 24px; display: inline-flex; gap: 10px; align-items: center; }
.arrow { display: inline-block; transition: transform 0.5s var(--ease); }
.next-title { position: absolute; left: 24px; right: 24px; bottom: 20px; font-size: clamp(44px, 8vw, 140px); line-height: 0.92; }
.prev-link { align-self: flex-start; display: inline-flex; align-items: center; min-height: var(--tap); color: var(--ink-2); text-decoration: none; transition: color 0.25s; }
@media (hover: hover) {
  .next-link:hover img { transform: scale(1.03); filter: brightness(0.85) saturate(1); }
  .next-link:hover .arrow { transform: translateX(8px); }
  .prev-link:hover { color: var(--ink); }
}

@media (max-width: 900px) {
  .meta, .credits { grid-column: 1 / -1; }
  .details { padding-top: 40px; row-gap: 28px; }
}
@media (max-width: 760px) {
  .screen-wrap { width: 100%; padding-top: 0; }
  .topline { padding: 0 var(--edge); }
  .topline > span:nth-child(2) { display: none; }
  .next-link { height: 48svh; min-height: 300px; }
}
</style>
