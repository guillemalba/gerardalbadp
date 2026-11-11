<template>
  <aside class="rail rail-left">
    <a class="name label" href="#/" @click.prevent="goToHome">Gerard Alba</a>
  </aside>
</template>

<script>
export default {
  name: 'LeftSidebar',
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' }).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
};
</script>

<style scoped>
.rail {
  position: fixed;
  top: 0;
  bottom: 0;
  width: var(--rail);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  pointer-events: none;
}
.rail-left { left: 0; }

.name {
  pointer-events: auto;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
  color: var(--ink);
  text-decoration: none;
  font-size: 13px;
  letter-spacing: 0.4em;
  padding: 18px 12px;
  position: relative;
  transition: color var(--t);
}
.name::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--accent);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s var(--ease);
  translate: 14px 0;
}

@media (hover: hover) {
  .name:hover { color: var(--accent); }
  .name:hover::after { transform: scaleY(1); }
}
</style>
