<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>

body {
  margin: 0;
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.home-page {
  display: flex;
  flex: 1;
}

.left-sidebar, .right-sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

@font-face {
  font-family: 'Baskerville Old Face';
  src: url('@/assets/fonts/baskerville-old-face.ttf') format('truetype'); /* Ajusta la ruta y el formato según tu archivo */
}

body button {
  font-family: 'Baskerville Old Face', serif;
}

.font-baskerville {
  font-family: 'Baskerville Old Face', serif;
}


</style>
