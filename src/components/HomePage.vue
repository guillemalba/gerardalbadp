<template>
  <div class="home-page">
    <LeftSidebar />
    <div>
      <VideoPreview
        title="Music Videos"
        thumbnail="path/to/your/image.jpg"
        :videoSrc="videos[0].src"
        :relatedVideos="videos"
        @play-video="handlePlayVideo"
      />
      <VideoPreview
        title="Comercials"
        thumbnail="path/to/your/image.jpg"
        :videoSrc="videos[1].src"
        :relatedVideos="videos"
        @play-video="handlePlayVideo"
      />
    </div>
    <RightSidebar />
  </div>
</template>

<script>
import LeftSidebar from './LeftSidebar.vue';
import RightSidebar from './RightSidebar.vue';
import VideoPreview from './VideoPreview.vue';

export default {
  name: 'HomePage',
  components: {
    LeftSidebar,
    RightSidebar,
    VideoPreview,
  },
  data() {
    return {
      videos: [
        { id: 1, src: 'https://vimeo.com/522564568' },
        { id: 2, src: 'https://vimeo.com/522377522' },
        { id: 3, src: 'https://vimeo.com/491834523' }
      ]
    };
  },
  methods: {
    handlePlayVideo(src) {
      // Lógica para reproducir el video en detalle
      console.log(`Reproduciendo video: ${src}`);
    }
  }
};
</script>

<style scoped>
.home-page {
  display: flex;
  background-color: rgb(189, 22, 22);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
