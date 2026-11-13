<template>
  <section id="work" class="work" aria-labelledby="work-title" @mousemove="moveCursor">
    <header class="head">
      <h2 id="work-title" class="serif">Work<sup class="hud">{{ String(list.length).padStart(2, '0') }}</sup></h2>

      <div class="filters" role="tablist" aria-label="Filter by category">
        <button
          v-for="f in filters"
          :key="f.slug || 'all'"
          role="tab"
          class="chip hud"
          :aria-selected="modelValue === f.slug"
          @click="$emit('update:modelValue', f.slug)"
        >
          {{ f.label }}<span class="n">{{ f.count }}</span>
        </button>
      </div>
    </header>

    <transition-group tag="div" name="grid" class="grid">
      <router-link
        v-for="(p, i) in list"
        :key="p.id"
        :to="{ name: 'Project', params: { id: p.id }, query: modelValue ? { c: modelValue } : {} }"
        class="card"
        :class="{ feature: i === 0, wide: isWide(i) }"
        @mouseenter="hoverIn(p.id)"
        @mouseleave="hoverOut"
      >
        <div class="media">
          <img v-if="meta[p.id] && meta[p.id].thumb" :src="meta[p.id].thumb" :alt="meta[p.id].title" loading="lazy" @error="fallback($event, p.id)">
          <iframe
            v-if="preview === p.id"
            class="preview"
            :class="{ ready: previewReady }"
            :src="previewSrc(p.id)"
            frameborder="0"
            allow="autoplay"
            tabindex="-1"
            aria-hidden="true"
            @load="previewLoaded"
          ></iframe>
        </div>

        <div class="info">
          <span class="hud idx">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="hud tags">{{ tagsOf(p) }}</span>
          <h3 class="serif title">{{ (meta[p.id] && meta[p.id].title) }}</h3>
          <span class="hud time">{{ meta[p.id] && meta[p.id].duration }}</span>
        </div>
      </router-link>
    </transition-group>

    <div v-if="canHover" class="cursor hud" :class="{ on: cursorOn }" :style="cursorStyle" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>Play
    </div>
  </section>
</template>

<script>
import { CATEGORIES, PROJECTS, projectsIn, categoryBySlug } from '@/data/projects';
import store, { embedUrl } from '@/data/vimeo';

export default {
  name: 'WorkGrid',
  props: { modelValue: { type: String, default: '' } },
  emits: ['update:modelValue'],
  data() {
    return {
      meta: store,
      preview: null,
      previewReady: false,
      cursorOn: false,
      cx: 0,
      cy: 0,
      canHover: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    };
  },
  computed: {
    list() {
      return projectsIn(this.modelValue);
    },
    filters() {
      return [
        { slug: '', label: 'All', count: PROJECTS.length },
        ...CATEGORIES.map(c => ({ slug: c.slug, label: c.title, count: projectsIn(c.slug).length })),
      ];
    },
    cursorStyle() {
      return { transform: `translate3d(${this.cx}px, ${this.cy}px, 0)` };
    },
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
  methods: {
    // first card is the feature; after it, cards go in pairs; an odd last one goes full width
    isWide(i) {
      const n = this.list.length;
      return i > 0 && i === n - 1 && (n - 1) % 2 === 1;
    },
    tagsOf(p) {
      return p.categories.map(s => categoryBySlug(s).short).join(' · ');
    },
    previewSrc(id) {
      return embedUrl(id, { background: 1, muted: 1, loop: 1 });
    },
    hoverIn(id) {
      if (!this.canHover) return;
      this.cursorOn = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.previewReady = false;
        this.preview = id;
      }, 450);
    },
    hoverOut() {
      this.cursorOn = false;
      clearTimeout(this.timer);
      this.preview = null;
      this.previewReady = false;
    },
    previewLoaded() {
      setTimeout(() => { this.previewReady = true; }, 500);
    },
    moveCursor(e) {
      if (!this.canHover) return;
      this.cx = e.clientX;
      this.cy = e.clientY;
    },
    fallback(e, id) {
      const small = this.meta[id] && this.meta[id].thumbSmall;
      if (small && e.target.src !== small) e.target.src = small;
    },
  },
};
</script>

