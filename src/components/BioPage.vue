<template>
  <div class="bio-page">
    <HamburgerMenu v-if="isSmallScreen" @scrollToWork="goToWorkFromBio" @scrollToContact="goToContactFromBio" />
    <template v-else>
      <LeftSidebar />
      <RightSidebar />
    </template>

    <main class="bio">
      <div class="portrait" role="img" aria-label="Gerard Alba"></div>

      <div class="text">
        <p class="label kicker">About</p>
        <h1>Gerard Alba</h1>
        <p class="lead">
          Director of Photography from Granollers, Barcelona, with a lifelong love for visual storytelling. Trained in Cinematography at the New York Film Academy in Los Angeles and working on projects since graduating in 2016.
        </p>
        <p>
          Gerard has been involved in films, music videos, and commercials, including a notable role in the camera department for the third season of Narcos. Whether he’s directing, handling the camera, or working with a steadicam, Gerard brings a thoughtful approach to lighting that really enhances the look of his projects. He’s also passionate about underwater photography, which adds a unique flair to his work.
        </p>
        <p>
          Known for his enthusiastic and positive attitude, Gerard is excited to dive into fresh creative projects. If you’re looking for a DP with a skill for storytelling, lighting, and a creative touch above and below the water, let’s connect and see what we can create together.
        </p>
        <button class="btn-pill" @click="downloadCV">Download CV</button>
      </div>
    </main>
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
      const fileName = 'gerardalba_cv.pdf'; // nombre exacto en public/
      const href = `${process.env.BASE_URL || '/'}${fileName}`;
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName;
      link.target = '_blank'; // evita bloqueos en algunos navegadores
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
}

.bio {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: stretch;
  padding-left: var(--rail);
  padding-right: var(--rail);
}

.portrait {
  position: relative;
  min-height: 100vh;
  background-image: url('@/assets/images/bio_profile.png');
  background-size: cover;
  background-position: center;
}
.portrait::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(5,5,5,0) 60%, var(--bg) 100%);
}

.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  padding: 96px var(--gutter) 96px clamp(24px, 4vw, 64px);
  max-width: 640px;
}

.kicker { color: var(--ink-dim); margin: 0; }

h1 {
  font-size: clamp(44px, 6vw, 96px);
  line-height: 1;
  text-transform: uppercase;
}

p { margin: 0; font-size: 17px; line-height: 1.65; color: var(--ink-dim); }
.lead { font-size: 21px; color: var(--ink); }

.btn-pill { margin-top: 12px; }

@media (max-width: 1000px) {
  .bio {
    grid-template-columns: 1fr;
    padding: 0;
  }
  .portrait {
    min-height: 0;
    height: 62vh;
    background-position: center 25%;
  }
  .portrait::after { background: linear-gradient(to bottom, rgba(5,5,5,0) 55%, var(--bg) 100%); }
  .text {
    max-width: none;
    padding: 8px var(--gutter) 72px;
    margin-top: -48px;
    position: relative;
  }
  .btn-pill { align-self: stretch; justify-content: center; }
  p { font-size: 16px; }
  .lead { font-size: 19px; }
}
</style>
