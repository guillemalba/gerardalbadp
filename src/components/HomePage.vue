<!-- HomePage -->
<template>
  <div class="home-page">
    <LeftSidebar class="left-sidebar" />
    <HamburgerMenu v-if="isSmallScreen" />
    <div>
      <BackgroundVideo videoSrc="https://vimeo.com/522837592" />
      <!-- Detectamos si es una pantalla pequeña y mostramos el carousel -->
      <div v-if="isSmallScreen">
        <VideoCarousel 
          title="MUSIC VIDEOS" 
          :relatedVideos="musicVideos" 
          type="music" 
          @play-video="handlePlayVideo" />
        <VideoCarousel 
          title="COMMERCIALS" 
          :relatedVideos="commercialVideos"
          type="commercial" 
          @play-video="handlePlayVideo" />
        <VideoCarousel 
          title="UNDERWATER" 
          :relatedVideos="underwaterVideos"
          type="underwater" 
          @play-video="handlePlayVideo" />
        <VideoCarousel 
          title="FILMS" 
          :relatedVideos="filmVideos" 
          type="film"
          @play-video="handlePlayVideo" />
      </div>
      <!-- Vista original para pantallas grandes -->
      <div v-else>
        <VideoPreview 
        id="first-video-preview" 
        title="MUSIC VIDEOS" 
        :videoSrc="musicVideos[0].src"
        :relatedVideos="musicVideos" 
        type="music" 
        :customThumbnail="musicVideoThumbnail"
        @play-video="handlePlayVideo" />
      <VideoPreview 
        title="COMMERCIALS" 
        :videoSrc="commercialVideos[0].src" 
        :relatedVideos="commercialVideos"
        type="commercial" 
        :customThumbnail="commercialThumbnail"
        @play-video="handlePlayVideo" />
      <VideoPreview 
        title="UNDERWATER" 
        :videoSrc="underwaterVideos[0].src" 
        :relatedVideos="underwaterVideos"
        type="underwater" 
        :customThumbnail="underwaterThumbnail"
        @play-video="handlePlayVideo" />
      <VideoPreview 
        title="FILMS" 
        :videoSrc="filmVideos[0].src" 
        :relatedVideos="filmVideos" 
        type="film"
        :customThumbnail="filmThumbnail"
        @play-video="handlePlayVideo" />
      </div>
    </div>
    <RightSidebar class="right-sidebar" />
    <FooterPage />
  </div>
</template>

<script>
import LeftSidebar from './LeftSidebar.vue';
import RightSidebar from './RightSidebar.vue';
import VideoPreview from './VideoPreview.vue';
import BackgroundVideo from './BackgroundVideo.vue';
import FooterPage from './FooterPage.vue';
import HamburgerMenu from './HamburgerMenu.vue';
import VideoCarousel from './VideoCarousel.vue';

export default {
  name: 'HomePage',
  components: {
    LeftSidebar,
    RightSidebar,
    VideoPreview,
    BackgroundVideo,
    FooterPage,
    HamburgerMenu,
    VideoCarousel // Añadido para la vista de acordeón
  },
  data() {
    return {
      musicVideos: [
        { id: 1, src: 'https://vimeo.com/522564568' },
        { id: 2, src: 'https://vimeo.com/522377522' },
        { id: 3, src: 'https://vimeo.com/491834523' },
        { id: 4, src: 'https://vimeo.com/1005402186' }
      ],
      commercialVideos: [
        { id: 1, src: 'https://vimeo.com/290744844' },
        { id: 2, src: 'https://vimeo.com/199707225' },
        { id: 3, src: 'https://vimeo.com/189584267' },
        { id: 4, src: 'https://vimeo.com/522549222' },
        { id: 5, src: 'https://vimeo.com/522377522' },
        { id: 6, src: 'https://vimeo.com/522726870' }
      ],
      underwaterVideos: [
        { id: 1, src: 'https://vimeo.com/522377522' },
        { id: 2, src: 'https://vimeo.com/522549222' },
        { id: 3, src: 'https://vimeo.com/522726870' }
      ],
      filmVideos: [
        { id: 1, src: 'https://vimeo.com/522726870' }
      ],
      isSmallScreen: window.innerWidth < 1000
    };
  },
  computed: {
    musicVideoThumbnail() {
      return require('@/assets/images/musicvideos.png');
    },
    commercialThumbnail() {
      return require('@/assets/images/commercials.png');
    },
    underwaterThumbnail() {
      return require('@/assets/images/underwater.png');
    },
    filmThumbnail() {
      return require('@/assets/images/films.png');
    }
  },
  methods: {
    handlePlayVideo(src, type) {
      this.saveScrollPosition(); // Guardar la posición del scroll antes de redirigir
      this.$router.push({ name: 'VideoPlayer', query: { videoSrc: src, videoType: type } });
    },
    saveScrollPosition() {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      localStorage.setItem('scrollPosition', scrollPosition.toString());
    },
    handleResize() {
      this.isSmallScreen = window.innerWidth < 1000;
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped>
.home-page {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgb(0, 0, 0);
  overflow: hidden;
  scrollbar-color: rgb(0, 47, 255) black;
}

.home-page > div {
  flex: 1;
}

@media (max-width: 1000px) {
  .left-sidebar,
  .right-sidebar {
    display: none;
  }
}
</style>
