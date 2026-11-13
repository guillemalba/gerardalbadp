<template>
  <footer id="contact" class="contact" aria-labelledby="contact-title">
    <h2 id="contact-title" class="sr-only">Contact</h2>

    <a class="marquee" :href="'mailto:' + c.email" aria-label="Email Gerard">
      <div class="marquee-track serif" aria-hidden="true">
        <span v-for="n in 4" :key="n">Let's create <em>together</em> <i class="star">✦</i> </span>
      </div>
    </a>

    <div class="grid">
      <p class="hud kicker">Contact</p>

      <a class="email serif draw" :href="'mailto:' + c.email">{{ c.email }}</a>

      <ul class="links">
        <li><span class="hud k">Phone</span><a class="draw" :href="'tel:' + c.phoneHref">{{ c.phone }}</a></li>
        <li><span class="hud k">Instagram</span><a class="draw" :href="c.instagram" target="_blank" rel="noopener">@gerardalbadp</a></li>
        <li><span class="hud k">Vimeo</span><a class="draw" :href="c.vimeo" target="_blank" rel="noopener">vimeo.com/gerardalba</a></li>
      </ul>
    </div>

    <div class="base hud">
      <span>© {{ year }} {{ c.name }}</span>
      <button class="top" @click="toTop">Back to top ↑</button>
    </div>
  </footer>
</template>

<script>
import { CONTACT } from '@/data/projects';

export default {
  name: 'ContactBlock',
  data() {
    return { c: CONTACT, year: new Date().getFullYear() };
  },
  methods: {
    toTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style scoped>
.contact {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: calc(var(--nav-h) + 24px) 0 0;
  border-top: 1px solid var(--line);
}
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

.marquee { display: block; overflow: hidden; text-decoration: none; color: var(--ink); padding: 2vh 0; }
.marquee-track {
  display: flex;
  width: max-content;
  font-size: clamp(80px, 16vw, 280px);
  line-height: 1;
  white-space: nowrap;
  animation: slide 40s linear infinite;
}
.marquee-track span { padding-right: 0.3em; }
.marquee-track em { font-style: italic; color: var(--ink-2); transition: color 0.4s; }
.star { font-style: normal; color: var(--rec); font-size: 0.4em; vertical-align: middle; }
@media (hover: hover) {
  .marquee:hover .marquee-track { animation-duration: 18s; }
  .marquee:hover em { color: var(--rec); }
}
@keyframes slide { to { transform: translateX(-50%); } }

.grid {
  padding: 0 var(--edge);
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: clamp(12px, 1.6vw, 24px);
  row-gap: 32px;
  align-items: end;
}
.kicker { grid-column: 1 / -1; color: var(--ink-2); border-bottom: 1px solid var(--line); padding-bottom: 14px; }
.email {
  grid-column: 1 / 8;
  font-size: clamp(30px, 4.2vw, 72px);
  line-height: 1;
  color: var(--ink);
  overflow-wrap: anywhere;
  justify-self: start;
  padding-bottom: 4px;
}
.links { grid-column: 9 / -1; list-style: none; margin: 0; padding: 0; }
.links li {
  display: grid;
  grid-template-columns: 96px 1fr;
  align-items: center;
  gap: 12px;
  min-height: var(--tap);
  border-bottom: 1px solid var(--line);
}
.links a { justify-self: start; font-size: 14px; padding: 12px 0; text-decoration: none; }
.k { color: var(--ink-2); }

.base {
  margin-top: 80px;
  padding: 0 var(--edge);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 72px;
  color: var(--ink-2);
  border-top: 1px solid var(--line);
}
.top { background: none; border: 0; color: inherit; cursor: pointer; min-height: var(--tap); padding: 0; font: inherit; letter-spacing: inherit; text-transform: inherit; transition: color 0.25s; }
@media (hover: hover) { .top:hover { color: var(--rec); } }

@media (max-width: 900px) {
  .email, .links { grid-column: 1 / -1; }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
</style>
