<template>
    <div class="background-video">
      <iframe :src="videoEmbedUrl" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BackgroundVideo',
    props: {
      videoSrc: {
        type: String,
        required: true
      }
    },
    computed: {
      videoEmbedUrl() {
        const videoId = this.videoSrc.split('/').pop();
        return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1`;
      }
    }
  };
  </script>
  
  <style scoped>
  .background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    overflow: hidden;
  }
  
  .background-video iframe {
    width: 100%;
    height: 100%;
    pointer-events: none; /* Ensure the video is not interactive */
    object-fit: cover;
  }
  </style>
  