<template>
  <div class="background-video">
    <iframe :src="videoEmbedUrl" ref="videoIframe" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen></iframe>
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
  },
  mounted() {
    this.adjustVideoSize();
    window.addEventListener('resize', this.adjustVideoSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.adjustVideoSize);
  },
  methods: {
    adjustVideoSize() {
      const iframe = this.$refs.videoIframe;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const aspectRatio = 1920 / 1080;

      if (windowWidth / windowHeight < aspectRatio) {
        iframe.style.width = `${windowHeight * aspectRatio}px`;
        iframe.style.height = `${windowHeight}px`;
      } else {
        iframe.style.width = `${windowWidth}px`;
        iframe.style.height = `${windowWidth / aspectRatio}px`;
      }
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
  min-height: 800px;
}

.background-video iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; /* Asegura que el video no sea interactivo */
}
</style>
