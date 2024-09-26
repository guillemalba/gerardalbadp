<template>
  <div class="right-sidebar">
    <!-- Contenido del Right Sidebar -->
    <div class="vertical-text">
      <h2 @click="goToFooter">Contact</h2>
      <h2 @click="goToSection('bio')">Bio</h2>
      <h2 @click="goToSection('work')">Work</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightSidebar',
  methods: {
    goToSection(section) {
      if (section === 'work') {
        // Redirige a la página de inicio con el parámetro de consulta `scroll=work`
        this.$router.push({ name: 'Home', query: { scroll: 'work' } });
      } else if (section === 'bio') {
        // Redirige a la página de biografía
        this.$router.push({ name: 'Bio' });
      }
    },
    goToFooter() {
      // Redirige a la página de inicio con el parámetro de consulta `scroll=contact`
      this.$router.push({ name: 'Home', query: { scroll: 'contact' } });
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
