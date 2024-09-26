<template>
  <button @click="onClick" class="custom-button3" :class="additionalClass">
    <svg class="icon3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <!-- Rellenar el icono de play -->
      <polygon v-if="icon === 'play'" points="5 3 19 12 5 21"></polygon>
      <!-- El icono de plus sin relleno, solo líneas -->
      <template v-else-if="icon === 'plus'">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
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
    additionalClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.custom-button3 {
  padding: 12px;
  background-color: transparent; /* Sin fondo */
  color: #ffffff; /* El color del icono */
  font-size: 16px;
  cursor: pointer;
  border: none; /* Sin borde */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  transition: transform 0.3s ease; /* Transición suave para el hover */
  z-index: 1000;
}

.custom-button3 .icon3 {
  width: 35px;
  height: 35px;
}

.custom-button3:hover {
  transform: scale(1.5); /* Hacer el botón más grande al hacer hover */
}
</style>
