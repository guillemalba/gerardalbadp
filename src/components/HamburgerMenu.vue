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
.hamburger-button {
  font-size: 44px;
  position: fixed;
  top: 0px;
  right: 0px;
  background-color: rgb(0, 0, 0);
  height: auto;
  width: auto;
  padding: 10px;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 3000;
}

.menu {
  background-color: rgb(0, 0, 0);
  position: fixed;
  top: 0px;
  right: 0;
  width: 30%;
  height: auto;
  padding: 20px;
  border-radius: 10px 0 0 10px;
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
  z-index: 1000;
}

.menu ul li {
  margin: 20px 0;
  z-index: 1000;

}

.menu ul li a {
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  z-index: 1000;

}
</style>
