<template>
    <div class="video-detail-container">
      <!-- Header con la flecha hacia atrás -->
      <div class="video-detail-header">
        <button @click="goBack" class="back-button">
          &#x2190;
        </button>
        <h2>{{ sectionTitle }}</h2>
      </div>
  
      <!-- Reproductor de Vimeo para el video actual -->
      <div class="video-player-container">
        <iframe
          :src="getEmbedUrl(video.src)"
          width="100%"
          height="400px"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
  
      <!-- Créditos del video -->
      <div class="video-credits">
        <h3>Credits</h3>
        <p>{{ video.credits }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      video: Object,
      sectionTitle: String
    },
    methods: {
      getEmbedUrl(src) {
        const videoId = src.split('/').pop();
        return `https://player.vimeo.com/video/${videoId}`;
      },
      goBack() {
        this.$router.go(-1); // Navegar hacia atrás
      }
    }
  };
  </script>
  
  <style scoped>
  .video-detail-container {
    padding: 20px;
  }
  
  .video-detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .back-button {
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .video-player-container {
    margin-bottom: 20px;
  }
  
  .video-credits {
    margin-top: 20px;
  }
  </style>
  