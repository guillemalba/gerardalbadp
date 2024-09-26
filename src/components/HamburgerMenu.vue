<template>
  <div>
    <button @click="toggleMenu" class="hamburger-button">
      ☰
    </button>
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
        // Desplázate a la sección de "Music Videos" en la página principal
        this.$emit('scrollToWork');
      } else if (section === 'contact') {
        // Desplázate a la sección de contacto (footer)
        this.$emit('scrollToContact');
      }
    },
    goToBio() {
      this.toggleMenu(); // Cierra el menú después de hacer clic
      // Redirige a la página de Bio
      this.$router.push({ name: 'Bio' });
    },
    handleClickOutside(event) {
      // Verifica si el clic fue fuera del menú hamburguesa
      const menu = this.$refs.menu;
      if (menu && !menu.contains(event.target) && !event.target.classList.contains('hamburger-button')) {
        this.isMenuOpen = false;
        document.removeEventListener('click', this.handleClickOutside); // Elimina el evento
      }
    }
  },
  beforeUnmount() {
    // Asegúrate de eliminar el listener si el componente se desmonta
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.hamburger-button {
  font-size: 20px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgb(0, 0, 0);
  width: 100vw;
  padding: 10px;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 3000;
  text-align: right;
}

.menu {
  background-color: rgb(0, 0, 0);
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
}
</style>
