<template>
  <div class="home-page">
    <LeftSidebar />
    <div>
      <VideoPreview
        title="MUSIC VIDEOS"
        :videoSrc="musicVideos[0].src"
        :relatedVideos="musicVideos"
        @play-video="handlePlayVideo"
      />
      <VideoPreview
        title="COMMERCIALS"
        :videoSrc="commercialVideos[0].src"
        :relatedVideos="commercialVideos"
        @play-video="handlePlayVideo"
      />
      <VideoPreview
        title="UNDERWATER"
        :videoSrc="underwaterVideos[0].src"
        :relatedVideos="underwaterVideos"
        @play-video="handlePlayVideo"
      />
      <VideoPreview
        title="FILMS"
        :videoSrc="filmVideos[0].src"
        :relatedVideos="filmVideos"
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
      musicVideos: [
        { id: 1, src: 'https://vimeo.com/522564568' },
        { id: 2, src: 'https://vimeo.com/522377522' },
        { id: 3, src: 'https://vimeo.com/491834523' }
      ],
      commercialVideos: [
        { id: 1, src: 'https://vimeo.com/290744844' },
        { id: 2, src: 'https://vimeo.com/199707225' },
        { id: 3, src: 'https://vimeo.com/189584267' },
        { id: 4, src: 'https://vimeo.com/522549222' },
        { id: 5, src: 'https://vimeo.com/189584267' },
        { id: 6, src: 'https://vimeo.com/522549222' },
        { id: 7, src: 'https://vimeo.com/189584267' }
      ],
      underwaterVideos: [
        { id: 1, src: 'https://vimeo.com/522377522' },
        { id: 2, src: 'https://vimeo.com/522549222' },
        { id: 3, src: 'https://vimeo.com/522726870' }
      ],
      filmVideos: [
        { id: 1, src: 'https://vimeo.com/522726870' }
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
  position: relative;
  display: flex;
  background-color: rgb(0, 0, 0);
  overflow: hidden;
}
</style>
