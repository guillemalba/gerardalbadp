<template>
  <div class="video-preview" :style="{ backgroundImage: `url(${thumbnail})` }">
    <div class="overlay">
      <h1>{{ title }}</h1>
      <button @click="playVideo" class="custom-button">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      </button>

      <button @click="toggleVideoList" class="custom-button">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        More
      </button>
    </div>
    <transition name="slide-fade">
      <div v-if="showVideoList" class="video-list-container">
        <div v-if="canScrollLeft" class="arrow left-arrow" @click="scrollLeft">&#9664;</div>
        <div class="video-list" ref="videoList">
          <div v-for="video in relatedVideos" :key="video.id" class="video-item" :style="{ backgroundImage: `url(${video.thumbnail})` }">
            <div class="hover-overlay">
              <div class="video-info">
                <p>{{ video.title }} / {{ video.duration }}</p>
              </div>
              <button @click="handlePlayRelatedVideo(video.src)" class="play-button">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div v-if="canScrollRight" class="arrow right-arrow" @click="scrollRight">&#9654;</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VideoPreview',
  props: {
    title: {
      type: String,
      required: true
    },
    videoSrc: {
      type: String,
      required: true
    },
    relatedVideos: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      thumbnail: '',
      showVideoList: false,
      canScrollLeft: false,
      canScrollRight: false
    };
  },
  created() {
    this.fetchThumbnail(this.videoSrc);
    this.fetchThumbnailsForRelatedVideos();
  },
  mounted() {
    this.$nextTick(this.checkScroll);
    window.addEventListener('resize', this.checkScroll);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScroll);
  },
  methods: {
    getEmbedUrl(src) {
      const videoId = src.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    },
    async fetchThumbnail(videoUrl) {
      const videoId = videoUrl.split('/').pop();
      const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
      const data = await response.json();
      this.thumbnail = data[0].thumbnail_large;
    },
    async fetchThumbnailsForRelatedVideos() {
      for (const video of this.relatedVideos) {
        const videoId = video.src.split('/').pop();
        const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
        const data = await response.json();
        video.thumbnail = data[0].thumbnail_large;
        video.title = data[0].title; // Assuming the API provides the title
        video.duration = this.formatDuration(data[0].duration); // Convert duration to mm:ss format
      }
    },
    playVideo() {
      this.$emit('play-video', this.videoSrc, this.type);
    },
    toggleVideoList() {
      this.showVideoList = !this.showVideoList;
      this.$nextTick(this.checkScroll); // Ensure scroll check after DOM update
    },
    scrollLeft() {
      const container = this.$refs.videoList;
      if (container) {
        container.scrollBy({ left: -300, behavior: 'smooth' });
        this.$nextTick(this.checkScroll);
      }
    },
    scrollRight() {
      const container = this.$refs.videoList;
      if (container) {
        container.scrollBy({ left: 300, behavior: 'smooth' });
        this.$nextTick(this.checkScroll);
      }
    },
    checkScroll() {
      const container = this.$refs.videoList;
      if (container) {
        this.canScrollLeft = container.scrollLeft > 0;
        this.canScrollRight = container.scrollWidth > container.clientWidth + container.scrollLeft;
      }
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    handlePlayRelatedVideo(src) {
      this.$emit('play-video', src, this.type);
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 34px;
}

.video-preview {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.overlay {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 20px;
  z-index: 1;
  /* Asegura que el contenido principal esté encima */
}

.video-list-container {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: center;
  /* Ajusta la distribución para centrar el contenedor de la lista de videos */
  background-color: #0000002c;
  /* Fondo semi-transparente para contraste */
  z-index: 999;
  /* Asegura que la lista esté encima del contenido principal */
  overflow: hidden;
  /* Oculta el contenido desbordado para que las flechas no se muevan */
}

.video-list {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  max-width: calc(4 * 300px);
  /* Ancho máximo para mostrar 4 videos a la vez, ajusta según el tamaño de los videos */
  gap: 0px;
  /* Espacio entre los videos */
  flex-grow: 1;
  /* Permite que el contenedor de videos crezca y ocupe el espacio disponible */
}

.video-item {
  position: relative;
  width: 300px;
  height: 200px;
  flex-shrink: 0;
  /* Evita que los videos se encojan */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-item:hover .hover-overlay {
  opacity: 1;
}

.play-button {
  position: relative;
  top: 10%; /* Subir el botón */
  transform: translate(0%, -60%);
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
}

.play-button .icon {
  width: 25px;
  height: 25px;
}

.video-info {
  color: white;
  text-align: center;
  margin-top: 10px;
}

.arrow {
  cursor: pointer;
  color: white;
  font-size: 2em;
  user-select: none;
  padding: 0 10px;
  position: absolute;
  /* Asegura que las flechas sean estáticas */
  z-index: 1000;
  /* Asegura que las flechas estén encima de los videos */
}

.left-arrow {
  margin-right: 1400px;
}

.right-arrow {
  margin-left: 1400px;
}

.arrow:hover {
  color: #ccc;
}

.custom-button {
  margin: 10px 0;
  padding: 12px 24px;
  background-color: #0000001b;
  border: 2px solid #f4f4f4ac;
  color: #f4f4f4ac;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.3s ease;
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
}

.custom-button .icon {
  margin-right: 0px;
  width: 25px;
  height: 25px;
}

.custom-button:hover {
  color: #ffffff;
  transform: scale(1.05);
  border: 2px solid #ffffff;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

.custom-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
}

/* Ocultar la barra de desplazamiento en diferentes navegadores */
.video-list::-webkit-scrollbar {
  display: none;
  /* Ocultar en Chrome, Safari y Opera */
}

.video-list {
  -ms-overflow-style: none;
  /* Ocultar en Internet Explorer y Edge */
  scrollbar-width: none;
  /* Ocultar en Firefox */
}

/* Animación de deslizamiento */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>