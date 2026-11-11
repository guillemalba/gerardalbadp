<template>
  <nav class="rail rail-right" aria-label="Main">
    <ul>
      <li>
        <a class="label" :class="{ active: $route.name === 'Bio' }" href="#/bio" @click.prevent="goToBio">Bio</a>
      </li>
      <li>
        <a class="label" href="#/" @click.prevent="scrollOrNavigate('work')">Work</a>
      </li>
      <li>
        <a class="label" href="#/" @click.prevent="scrollOrNavigate('contact')">Contact</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'RightSidebar',
  emits: ['scrollToWork', 'scrollToContact'],
  methods: {
    goToBio() {
      this.$router.push({ name: 'Bio' });
    },
    scrollOrNavigate(section) {
      if (this.$route.name === 'Home') {
        this.$emit(section === 'work' ? 'scrollToWork' : 'scrollToContact');
      } else {
        this.$router.push({ name: 'Home', query: { scroll: section } });
      }
    }
  }
};
</script>

<style scoped>
.rail {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: var(--rail);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  pointer-events: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;   /* Contact · Work · Bio read bottom→top, same as the name on the left */
  gap: 8px;
}

a {
  pointer-events: auto;
  display: block;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
  color: var(--ink-dim);
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 0.4em;
  padding: 18px 14px;
  position: relative;
  transition: color var(--t);
}

a.active { color: var(--ink); }

a::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 12px;
  bottom: 12px;
  width: 1px;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s var(--ease);
}
a.active::after { transform: scaleY(1); }

@media (hover: hover) {
  a:hover { color: var(--accent); }
  a:hover::after { transform: scaleY(1); }
}
</style>
