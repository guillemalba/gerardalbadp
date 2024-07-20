<template>
    <div class="video-container">
      <iframe
        :src="embedUrl"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FullScreenVideo',
    props: {
      src: {
        type: String,
        required: true
      }
    },
    computed: {
      embedUrl() {
        // Convertir la URL de Vimeo en una URL embebible
        const videoId = this.src.split('/').pop();
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .video-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>
  