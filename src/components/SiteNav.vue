<template>
  <header class="nav" :class="{ solid: scrolled }">
    <a class="brand" href="#/" @click.prevent="go('')" aria-label="Gerard Alba, home">
      <span class="serif brand-name">Gerard Alba</span>
      <span class="hud brand-role">Director of Photography</span>
    </a>

    <nav aria-label="Main">
      <ul>
        <li v-for="item in items" :key="item.hash">
          <a class="hud link" :href="'#/' + item.hash" @click.prevent="go(item.hash)">
            <span class="idx">{{ item.idx }}</span>{{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'SiteNav',
  data() {
    return {
      scrolled: false,
      items: [
        { idx: '01', label: 'Work', hash: '#work' },
        { idx: '02', label: 'About', hash: '#about' },
        { idx: '03', label: 'Contact', hash: '#contact' },
      ],
    };
  },
  mounted() {
    this.onScroll();
    window.addEventListener('scroll', this.onScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      this.scrolled = window.scrollY > 40;
    },
    go(hash) {
      if (this.$route.name === 'Home') {
        const el = hash ? document.querySelector(hash) : null;
        window.scrollTo({ top: el ? el.getBoundingClientRect().top + window.scrollY : 0, behavior: 'smooth' });
        history.replaceState(history.state, '', '#/' + hash);
      } else {
        this.$router.push({ name: 'Home', hash: hash || undefined });
      }
    },
  },
};
</script>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 500;
  height: var(--nav-h);
  padding: 0 var(--edge);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: background 0.4s var(--ease), backdrop-filter 0.4s;
}
.nav.solid {
  background: rgba(11, 11, 10, 0.72);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 14px;
  min-height: var(--tap);
  align-self: center;
  padding-top: 10px;
  text-decoration: none;
}
.brand-name { font-size: 26px; line-height: 1; }
.brand-role { color: var(--ink-2); }

ul { list-style: none; margin: 0; padding: 0; display: flex; gap: 4px; }

.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: var(--tap);
  padding: 0 10px;
  text-decoration: none;
  color: var(--ink);
  transition: color 0.25s;
}
.idx { color: var(--ink-3); font-size: 9px; transition: color 0.25s; }

@media (hover: hover) {
  .link:hover { color: var(--rec); }
  .link:hover .idx { color: var(--rec); }
}

@media (max-width: 760px) {
  .brand-role { display: none; }
  .brand-name { font-size: 22px; }
  .idx { display: none; }
  .link { padding: 0 8px; }
  ul { margin-right: -4px; }
}
</style>
