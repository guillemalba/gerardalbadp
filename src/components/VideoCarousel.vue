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
        <div 
          v-for="video in relatedVideos" 
          :key="video.id" 
          class="carousel-slide"
          :style="{ backgroundImage: `url(${video.thumbnail})` }">
          <div class="video-info">
            <p>{{ video.title }} / {{ video.duration }}</p>
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
    };
  },
  props: {
    relatedVideos: Array,
    title: String,
  },
  methods: {
    goToSlide(index) {
      this.currentIndex = index;
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX; // Guardar la posición del toque
    },
    handleTouchEnd(event) {
      const touchEndX = event.changedTouches[0].clientX; // Posición cuando se levanta el dedo
      this.handleSwipe(touchEndX - this.touchStartX); // Calcular la diferencia
    },
    handleMouseStart(event) {
      this.mouseStartX = event.clientX; // Guardar la posición inicial del ratón
    },
    handleMouseEnd(event) {
      const mouseEndX = event.clientX; // Posición cuando se suelta el clic
      this.handleSwipe(mouseEndX - this.mouseStartX); // Calcular la diferencia
    },
    handleSwipe(deltaX) {
      const swipeThreshold = 50; // Umbral para considerar un swipe
      if (deltaX > swipeThreshold) {
        this.prevSlide(); // Desplazar a la izquierda (anterior)
      } else if (deltaX < -swipeThreshold) {
        this.nextSlide(); // Desplazar a la derecha (siguiente)
      }
    },
    prevSlide() {
      // Si no es el primer video, retroceder uno
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextSlide() {
      // Si no es el último video, avanzar uno
      if (this.currentIndex < this.relatedVideos.length - 1) {
        this.currentIndex++;
      }
    },
  },
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
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: flex-end;
}

.video-info {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  width: 100%;
  text-align: left;
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
