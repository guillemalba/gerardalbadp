<template>
  <div class="carousel-container">
    <!-- Encabezado del carrusel -->
    <div class="carousel-header">
      <h2>{{ title }}</h2>

      <!-- Botón de cierre en la cabecera, solo cuando el video está en reproducción -->
      <button v-if="isPlaying" class="close-button-header" @click="closeVideo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" fill="none" stroke="white"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Carrusel con scroll-snap -->
    <div :class="{'carousel is-playing': isPlaying, 'carousel': !isPlaying}" ref="carouselTrack" @scroll="handleScroll">
      <div class="carousel-track">
        <!-- Mostramos los videos -->
        <div v-for="(video, index) in relatedVideos" :key="video.id" class="carousel-slide">
          <div class="video-container-wrapper" :class="{ 'fullscreen': isFullscreen }">
            <div class="video-container">
              <iframe
                v-if="isPlaying && currentIndex === index"
                :src="getEmbedUrl(video.src)"
                width="100%"
                height="100%"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
                ref="vimeoIframe"
              ></iframe>

              <!-- Si no se está reproduciendo, mostramos la miniatura -->
              <div v-else class="thumbnail" :style="{ backgroundImage: `url(${video.thumbnail || defaultThumbnail})` }"
                @click="goToMobileVideoDetail(video)">
                <div class="overlay">
                  <div class="video-info">{{ video.title }}</div>
                  <button class="play-button" @click.stop="playVideo(index)">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="white"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dots para indicar el video actual -->
    <div class="carousel-dots">
      <span v-for="(video, index) in relatedVideos" :key="index" :class="{ 'active': index === currentIndex }"
        @click="goToSlide(index)">
      </span>
    </div>
  </div>
</template>

<script>
import Player from '@vimeo/player';

export default {
  data() {
    return {
      currentIndex: 0, // Índice del video actual
      isPlaying: false, // Indicador para saber si el video está en reproducción
      isFullscreen: false, // Indicador para saber si el video está en pantalla completa simulada
      vimeoPlayer: null, // Para almacenar la instancia del reproductor de Vimeo
      defaultThumbnail: require('@/assets/images/black.png'), // Imagen por defecto si el thumbnail no carga
    };
  },
  props: {
    relatedVideos: Array,
    title: String,
  },
  created() {
    this.fetchThumbnailsForRelatedVideos(); // Asegurarse de cargar los thumbnails en la inicialización
  },
  methods: {
    goToMobileVideoDetail(video) {
      // Navegar a la página de detalles del video, usando el ID y el título de la sección en la ruta
      this.$router.push({
        name: 'MobileVideoDetail',
        params: {
          id: video.src.split('/').pop(), // Extraemos el ID del video desde la URL de Vimeo
          sectionTitle: this.title.replace(/\s+/g, '-') // Reemplazar espacios con guiones para la URL
        }
      });
    },
    async fetchThumbnailsForRelatedVideos() {
      // Este método obtiene los thumbnails para cada video
      for (const video of this.relatedVideos) {
        if (!video.thumbnail) {
          try {
            const videoId = video.src.split('/').pop();
            const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
            const data = await response.json();
            video.thumbnail = data[0].thumbnail_large;
            video.title = data[0].title;
            video.duration = this.formatDuration(data[0].duration);
          } catch (error) {
            console.error('Error fetching thumbnail:', error);
          }
        }
      }
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    getEmbedUrl(src) {
      const videoId = src.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`; // Autoplay al cargar el video y muted
    },
    playVideo(index) {
      this.currentIndex = index;
      this.isPlaying = true; // Iniciar la reproducción en el slide actual
      this.initVimeoPlayer(); // Inicializar el reproductor de Vimeo
    },
    closeVideo() {
      this.isPlaying = false; // Cerrar el reproductor y volver a mostrar la miniatura
      if (this.vimeoPlayer) {
        this.vimeoPlayer.pause().catch(error => {
          console.error('Error pausing the video:', error);
        });
      }
    },
    initVimeoPlayer() {
      const iframe = this.$refs.carouselTrack.querySelectorAll('iframe')[this.currentIndex];
      if (iframe) {
        this.vimeoPlayer = new Player(iframe);
      }
    },
    handleScroll() {
      // Calcula la posición del scroll para detectar el video que está centrado
      const carousel = this.$refs.carouselTrack;
      const scrollLeft = carousel.scrollLeft;
      const slideWidth = carousel.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);

      if (newIndex !== this.currentIndex) {
        this.currentIndex = newIndex;
        if (this.isPlaying) {
          // Si hay un video en reproducción, lo detenemos cuando se cambia de slide
          this.closeVideo();
        }
      }
    },
    goToSlide(index) {
      const slideWidth = this.$refs.carouselTrack.clientWidth;
      const scrollPosition = slideWidth * index;
      this.$refs.carouselTrack.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      this.currentIndex = index;
    }
  }
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.video-container-wrapper.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: black;
}

.fullscreen-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10000;
  background-color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #000000;
  color: white;
}

.carousel-header h2 {
  margin: 0;
  text-align: center;
  font-size: 20px; /* Ajustamos el tamaño del título */
}

.close-button-header {
  background-color: rgba(255, 0, 0, 0);
  border: none;
  color: white;
  font-size: 35px;
  cursor: pointer;
  z-index: 10;
  position: absolute;
  right: 0px; /* Colocar el botón a la derecha */
}

/* Desactivar scroll vertical cuando está en modo reproducción */
.carousel.is-playing {
  overflow-y: hidden;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  /* Ocultamos el scroll horizontal */
  scrollbar-width: none; /* Firefox */
}

.carousel.is-playing::-webkit-scrollbar {
  display: none; /* Chrome, Safari y Edge */
}

.carousel {
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  /* Ocultamos el scroll horizontal */
  scrollbar-width: none; /* Firefox */
}

.carousel::-webkit-scrollbar {
  display: none; /* Chrome, Safari y Edge */
}

.carousel-track {
  display: flex;
}

.carousel-slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-container-wrapper {
  width: 100%;
  padding-top: 56.25%;
  position: relative;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.thumbnail {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  position: relative;
}

.overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.play-button {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  font-size: 38px;
  cursor: pointer;
}

.play-button .icon {
  width: 38px;
  height: 38px;
}

.video-info {
  color: white;
  text-align: center;
  margin-bottom: 20px; /* Ajusta este valor para mover el título más arriba */
  font-family: 'NewYork', serif;
  font-size: 18px;
}

.carousel-dots {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.carousel-dots span {
  display: inline-block;
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background-color: #333;
  margin: 0 5px;
  cursor: pointer;
}

.carousel-dots .active {
  background-color: white;
}

/* Ajustes responsivos para pantallas con altura menor a 500px */
@media (max-height: 500px) {
  .carousel-header h2 {
    font-size: 20px; /* Reducimos el tamaño del título */
  }

  .video-container-wrapper {
    padding-top: 30%; /* Ajustamos la proporción del video */
  }

  .play-button .icon {
    width: 28px; /* Reducimos el tamaño del botón de play */
    height: 28px;
  }

  .video-info {
    font-size: 14px; /* Reducimos el tamaño del título de los videos */
    margin-bottom: 10px; /* Reducimos el margen del título */
  }

  .carousel-dots span {
    height: 5px; /* Reducimos el tamaño de los dots */
    width: 5px;
  }

  .carousel-dots {
    margin-top: 5px; /* Reducimos el margen superior de los dots */
    margin-bottom: 5px; /* Reducimos el margen inferior de los dots */
  }

  .close-button-header {
    left: 450px; /* Colocamos el botón a la izquierda */
  }
}
</style>
