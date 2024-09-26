<template>
  <div class="bio-page">
    <!-- Mostramos el HamburguerMenu si es pantalla pequeña -->
    <HamburgerMenu 
      v-if="isSmallScreen" 
      @scrollToWork="goToWorkFromBio" 
      @scrollToContact="goToContactFromBio" 
    />
    
    <!-- Si no es pantalla pequeña, mostramos las barras laterales -->
    <LeftSidebar v-else class="left-sidebar" @navigateWork="goToWorkFromBio" @navigateContact="goToContactFromBio" />
    
    <div class="content-container">
      <div class="content">
        <div class="profile-picture"></div>
        <!-- Imagen de perfil en un círculo -->
        
        <h1>About Me</h1>
        <p>
          Gerard Alba is a Director of Photography from Granollers, Barcelona, with a lifelong love for visual storytelling. He trained in Cinematography at the New York Film Academy in Los Angeles and has been putting his skills to work on a variety of projects since graduating in 2016.
        </p>
        <p>
          Gerard has been involved in films, music videos, and commercials, including a notable role in the camera department for the third season of Narcos. Whether he’s directing, handling the camera, or working with a steadicam, Gerard brings a thoughtful approach to lighting that really enhances the look of his projects. He’s also passionate about underwater photography, which adds a unique flair to his work.
        </p>
        <p>
          Known for his enthusiastic and positive attitude, Gerard is excited to dive into fresh creative projects.
        </p>
        <p>
          If you’re looking for a DP with a skill for storytelling, lighting, and a creative touch above and below the water, let’s connect and see what we can create together.
        </p>
        <button @click="downloadCV">Download CV</button>
      </div>
    </div>

    <!-- Si no es pantalla pequeña, mostramos las barras laterales -->
    <RightSidebar v-if="!isSmallScreen" class="right-sidebar" @navigateWork="goToWorkFromBio" @navigateContact="goToContactFromBio" />
  </div>
</template>

<script>
import LeftSidebar from './LeftSidebar.vue';
import RightSidebar from './RightSidebar.vue';
import HamburgerMenu from './HamburgerMenu.vue';

export default {
  name: 'BioPage',
  components: {
    LeftSidebar,
    RightSidebar,
    HamburgerMenu
  },
  data() {
    return {
      isSmallScreen: window.innerWidth < 1000 // Detectar si la pantalla es pequeña
    };
  },
  methods: {
    downloadCV() {
      const link = document.createElement('a');
      link.href = '/Gerard_Alba_CV.pdf'; // Ruta relativa desde la carpeta public
      link.download = 'Gerard_Alba_CV.pdf';
      link.click();
    },
    handleResize() {
      this.isSmallScreen = window.innerWidth < 1000; // Actualizar si es pantalla pequeña o grande
    },
    goToWorkFromBio() {
      // Redirige a la página de inicio con el parámetro `scroll=work`
      this.$router.push({ name: 'Home', query: { scroll: 'work' } });
    },
    goToContactFromBio() {
      // Redirige a la página de inicio con el parámetro `scroll=contact`
      this.$router.push({ name: 'Home', query: { scroll: 'contact' } });
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize); // Detectar el redimensionamiento de la ventana
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize); // Eliminar el evento en el desmontaje
  }
};
</script>

<style scoped>
.bio-page {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 0, 0);
  color: white;
  height: 100vh;
  background-image: url('@/assets/images/bio_bg2.png');
  background-size: cover;
  background-position: center;
  overflow: auto;
}

.content-container {
  margin: auto;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
  max-width: 90vw;
  text-align: center;
  backdrop-filter: blur(10px);
  width: 100%;
}

@media (min-width: 768px) {
  .content-container {
    max-width: 800px;
    padding: 40px;
  }
}

.content {
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2.5em;
}

p {
  margin-bottom: 20px;
  font-size: 1.1em;
  line-height: 1.6;
}

button {
  padding: 12px 24px;
  background-color: #ffdd57; /* Amarillo clarito */
  color: #000000;
  border: none;
  border-radius: 50px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ffc107; /* Amarillo más fuerte en hover */
}

/* Estilos para la imagen de perfil */
.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url('@/assets/images/bio_profile.png');
  background-size: cover;
  background-position: center;
  margin: 0 auto 20px; /* Centra el círculo y añade margen inferior */
}

/* Ajustes responsive para ocultar las barras laterales en pantallas pequeñas */
@media (max-width: 1000px) {
  .left-sidebar,
  .right-sidebar {
    display: none;
  }
}

/* Ajustes responsive para móviles */
@media (max-width: 768px) {
  h1 {
    font-size: 2em;
  }

  p {
    font-size: 1em;
  }

  button {
    font-size: 0.9em;
    padding: 10px 20px;
  }

  .profile-picture {
    width: 120px;
    height: 120px;
  }
}
</style>
