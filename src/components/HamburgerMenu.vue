<template>
  <div>
    <header class="topbar">
      <a class="topbar-name label" href="#/" @click.prevent="goHome">Gerard Alba</a>
      <button
        class="menu-toggle"
        :class="{ open: isMenuOpen }"
        :aria-expanded="isMenuOpen"
        aria-label="Menu"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
      </button>
    </header>

    <transition name="menu">
      <nav v-if="isMenuOpen" class="menu" aria-label="Main">
        <ul>
          <li style="--i: 0"><a href="#/" @click.prevent="scrollToSection('work')">Work</a></li>
          <li style="--i: 1"><a href="#/bio" @click.prevent="goToBio">Bio</a></li>
          <li style="--i: 2"><a href="#/" @click.prevent="scrollToSection('contact')">Contact</a></li>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HamburgerMenu',
  emits: ['scrollToWork', 'scrollToContact'],
  data() {
    return { isMenuOpen: false };
  },
  watch: {
    isMenuOpen(open) {
      document.body.style.overflow = open ? 'hidden' : '';
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    goHome() {
      this.isMenuOpen = false;
      this.$router.push({ name: 'Home' }).then(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    },
    scrollToSection(section) {
      this.isMenuOpen = false;
      this.$nextTick(() => {
        this.$emit(section === 'work' ? 'scrollToWork' : 'scrollToContact');
      });
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home', query: { scroll: section } });
      }
    },
    goToBio() {
      this.isMenuOpen = false;
      this.$router.push({ name: 'Bio' });
    }
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 64px;
  padding: 0 calc(var(--gutter) - 10px) 0 var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3000;
  background: rgba(5, 5, 5, 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  pointer-events: none;
}
.topbar > * { pointer-events: auto; }

.topbar-name {
  color: var(--ink);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  min-height: var(--tap);
}

.menu-toggle {
  width: var(--tap);
  height: var(--tap);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: relative;
}
.menu-toggle span {
  position: absolute;
  left: 11px;
  right: 11px;
  height: 2px;
  background: var(--ink);
  transition: transform 0.35s var(--ease);
}
.menu-toggle span:nth-child(1) { top: 18px; }
.menu-toggle span:nth-child(2) { top: 26px; }
.menu-toggle.open span:nth-child(1) { transform: translateY(4px) rotate(45deg); }
.menu-toggle.open span:nth-child(2) { transform: translateY(-4px) rotate(-45deg); }

.menu {
  position: fixed;
  inset: 0;
  z-index: 2500;
  background: rgba(5, 5, 5, 0.98);
  display: flex;
  align-items: center;
  padding: 0 var(--gutter);
}
ul { list-style: none; margin: 0; padding: 0; width: 100%; }
li { border-bottom: 1px solid var(--line); }
li:first-child { border-top: 1px solid var(--line); }
li a {
  display: block;
  padding: 22px 0;
  font-size: clamp(36px, 11vw, 64px);
  line-height: 1;
  text-transform: uppercase;
  color: var(--ink);
  text-decoration: none;
  transition: color var(--t), padding-left var(--t) var(--ease);
}
li a:active { color: var(--accent); padding-left: 10px; }

.menu-enter-active, .menu-leave-active { transition: opacity 0.3s var(--ease); }
.menu-enter-from, .menu-leave-to { opacity: 0; }
.menu-enter-active li { animation: in 0.5s var(--ease) both; animation-delay: calc(var(--i) * 70ms + 80ms); }
@keyframes in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
</style>
