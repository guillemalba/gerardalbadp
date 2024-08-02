<template>
  <div class="left-sidebar">
    <!-- Contenido del Left Sidebar -->
    <div class="vertical-text">
      <h2>Gerard Alba</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftSidebar',
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
  height: 100%; /* Asegura que el contenedor ocupe toda la altura de la barra */
  transform: rotate(-90deg); /* Rota el contenedor para que el texto se muestre verticalmente */
  white-space: nowrap;
}

.vertical-text h2 {
  margin: 0; /* Elimina el margen para centrar el texto */
}
</style>
