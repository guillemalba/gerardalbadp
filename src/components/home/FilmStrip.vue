<template>
  <section class="strip-wrap" aria-label="Frames from the work">
    <div class="strip">
    <div class="track">
      <div v-for="copy in 2" :key="copy" class="run" :aria-hidden="copy === 2 ? 'true' : null">
        <router-link
          v-for="(f, i) in frames"
          :key="copy + '-' + f.id"
          :to="{ name: 'Project', params: { id: f.id } }"
          class="frame"
          :tabindex="copy === 2 ? -1 : null"
        >
          <img v-if="f.src" :src="f.src" :alt="copy === 1 ? f.title : ''" loading="lazy">
          <span class="hud code">{{ String(i + 1).padStart(2, '0') }}A</span>
        </router-link>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
import { PROJECTS } from '@/data/projects';
import store from '@/data/vimeo';

export default {
  name: 'FilmStrip',
  computed: {
    frames() {
      return PROJECTS.map(p => ({
        id: p.id,
        src: store[p.id] && (store[p.id].thumbSmall || ''),
        title: store[p.id] && store[p.id].title,
      }));
    },
  },
};
</script>

<style scoped>
/* clips the tilted strip so its corners never widen the page */
.strip-wrap {
  overflow: hidden;
  padding: 48px 0;
  margin: 0 0 40px;
}
.strip {
  --hole: 14px;
  position: relative;
  padding: 34px 0;
  background: #050505;
  overflow: hidden;
  transform: rotate(-2deg) scale(1.06);
}
/* sprocket holes, top and bottom */
.strip::before, .strip::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: var(--hole);
  background-image: radial-gradient(circle at center, transparent 0, transparent 0),
    linear-gradient(90deg, rgba(236, 235, 230, 0.9) 0 10px, transparent 10px 26px);
  background-size: 26px var(--hole);
  -webkit-mask: linear-gradient(#000, #000);
  opacity: 0.18;
  border-radius: 2px;
}
.strip::before { top: 10px; }
.strip::after { bottom: 10px; }

.track { display: flex; width: max-content; animation: roll 70s linear infinite; }
.strip:hover .track { animation-play-state: paused; }
.run { display: flex; gap: 6px; padding-right: 6px; }

.frame {
  position: relative;
  flex: none;
  width: clamp(200px, 22vw, 340px);
  aspect-ratio: 3 / 2;
  background: #1a1a18;
  overflow: hidden;
  display: block;
}
.frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.05) brightness(0.8);
  transition: filter 0.5s var(--ease), transform 0.8s var(--ease);
}
.code {
  position: absolute;
  left: 8px;
  bottom: 6px;
  font-size: 9px;
  color: #ffb547;
  text-shadow: 0 0 6px rgba(255, 181, 71, 0.6);
}
@media (hover: hover) {
  .frame:hover img { filter: none; transform: scale(1.03); }
}

@keyframes roll { to { transform: translateX(-50%); } }

@media (prefers-reduced-motion: reduce) {
  .track { animation: none; }
  .strip { overflow-x: auto; transform: none; }
}
</style>
