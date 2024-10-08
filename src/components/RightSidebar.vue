<template>
  <div class="right-sidebar">
    <!-- Contenido del Right Sidebar -->
    <div class="vertical-text">
      <h2 @click="scrollOrNavigate('contact')">Contact</h2>
      <h2 @click="goToBio">Bio</h2>
      <h2 @click="scrollOrNavigate('work')">Work</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightSidebar',
  methods: {
    // Método para navegar a Bio
    goToBio() {
      this.$router.push({ name: 'Bio' });
    },

    // Método para manejar el scroll o la navegación
    scrollOrNavigate(section) {
      if (this.$route.name === 'Home') {
        // Si estamos en la página de inicio, ejecutamos el scroll
        if (section === 'work') {
          this.$emit('scrollToWork'); // Emitimos un evento para hacer scroll a "Work"
        } else if (section === 'contact') {
          this.$emit('scrollToContact'); // Emitimos un evento para hacer scroll a "Contact"
        }
      } else {
        // Si no estamos en Home, navegamos a la página de inicio y luego hacemos el scroll
        this.$router.push({ name: 'Home' }).then(() => {
          if (section === 'work') {
            this.$emit('scrollToWork');
          } else if (section === 'contact') {
            this.$emit('scrollToContact');
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.right-sidebar {
  width: 20px;
  background-color: #00000000;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: fixed;
  right: 0;
  z-index: 1000;
  border: none;
  box-shadow: none;
  cursor: pointer;
}

.vertical-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  color: rgb(255, 255, 255);
  height: 100%;
  transform: rotate(180deg);
  white-space: nowrap;
}

.vertical-text h2 {
  margin-bottom: 15vh;
  writing-mode: vertical-rl;
  transition: font-size 0.3s ease; /* Transición suave al cambiar tamaño */
  color: white; /* Texto blanco por defecto */
  cursor: pointer;
}

.vertical-text h2:hover {
  color: yellow; /* Cambiar a texto amarillo al hacer hover */
}

@media (max-width: 1000px) {
  .vertical-text h2 {
    margin-bottom: 10vh; /* Reducimos el espacio entre los textos */
  }
}

@media (max-width: 600px) {
  .vertical-text h2 {
    margin-bottom: 8vh; /* Reducimos el espacio entre textos en pantallas muy pequeñas */
  }
}
</style>
