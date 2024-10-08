<template>
  <div class="video-preview" :style="{ backgroundImage: `url(${customThumbnail || thumbnail})` }">
    <div class="overlay">
      <h1>{{ title }}</h1>
      <CButton icon="play" :onClick="playVideo" />
    </div>
    
    <transition name="slide-fade">
      <div v-if="showVideoList" class="video-list-container">
        <!-- Flecha izquierda -->
        <div class="arrow-container left-arrow-container" :class="{ invisible: !canScrollLeft }" @click="scrollLeft">
          <span class="arrow left-arrow chevron">&#x276E;</span>
        </div>
        
        <!-- Lista de videos -->
        <div class="video-list" ref="videoList" @scroll="checkScroll">
          <div
            v-for="video in relatedVideos"
            :key="video.id"
            class="video-item"
            :style="{ backgroundImage: `url(${video.thumbnail})` }"
            @click="handlePlayRelatedVideo(video.src)"
          >
            <div class="hover-overlay">
              <div class="video-info">
                <p class="textfamily">{{ video.title }} / {{ video.duration }}</p>
              </div>
              <button class="play-button">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="white"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Flecha derecha -->
        <div class="arrow-container right-arrow-container" :class="{ invisible: !canScrollRight }" @click="scrollRight">
          <span class="arrow right-arrow chevron">&#x276F;</span>
        </div>
      </div>
    </transition>

    <button @click="toggleVideoList" class="custom-button toggle-button" :class="{ 'moved-up': showVideoList }">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline :points="showVideoList ? '18 15 12 9 6 15' : '6 9 12 15 18 9'"></polyline>
      </svg>
      <span>{{ showVideoList ? 'Show Less' : 'Show More' }}</span>
    </button>
  </div>
</template>

<script>
import CButton from './CButton.vue';

export default {
  name: 'VideoPreview',
  components: {
    CButton
  },
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
    },
    customThumbnail: {
      type: String,
      default: '' // Permite que no sea obligatorio
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
    this.$nextTick(this.checkScroll); // Comprobar el estado inicial del scroll
    window.addEventListener('resize', this.checkScroll); // Detectar cambios en el tamaño de la ventana
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScroll); // Eliminar el listener al desmontar
  },
  methods: {
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
        video.title = data[0].title;
        video.duration = this.formatDuration(data[0].duration);
      }
    },
    playVideo() {
      this.$emit('play-video', this.videoSrc, this.type);
    },
    toggleVideoList() {
      this.showVideoList = !this.showVideoList;
      this.$nextTick(this.checkScroll); // Verificar el scroll después de cambiar la lista
    },
    scrollLeft() {
      const container = this.$refs.videoList;
      if (container) {
        container.scrollBy({ left: -300, behavior: 'smooth' });
        this.$nextTick(this.checkScroll); // Verificar después de mover
      }
    },
    scrollRight() {
      const container = this.$refs.videoList;
      if (container) {
        container.scrollBy({ left: 300, behavior: 'smooth' });
        this.$nextTick(this.checkScroll); // Verificar después de mover
      }
    },
    checkScroll() {
      const container = this.$refs.videoList;
      if (container) {
        // Verificar si se puede hacer scroll a la izquierda o derecha
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

.textfamily {
  font-family: 'NewYork', serif; /* Usa la fuente para todos los títulos */
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
  min-height: 800px;
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
  background-color: #0000002c;
  z-index: 999;
  overflow: hidden;
}

.video-list {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  max-width: calc(4 * 300px);
  gap: 0px;
  flex-grow: 1;
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
  color: rgb(255, 255, 255);
  font-size: 2em;
  user-select: none;
  padding: 0 10px;
}

.arrow:hover {
  color: yellow;
}

.arrow-container {
  position: relative;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-arrow-container {
  left: 0;
}

.right-arrow-container {
  right: 0;
}

.invisible {
  visibility: hidden;
  pointer-events: none;
}

.video-list::-webkit-scrollbar {
  display: none;
}

.video-list {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.chevron {
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.custom-button {
  margin: 10px 0;
  padding: 12px 24px;
  background-color: #00000000;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  z-index: 1000;
  white-space: nowrap;
}

.custom-button .icon {
  margin-right: 8px;
  width: 25px;
  height: 25px;
}

.custom-button:hover .icon {
  stroke: yellow;
}

.custom-button span {
  margin-left: 8px;
}

.custom-button:hover {
  color: yellow;
}

.toggle-button {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.toggle-button.moved-up {
  bottom: auto;
  top: 71%;
  transform: translate(-50%, 40%);
}

@media (max-width: 1500px) {
  .video-list {
    max-width: calc(3 * 300px);
  }
}

@media (max-width: 1200px) {
  .video-list {
    max-width: calc(2 * 300px);
  }
}

@media (max-width: 1000px) {
  .video-list {
    max-width: calc(1 * 200px);
  }

  .video-item {
    width: 200px;
    height: 150px;
    position: relative;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
}

@media (min-width: 1000px) {
  .video-item {
    width: 300px;
    height: 150px;
    position: relative;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
}

@media (max-width: 1000px) {
  .video-preview {
    width: 100vw;
    height: calc(100vw * 9 / 16);
    min-height: auto;
  }

  .video-list {
    flex-direction: row;
    max-width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .video-item {
    width: 100%;
    height: calc(100vw * 9 / 16);
  }
}
</style>
