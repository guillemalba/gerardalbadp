<template>
  <section id="about" class="about" aria-labelledby="about-title">
    <p class="hud kicker">About</p>

    <h2 id="about-title" class="serif statement">
      Light, <em>above</em><br>
      and <em>below</em> the water.
    </h2>

    <div class="pictures">
      <figure class="now">
        <img :src="now" alt="Gerard Alba on set behind the camera" loading="lazy">
      </figure>
      <figure class="then">
        <img :src="then" alt="Gerard Alba as a child with a video camera" loading="lazy">
      </figure>
    </div>

    <div class="body">
      <p class="lead">
        Director of Photography from Granollers, Barcelona. Trained in cinematography at the New York Film Academy in Los Angeles, shooting since 2016.
      </p>

      <dl class="facts">
        <div><dt class="hud">Based</dt><dd>Barcelona</dd></div>
        <div><dt class="hud">Trained</dt><dd>New York Film Academy, LA</dd></div>
        <div><dt class="hud">Credits</dt><dd>Narcos, season 3 · camera dept.</dd></div>
        <div><dt class="hud">Also</dt><dd>Steadicam · Underwater</dd></div>
      </dl>

      <a class="cv hud" :href="cvHref" target="_blank" rel="noopener">
        <span>Download CV</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
      </a>
    </div>
  </section>
</template>

<script>
import { CONTACT } from '@/data/projects';

export default {
  name: 'AboutBlock',
  data() {
    return {
      now: require('@/assets/img/bio_bg2.jpg'),
      then: require('@/assets/img/bio_profile.jpg'),
      cvHref: `${process.env.BASE_URL || '/'}${CONTACT.cv}`,
    };
  },
};
</script>

<style scoped>
.about {
  padding: calc(var(--nav-h) + 60px) var(--edge) 140px;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: clamp(12px, 1.6vw, 24px);
  row-gap: 48px;
}
.kicker { grid-column: 1 / -1; color: var(--ink-2); border-bottom: 1px solid var(--line); padding-bottom: 14px; }

.statement {
  grid-column: 1 / -1;
  font-size: clamp(52px, 9.4vw, 164px);
  line-height: 0.92;
}
em { font-style: italic; color: var(--ink); }
.statement em:first-of-type { color: #ffb547; }
.statement em:last-of-type { color: #6fc3c9; }

.pictures {
  grid-column: 1 / 9;
  position: relative;
  padding-bottom: 12%;
}
figure { margin: 0; overflow: hidden; }
.now { aspect-ratio: 16 / 9; }
.now img, .then img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s var(--ease); }
.then {
  position: absolute;
  right: -10%;
  bottom: 0;
  width: 34%;
  aspect-ratio: 3 / 4;
  outline: 10px solid var(--bg);
}
@media (hover: hover) {
  .now:hover img, .then:hover img { transform: scale(1.03); }
}

.body {
  grid-column: 10 / -1;
  align-self: end;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.lead { font-family: var(--serif); font-size: clamp(22px, 1.8vw, 28px); line-height: 1.2; }

.facts { margin: 0; border-top: 1px solid var(--line); }
.facts div { display: grid; grid-template-columns: 84px 1fr; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--line); }
dt { color: var(--ink-2); }
dd { margin: 0; font-size: 13px; }

.cv {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 52px;
  padding: 0 20px;
  background: var(--ink);
  color: #000;
  text-decoration: none;
  border-radius: 999px;
  transition: background 0.3s, transform 0.3s var(--ease);
}
.cv svg { width: 18px; height: 18px; transition: transform 0.4s var(--ease); }
.cv:active { transform: scale(0.98); }
@media (hover: hover) {
  .cv:hover { background: var(--rec); }
  .cv:hover svg { transform: translateY(3px); }
}

@media (max-width: 1100px) {
  .pictures { grid-column: 1 / -1; }
  .then { right: 0; width: 30%; }
  .body { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
  .cv { grid-column: 2; }
}
@media (max-width: 760px) {
  .about { row-gap: 32px; padding-bottom: 96px; }
  .pictures { padding-bottom: 22%; }
  .now { aspect-ratio: 4 / 3; }
  .then { width: 40%; outline-width: 6px; }
  .body { display: flex; }
  .cv { align-self: stretch; }
}
</style>