<style scoped>
.work {
  padding: 24px var(--edge) 120px;
}

.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px 40px;
  margin-bottom: 40px;
  padding-top: var(--nav-h);
}
h2 { font-size: clamp(72px, 12vw, 200px); line-height: 0.8; }
sup { font-size: 11px; vertical-align: top; margin-left: 10px; color: var(--ink-2); position: relative; top: 0.8em; }

.filters { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: var(--tap);
  padding: 0 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: none;
  color: var(--ink-2);
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s, background 0.25s;
}
.chip .n { font-size: 9px; color: var(--ink-3); }
.chip[aria-selected='true'] { background: var(--ink); border-color: var(--ink); color: #000; }
.chip[aria-selected='true'] .n { color: rgba(0, 0, 0, 0.5); }
.chip:active { transform: scale(0.97); }
@media (hover: hover) {
  .chip:not([aria-selected='true']):hover { color: var(--ink); border-color: var(--ink-2); }
}

/* ---------- grid ---------- */
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(12px, 1.6vw, 24px);
}
.card {
  position: relative;
  display: block;
  color: var(--ink);
  text-decoration: none;
  overflow: hidden;
  background: var(--bg-2);
  isolation: isolate;
}
.card.feature, .card.wide { grid-column: 1 / -1; }

.media { position: relative; aspect-ratio: 16 / 9; overflow: hidden; }
.feature .media { aspect-ratio: 2.39 / 1; }
.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.2s var(--ease), filter 0.6s;
  filter: saturate(0.92);
}
.preview {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  transform: translate(-50%, -50%);
  border: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s var(--ease);
}
.preview.ready { opacity: 1; }

.info {
  position: absolute;
  inset: 0;
  padding: clamp(14px, 1.6vw, 24px);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr auto;
  gap: 6px 16px;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0) 45%),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0) 22%);
  pointer-events: none;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35);
}
.idx { grid-column: 1; grid-row: 1; }
.tags { grid-column: 2; grid-row: 1; text-align: right; color: var(--ink-2); }
.title {
  grid-column: 1;
  grid-row: 3;
  font-size: clamp(26px, 2.6vw, 44px);
  line-height: 1;
  align-self: end;
}
.feature .title { font-size: clamp(34px, 5vw, 88px); }
.time { grid-column: 2; grid-row: 3; align-self: end; color: var(--ink-2); }

@media (hover: hover) {
  .card { cursor: none; }
  .card:hover .media img { transform: scale(1.03); filter: saturate(1.05); }
}

/* follower cursor */
.cursor {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 600;
  margin: -42px 0 0 -42px;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: var(--rec);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  pointer-events: none;
  opacity: 0;
  scale: 0.3;
  transition: opacity 0.25s, scale 0.35s var(--ease);
}
.cursor svg { width: 12px; height: 12px; }
.cursor.on { opacity: 1; scale: 1; }

/* filter transitions */
.grid-move { transition: transform 0.6s var(--ease); }
.grid-enter-active { transition: opacity 0.6s var(--ease), transform 0.6s var(--ease); }
.grid-leave-active { transition: opacity 0.25s; position: absolute; visibility: hidden; }
.grid-enter-from { opacity: 0; transform: translateY(24px); }
.grid-leave-to { opacity: 0; }

@media (max-width: 760px) {
  .work { padding: 0 var(--edge) 64px; }
  .head { margin-bottom: 24px; padding-top: calc(var(--nav-h) + 16px); }
  .filters { flex-wrap: nowrap; overflow-x: auto; margin: 0 calc(var(--edge) * -1); padding: 0 var(--edge); scrollbar-width: none; width: calc(100% + var(--edge) * 2); }
  .filters::-webkit-scrollbar { display: none; }
  .chip { flex: none; }
  .grid { grid-template-columns: 1fr; }
  .feature .media { aspect-ratio: 4 / 5; }
}
</style>
