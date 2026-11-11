<template>
  <div class="carousel-container">
    <!-- Encabezado del carrusel -->
    <div class="carousel-header">
      <h2>{{ title }}</h2>
      <span class="count label">{{ String(currentIndex + 1).padStart(2, '0') }} / {{ String(relatedVideos.length).padStart(2, '0') }}</span>

      <button v-if="isPlaying" class="close-button-header btn-round" aria-label="Close video" @click="closeVideo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
          stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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
                  <button class="play-button" :aria-label="'Play ' + (video.title || title)" @click.stop="playVideo(index)">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="8 5 19 12 8 19"></polygon>
                    </svg>
                  </button>
                  <div class="video-info">{{ video.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dots para indicar el video actual -->
    <div class="carousel-dots">
      <button v-for="(video, index) in relatedVideos" :key="index" :class="{ 'active': index === currentIndex }"
        :aria-label="'Video ' + (index + 1)" @click="goToSlide(index)">
      </button>
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
  background: var(--bg);
  padding-bottom: 8px;
  border-top: 1px solid var(--line);
}
.carousel-container:first-of-type { border-top: none; }

.carousel-header {
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 28px var(--gutter) 16px;
  min-height: 64px;
}
.carousel-header h2 {
  font-size: 28px;
  line-height: 1;
  text-transform: uppercase;
}
.count { color: var(--ink-dim); font-size: 11px; }

.close-button-header {
  position: absolute;
  right: var(--gutter);
  top: 50%;
  transform: translateY(-50%);
}

.carousel {
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.carousel::-webkit-scrollbar { display: none; }
.carousel.is-playing { overflow-y: hidden; }

.carousel-track { display: flex; }

.carousel-slide {
  flex: 0 0 100%;
  scroll-snap-align: center;
  padding: 0 var(--gutter);
}

.video-container-wrapper {
  width: 100%;
  padding-top: 56.25%;
  position: relative;
}
.video-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #111;
}
.video-container iframe { display: block; }

.thumbnail {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background: linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2) 60%);
}

.play-button {
  width: 64px;
  height: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: var(--ink);
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(243, 240, 234, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: transform var(--t) var(--ease), background var(--t), color var(--t);
}
.play-button:active { transform: scale(0.94); background: var(--accent); color: #000; border-color: var(--accent); }
.play-button .icon { width: 26px; height: 26px; margin-left: 3px; }

.video-info {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 12px;
  color: var(--ink);
  font-family: var(--font-text);
  font-size: 15px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  margin: 6px 0 14px;
}
.carousel-dots button {
  /* 44px tap area, 6px visible dot */
  width: 28px;
  height: var(--tap);
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}
.carousel-dots button::after {
  content: '';
  position: absolute;
  left: 50%; top: 50%;
  width: 6px; height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  background: var(--ink-faint);
  transition: background var(--t), transform var(--t) var(--ease);
}
.carousel-dots button.active::after { background: var(--ink); transform: scale(1.3); }

@media (max-height: 500px) {
  .carousel-header { padding-top: 16px; }
}
</style>
