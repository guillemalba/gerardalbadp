<template>
  <div class="background-video">
    <iframe :src="videoEmbedUrl" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen></iframe>
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
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 100;
}

.background-video iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1920px; /* Fija el ancho del video */
  height: 1080px; /* Fija la altura del video */
  transform: translate(-50%, -50%);
  pointer-events: none; /* Asegura que el video no sea interactivo */
}
</style>
