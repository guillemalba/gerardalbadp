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

html, body {
  height: 100%;
  background-color: #000;
  margin: 0;
  padding: 0;
}

.left-sidebar, .right-sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Importa la fuente personalizada desde la carpeta assets */
@font-face {
  font-family: 'NewYork';
  src: url('@/assets/fonts/NewYork.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

/* @font-face {
  font-family: 'Baskerville';
  src: url('@/assets/fonts/BASKRV_L.ttf') format('opentype');
  font-weight: normal;
  font-style: normal;
} */

/* Aplica la fuente a toda la página */
body {
  font-family: 'NewYork', sans-serif; /* Usa la fuente en todo el body */
  color: #333;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'NewYork', serif; /* Usa la fuente para todos los títulos */
}

p {
  font-family: 'NewYork', sans-serif; /* Usa la fuente para los párrafos */
}

span {
  font-family: 'NewYork', sans-serif; /* Usa la fuente para los párrafos */
}

button {
  font-family: 'NewYork', sans-serif; /* Usa la fuente para los párrafos */
}
</style>
