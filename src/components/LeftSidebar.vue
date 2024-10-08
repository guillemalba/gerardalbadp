<template>
  <div class="left-sidebar">
    <!-- Contenido del Left Sidebar -->
    <div class="vertical-text">
      <h2 @click="goToHome">Gerard Alba</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftSidebar',
  methods: {
    goToHome() {
      // Redirige a la página de inicio
      this.$router.push({ name: 'Home' });
      this.scrollToTop();
    },
    scrollToTop() {
      // Desplazarse al principio de la página
      this.$nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
};
</script>

<style scoped>
.left-sidebar {
  width: 20px; /* Ajusta el ancho según tus necesidades */
  background-color: #00000000;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Asegura que la barra ocupe toda la altura de la pantalla */
  position: fixed; /* Fija la barra en su lugar */
  left: 0; /* Alinea la barra a la izquierda */
  z-index: 1000; /* Asegura que la barra esté encima de otros contenidos */
  border: none; /* Elimina cualquier borde */
  box-shadow: none; /* Elimina cualquier sombra */
}

.vertical-text {
  display: flex;
  align-items: center;
  color: rgb(255, 255, 255);
  justify-content: center;
  height: auto; /* Asegura que el contenedor ocupe toda la altura de la barra */
  transform: rotate(-90deg); /* Rota el contenedor para que el texto se muestre verticalmente */
  white-space: nowrap;
}

.vertical-text h2 {
  margin: 0; /* Elimina el margen para centrar el texto */
  cursor: pointer;
  color: white; /* Texto blanco por defecto */
  transition: color 0.3s ease; /* Transición suave de color */
}

.vertical-text h2:hover {
  color: yellow; /* Cambiar a texto amarillo al hacer hover */
}

@media (hover: none) {
  .vertical-text h2:hover {
    color: white; /* Mantiene el color original en dispositivos táctiles */
    opacity: 1; /* Asegurarse de que el texto no desaparezca */
  }

  .vertical-text h2:active {
    color: yellow; /* Cambiar el color solo cuando se presiona el texto en dispositivos táctiles */
  }
}

</style>
