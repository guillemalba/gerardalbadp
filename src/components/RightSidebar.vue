<template>
  <div class="right-sidebar">
    <!-- Contenido del Right Sidebar -->
    <div class="vertical-text">
      <h2>Work</h2>
      <h2>Bio</h2>
      <h2>Contact</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightSidebar',
};
</script>

<style scoped>
.right-sidebar {
  width: 20px; /* Ajusta el ancho según tus necesidades */
  background-color: #0000004a;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Asegura que la barra ocupe toda la altura de la pantalla */
  position: fixed; /* Fija la barra en su lugar */
  right: 0; /* Alinea la barra a la derecha */
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

.vertical-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  color: rgb(255, 255, 255);
  height: 100%; /* Asegura que el contenedor ocupe toda la altura de la barra */
  transform: rotate(180deg);
  white-space: nowrap;
}

.vertical-text h2 {
  margin-bottom: 100px; /* Ajusta el valor para cambiar el espacio entre los elementos */
  writing-mode: vertical-rl; /* Rotar el texto para alinear verticalmente */
}
</style>
