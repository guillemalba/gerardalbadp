<template>
  <button @click="onClick" class="play" :class="additionalClass" :aria-label="label">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <polygon v-if="icon === 'play'" points="8 5 19 12 8 19"></polygon>
      <template v-else-if="icon === 'plus'">
        <rect x="11" y="5" width="2" height="14"></rect>
        <rect x="5" y="11" width="14" height="2"></rect>
      </template>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    icon: {
      type: String,
      required: true,
      validator: (value) => ['play', 'plus'].includes(value)
    },
    onClick: {
      type: Function,
      required: true
    },
    label: {
      type: String,
      default: 'Play'
    },
    additionalClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.play {
  width: 88px;
  height: 88px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: var(--ink);
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(243, 240, 234, 0.5);
  border-radius: 50%;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  cursor: pointer;
  transition: transform var(--t) var(--ease), background var(--t), color var(--t), border-color var(--t);
}
.icon { width: 34px; height: 34px; margin-left: 4px; }
.play:active { transform: scale(0.94); }

@media (hover: hover) {
  .play:hover { transform: scale(1.06); background: var(--accent); border-color: var(--accent); color: #000; }
}
</style>
