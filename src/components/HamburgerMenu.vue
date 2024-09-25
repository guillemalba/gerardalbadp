<template>
  <div>
    <button @click="toggleMenu" class="hamburger-button">
      ☰
    </button>
    <div v-if="isMenuOpen" class="menu">
      <ul>
        <li><a href="#">Work</a></li>
        <li><a href="#">Bio</a></li>
        <li><a href="#">Contact</a></li>
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
    }
  }
};
</script>

<style scoped>
.container {
  position: relative;
}

.hamburger-button {
  font-size: 20px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgb(0, 0, 0);
  width: 100vw; /* Ancho del botón igual al ancho de la ventana */
  height: auto;
  padding: 10px;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 3000;
  text-align: right; /* Alinea el ícono a la derecha */
}

.hamburger-button .icon {
  position: absolute;
  right: 10px; /* Ajusta el margen del ícono desde el borde derecho */
  top: 50%;
  transform: translateY(-50%);
}

.menu {
  background-color: rgb(0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* Ancho del menú al 100% */
  height: auto; /* Ocupa toda la altura de la ventana */
  padding-top: 30px;
  border-radius: 0; /* Sin bordes redondeados si quieres que se extienda por completo */
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



