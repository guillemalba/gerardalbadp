<template>
  <section class="chapters" aria-labelledby="chapters-title" @mouseleave="active = null">
    <div class="stage" aria-hidden="true">
      <img
        v-for="(c, i) in categories"
        :key="c.slug"
        :src="c.cover"
        alt=""
        loading="lazy"
        :class="{ on: shown === i }"
      >
      <div class="stage-shade"></div>
    </div>

    <header class="head">
      <h2 id="chapters-title" class="hud">Chapters</h2>
      <p class="hud dim">{{ String(total).padStart(2, '0') }} projects</p>
    </header>

    <ol class="list">
      <li
        v-for="(c, i) in categories"
        :key="c.slug"
        :class="{ dimmed: active !== null && active !== i }"
        @mouseenter="active = i"
        @focusin="active = i"
      >
        <a :href="'#/#work'" class="row" @click.prevent="$emit('pick', c.slug)">
          <span class="num hud">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="name serif">
            <span class="name-in">{{ c.title }}</span>
          </span>
          <span class="count hud">{{ String(countOf(c.slug)).padStart(2, '0') }}</span>
          <img class="thumb" :src="c.cover" alt="" loading="lazy">
        </a>
      </li>
    </ol>
  </section>
</template>

<script>
import { CATEGORIES, PROJECTS, projectsIn } from '@/data/projects';

export default {
  name: 'ChapterIndex',
  emits: ['pick'],
  data() {
    return { categories: CATEGORIES, active: null, total: PROJECTS.length };
  },
  computed: {
    shown() {
      return this.active === null ? 0 : this.active;
    },
  },
  methods: {
    countOf(slug) {
      return projectsIn(slug).length;
    },
  },
};
</script>

<style scoped>
.chapters {
  position: relative;
  min-height: 100svh;
  padding: calc(var(--nav-h) + 40px) var(--edge) 64px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 48px;
  overflow: hidden;
  isolation: isolate;
}

/* full-bleed image that follows the hovered chapter */
.stage { position: absolute; inset: 0; z-index: -1; }
.stage img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 0.9s var(--ease), transform 2.4s var(--ease);
}
.stage img.on { opacity: 1; transform: scale(1); }
.stage-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, var(--bg) 0%, rgba(11, 11, 10, 0.55) 22%, rgba(11, 11, 10, 0.55) 70%, var(--bg) 100%);
}

.head { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--line); padding-bottom: 14px; }
.dim { color: var(--ink-2); }

.list { list-style: none; margin: 0; padding: 0; }
.list li { border-bottom: 1px solid var(--line); transition: opacity 0.5s var(--ease); }
.list li.dimmed { opacity: 0.28; }

.row {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 6px 0;
  text-decoration: none;
  color: var(--ink);
}
.num { color: var(--ink-2); align-self: start; padding-top: 1.4em; }
.name {
  font-size: clamp(56px, 10.5vw, 176px);
  line-height: 0.95;
  overflow: hidden;
}
.name-in { display: inline-block; transition: transform 0.6s var(--ease), font-style 0s; }
.count { color: var(--ink-2); }
.thumb { display: none; }

@media (hover: hover) {
  .row:hover .name-in { transform: translateX(0.18em); font-style: italic; }
  .row:hover .count { color: var(--rec); }
}

/* ---------- touch / narrow: every chapter shows its own frame ---------- */
@media (max-width: 760px), (hover: none) {
  .stage { display: none; }
  .chapters { min-height: 0; gap: 24px; padding-bottom: 24px; }
  .list li.dimmed { opacity: 1; }
  .list li { border: 0; margin-bottom: 10px; }
  .row {
    position: relative;
    grid-template-columns: 1fr auto;
    align-items: end;
    min-height: 34svh;
    padding: 16px;
    overflow: hidden;
    isolation: isolate;
  }
  .thumb {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    filter: brightness(0.62);
    transition: transform 0.6s var(--ease), filter 0.4s;
  }
  .row:active .thumb { transform: scale(1.03); filter: brightness(0.8); }
  .num { position: absolute; top: 16px; left: 16px; padding: 0; color: var(--ink); }
  .name { font-size: clamp(44px, 13vw, 84px); }
  .count { color: var(--ink); }
}
</style>
