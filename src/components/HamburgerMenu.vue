<template>
  <div>
    <!-- Icono de menú hamburguesa -->
    <button @click="toggleMenu" class="hamburger-button">
      <div class="bar" :class="{ 'open': isMenuOpen }"></div>
      <div class="bar" :class="{ 'open': isMenuOpen }"></div>
      <div class="bar" :class="{ 'open': isMenuOpen }"></div>
    </button>

    <!-- Menú desplegable -->
    <div v-if="isMenuOpen" class="menu" ref="menu">
      <ul>
        <li><a href="#" @click.prevent="scrollToSection('work')">Work</a></li>
        <li><a href="#" @click.prevent="goToBio">Bio</a></li>
        <li><a href="#" @click.prevent="scrollToSection('contact')">Contact</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;

      if (this.isMenuOpen) {
        // Agregar evento click al documento para cerrar el menú si se hace clic fuera
        document.addEventListener('click', this.handleClickOutside);
      } else {
        // Eliminar el evento click al cerrar el menú
        document.removeEventListener('click', this.handleClickOutside);
      }
    },
    scrollToSection(section) {
      this.toggleMenu(); // Cierra el menú después de hacer clic
      if (section === 'work') {
        this.$emit('scrollToWork');
      } else if (section === 'contact') {
        this.$emit('scrollToContact');
      }
    },
    goToBio() {
      this.toggleMenu(); // Cierra el menú después de hacer clic
      this.$router.push({ name: 'Bio' });
    },
    handleClickOutside(event) {
      const menu = this.$refs.menu;
      if (menu && !menu.contains(event.target) && !event.target.classList.contains('hamburger-button')) {
        this.isMenuOpen = false;
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.hamburger-button {
  position: fixed;
  top: 0;
  right: 0px;
  width: 50px; /* Aumentamos el área del botón */
  height: 50px; /* Aumentamos el área del botón */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10000;
  cursor: pointer;
  background-color: transparent; /* Cambiado a transparente para mejorar la visualización */
  border: none;
}

.bar {
  width: 25px; /* Mantemos las barras pequeñas */
  height: 2px;
  background-color: white;
  margin: 4px 0;
  transition: all 0.3s ease;
  pointer-events: none; /* Los clics pasan a través de las barras hacia el botón */
}

.bar.open:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.bar.open:nth-child(2) {
  opacity: 0; /* Ocultamos la segunda barra */
}

.bar.open:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.menu {
  background-color: rgba(0, 0, 0, 0.850);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 30px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu ul {
  list-style-type: none;
  padding: 0;
  margin-top: 30px;
  width: 100%;
  text-align: center;
}

.menu ul li {
  margin: 20px 0;
}

.menu ul li a {
  color: white;
  text-decoration: none;
  font-size: 20px;
  transition: color 0.3s ease;
}

.menu ul li a:hover {
  color: yellow;
}
</style>
