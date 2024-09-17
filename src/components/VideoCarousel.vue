<template>
  <div class="carousel-container">
    <h2>{{ title }}</h2>
    <div 
      class="carousel" 
      @touchstart="handleTouchStart" 
      @touchend="handleTouchEnd" 
      @mousedown="handleMouseStart" 
      @mouseup="handleMouseEnd">
      <!-- Contenedor de videos, que se desplaza de acuerdo al video actual -->
      <div 
        class="carousel-track" 
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        
        <!-- Aquí agregamos la lógica para mostrar el reproductor de video o la miniatura -->
        <div 
          v-for="(video, index) in relatedVideos" 
          :key="video.id" 
          class="carousel-slide">
          
          <!-- Si es el video actual y está en reproducción, mostramos el reproductor -->
          <div class="video-container">
            <iframe
              v-if="isPlaying && currentIndex === index"
              :src="getEmbedUrl(video.src)"
              width="100%"
              height="100%"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>

            <!-- Si no se está reproduciendo, mostramos la miniatura -->
            <div 
              v-else 
              class="thumbnail" 
              :style="{ backgroundImage: `url(${video.thumbnail || defaultThumbnail})` }"
              @click="playVideo(index)">
              <div class="overlay">
                <button class="play-button">
                  <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" stroke="white"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
              </div>
              <div class="video-info">
                <p>{{ video.title }} / {{ video.duration }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Dots para indicar el video actual -->
    <div class="carousel-dots">
      <span 
        v-for="(video, index) in relatedVideos" 
        :key="index"
        :class="{ 'active': index === currentIndex }"
        @click="goToSlide(index)">
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0, // Índice del video actual
      touchStartX: 0,  // Coordenada inicial del toque
      mouseStartX: 0,  // Coordenada inicial del mouse (para dispositivos con ratón)
      isPlaying: false, // Indicador para saber si el video está en reproducción
      defaultThumbnail: require('@/assets/images/bio_profile.png') // Imagen por defecto si el thumbnail no carga
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
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`; // Autoplay al cargar el video
    },
    goToSlide(index) {
      this.currentIndex = index;
      this.isPlaying = false; // Reiniciar el estado de reproducción cuando se cambia de slide
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    handleTouchEnd(event) {
      const touchEndX = event.changedTouches[0].clientX;
      this.handleSwipe(touchEndX - this.touchStartX);
    },
    handleMouseStart(event) {
      this.mouseStartX = event.clientX;
    },
    handleMouseEnd(event) {
      const mouseEndX = event.clientX;
      this.handleSwipe(mouseEndX - this.mouseStartX);
    },
    handleSwipe(deltaX) {
      const swipeThreshold = 50;
      if (deltaX > swipeThreshold) {
        this.prevSlide();
      } else if (deltaX < -swipeThreshold) {
        this.nextSlide();
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.isPlaying = false; // Detener reproducción si se cambia de slide
      }
    },
    nextSlide() {
      if (this.currentIndex < this.relatedVideos.length - 1) {
        this.currentIndex++;
        this.isPlaying = false; // Detener reproducción si se cambia de slide
      }
    },
    playVideo(index) {
      this.currentIndex = index;
      this.isPlaying = true; // Iniciar la reproducción en el slide actual
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

.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.carousel-slide {
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-container {
  width: 100%;
  height: 300px; /* Asegúrate de que este tamaño sea el mismo para las miniaturas y los videos */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 48px;
  cursor: pointer;
}

.play-button .icon {
  width: 48px;
  height: 48px;
}

.video-info {
  color: white;
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.carousel-dots {
  text-align: center;
  margin-top: 10px;
}

.carousel-dots span {
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #ddd;
  margin: 0 5px;
  cursor: pointer;
}

.carousel-dots .active {
  background-color: #333;
}
</style>
