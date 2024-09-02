<!-- VideoPlayer -->
<template>
  <div class="video-player-page">
    <LeftSidebar />
    <div class="main-content">
      <button class="close-button" @click="redirectToHomePage">&times;</button>
      <h1>{{ sectionTitle }}</h1>
      <div class="video-content">
        <div class="arrow-container left-arrow-container" :class="{ invisible: currentVideoIndex === 0 }"
          @click="playPreviousVideo">
          <span class="arrow chevron">&#x276E;</span>
        </div>
        <div class="video-and-details">
          <div class="video-container" ref="videoContainer">
            <iframe :src="videoEmbedUrl" frameborder="0" allow="autoplay; fullscreen" allowfullscreen
              @load="updateHeights"></iframe>
          </div>
          <div class="video-details" ref="videoDetails">
            <h1>{{ videoTitle }}</h1>
            <div v-html="videoDescription" class="video-description"></div>
            <ul class="video-credits">
              <li><strong>Director:</strong> {{ videoDirector }}</li>
              <li><strong>Producer:</strong> {{ videoProducer }}</li>
              <li><strong>Duration:</strong> {{ videoDuration }}</li>
            </ul>
          </div>
        </div>
        <div class="arrow-container right-arrow-container"
          :class="{ invisible: currentVideoIndex === relatedVideos.length - 1 }" @click="playNextVideo">
          <span class="arrow chevron">&#x276F;</span>
        </div>
      </div>
      <div class="related-videos">
        <div class="video-list-container">
          <div class="arrow-container left-arrow-container" :class="{ invisible: !canScrollLeftRelated }"
            @click="scrollLeftRelated">
            <span class="arrow left-arrow chevron">&#x276E;</span>
          </div>
          <div class="video-list" ref="videoList">
            <div v-for="(video, index) in relatedVideos" :key="video.id" class="video-item"
              :class="{ 'active-video': currentVideoIndex === index }"
              :style="{ backgroundImage: `url(${video.thumbnail})` }" @click="handlePlayRelatedVideo(video.src, index)">
              <div class="hover-overlay">
                <div class="video-info">
                  <p>{{ video.title }} / {{ video.duration }}</p>
                </div>
                <button class="play-button">
                  <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
              </div>
              <div v-if="currentVideoIndex === index" class="playing-indicator">
                Playing
              </div>
            </div>
          </div>
          <div class="arrow-container right-arrow-container" :class="{ invisible: !canScrollRightRelated }"
            @click="scrollRightRelated">
            <span class="arrow right-arrow chevron">&#x276F;</span>
          </div>
        </div>
      </div>
    </div>
    <RightSidebar />
  </div>
</template>

<script>
import LeftSidebar from './LeftSidebar.vue';
import RightSidebar from './RightSidebar.vue';

export default {
  name: 'VideoPlayer',
  components: {
    LeftSidebar,
    RightSidebar
  },
  data() {
    return {
      videoTitle: '',
      videoDescription: '',
      videoDirector: '',
      videoProducer: '',
      videoDuration: '',
      relatedVideos: [],
      canScrollLeftRelated: false,
      canScrollRightRelated: true,
      canScrollLeftMain: false,
      canScrollRightMain: true,
      currentVideoIndex: 0,
      sectionTitle: '',
    };
  },
  computed: {
    videoEmbedUrl() {
      const videoId = this.$route.query.videoSrc.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    },
  },
  watch: {
    '$route.query.videoSrc': 'fetchVideoDetails',
  },
  created() {
    this.fetchVideoDetails();
    this.fetchRelatedVideos();
    this.sectionTitle = this.getSectionTitle(this.$route.query.videoType);
  },
  mounted() {
    window.addEventListener('resize', this.updateHeights);
    const videoList = this.$refs.videoList;
    if (videoList) {
      videoList.addEventListener('scroll', this.checkScrollRelated);
    }
    this.updateHeights();
    this.$nextTick(this.checkScrollRelated);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateHeights);
    const videoList = this.$refs.videoList;
    if (videoList) {
      videoList.removeEventListener('scroll', this.checkScrollRelated);
    }
  },
  methods: {
    redirectToHomePage() {
      this.$router.push({ name: 'Home' });
    },
    async fetchVideoDetails() {
      const videoId = this.$route.query.videoSrc.split('/').pop();
      const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
      const data = await response.json();
      const videoData = data[0];
      this.videoTitle = videoData.title;
      this.videoDescription = videoData.description.replace(/\n/g, '<br />');
      this.videoDirector = videoData.user_name;
      this.videoProducer = videoData.user_name;
      this.videoDuration = this.formatDuration(videoData.duration);
      this.updateCurrentVideoIndex(videoId);
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    fetchRelatedVideos() {
      const videoType = this.$route.query.videoType;
      if (videoType === 'music') {
        this.relatedVideos = [
          { id: 1, src: 'https://vimeo.com/522564568', thumbnail: '', title: '', duration: '' },
          { id: 2, src: 'https://vimeo.com/522377522', thumbnail: '', title: '', duration: '' },
          { id: 3, src: 'https://vimeo.com/491834523', thumbnail: '', title: '', duration: '' }
        ];
      } else if (videoType === 'commercial') {
        this.relatedVideos = [
          { id: 1, src: 'https://vimeo.com/290744844', thumbnail: '', title: '', duration: '' },
          { id: 2, src: 'https://vimeo.com/199707225', thumbnail: '', title: '', duration: '' },
          { id: 3, src: 'https://vimeo.com/189584267', thumbnail: '', title: '', duration: '' },
          { id: 4, src: 'https://vimeo.com/522549222', thumbnail: '', title: '', duration: '' },
          { id: 5, src: 'https://vimeo.com/522377522', thumbnail: '', title: '', duration: '' },
          { id: 6, src: 'https://vimeo.com/522726870', thumbnail: '', title: '', duration: '' }
        ];
      } else if (videoType === 'underwater') {
        this.relatedVideos = [
          { id: 1, src: 'https://vimeo.com/522377522', thumbnail: '', title: '', duration: '' },
          { id: 2, src: 'https://vimeo.com/522549222', thumbnail: '', title: '', duration: '' },
          { id: 3, src: 'https://vimeo.com/522726870', thumbnail: '', title: '', duration: '' }
        ];
      } else if (videoType === 'film') {
        this.relatedVideos = [
          { id: 1, src: 'https://vimeo.com/522726870', thumbnail: '', title: '', duration: '' }
        ];
      }
      this.fetchThumbnailsForRelatedVideos();
    },
    async fetchThumbnailsForRelatedVideos() {
      for (const video of this.relatedVideos) {
        const videoId = video.src.split('/').pop();
        const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
        const data = await response.json();
        video.thumbnail = data[0].thumbnail_large;
        video.title = data[0].title;
        video.duration = this.formatDuration(data[0].duration);
      }
      this.$nextTick(this.checkScrollRelated);
    },
    updateHeights() {
      const videoContainer = this.$refs.videoContainer;
      const videoDetails = this.$refs.videoDetails;
      if (videoContainer && videoDetails) {
        videoDetails.style.height = `${videoContainer.clientHeight}px`;
      }
    },
    handlePlayRelatedVideo(src, index) {
      const videoType = this.$route.query.videoType;
      this.$router.push({ name: 'VideoPlayer', query: { videoSrc: src, videoType: videoType } });
      this.currentVideoIndex = index;
      this.fetchVideoDetails();
      this.scrollToActiveVideo();
    },
    playPreviousVideo() {
      if (this.currentVideoIndex > 0) {
        this.currentVideoIndex--;
        const video = this.relatedVideos[this.currentVideoIndex];
        this.handlePlayRelatedVideo(video.src, this.currentVideoIndex);
      }
    },
    playNextVideo() {
      if (this.currentVideoIndex < this.relatedVideos.length - 1) {
        this.currentVideoIndex++;
        const video = this.relatedVideos[this.currentVideoIndex];
        this.handlePlayRelatedVideo(video.src, this.currentVideoIndex);
      }
    },
    getSectionTitle(videoType) {
      const titles = {
        music: 'Music Videos',
        commercial: 'Commercials',
        underwater: 'Underwater',
        film: 'Films',
      };
      return titles[videoType] || '';
    },
    scrollLeftRelated() {
      const container = this.$refs.videoList;
      if (container) {
        container.scrollBy({ left: -300, behavior: 'smooth' });
        this.$nextTick(this.checkScrollRelated);
      }
    },
    scrollRightRelated() {
      const container = this.$refs.videoList;
      if (container) {
        container.scrollBy({ left: 300, behavior: 'smooth' });
        this.$nextTick(this.checkScrollRelated);
      }
    },
    scrollToActiveVideo() {
      const container = this.$refs.videoList;
      const activeVideo = container.children[this.currentVideoIndex];
      if (activeVideo) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeVideo.getBoundingClientRect();
        const offsetLeft = activeRect.left - containerRect.left + container.scrollLeft;
        const scrollOffset = offsetLeft - container.clientWidth / 2 + activeVideo.clientWidth / 2;
        container.scrollTo({ left: scrollOffset, behavior: 'smooth' });
        this.$nextTick(this.checkScrollRelated);
      }
    },
    checkScrollRelated() {
      const container = this.$refs.videoList;
      if (container) {
        this.canScrollLeftRelated = container.scrollLeft > 0;
        this.canScrollRightRelated =
          container.scrollWidth > container.clientWidth + container.scrollLeft + 1;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    updateCurrentVideoIndex(videoId) {
      this.currentVideoIndex = this.relatedVideos.findIndex(video => video.src.endsWith(videoId));
    },
  },
};
</script>

<style scoped>
/* CSS remains unchanged */
.video-player-page {
  display: flex;
  background-color: #000;
  color: #fff;
  padding-left: 75px;
  padding-right: 75px;
  height: 100vh;
}

.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  position: relative;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 55px;
  color: white;
  cursor: pointer;
  z-index: 10000;
}

.close-button:hover {
  color: #ccc;
}

.video-content {
  display: flex;
  width: 100%;
  max-width: 1500px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  padding-left: 50px;
  padding-right: 50px;
}

.video-and-details {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
}

.video-container {
  flex: 0 0 70%;
  position: relative;
  background-color: rgba(0, 0, 0, 0.8);
}

.video-container::after {
  content: '';
  display: block;
  padding-bottom: 56.25%;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-details {
  flex: 0 0 30%;
  background-color: rgba(27, 27, 27, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.video-details h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.video-description {
  margin-bottom: 20px;
  white-space: pre-wrap;
}

.video-credits {
  list-style: none;
  padding: 0;
}

.video-credits li {
  margin-bottom: 10px;
}

.video-credits strong {
  color: #ccc;
}

.related-videos {
  width: 100%;
  margin-top: 50px;
  box-sizing: border-box;
  padding-left: 50px;
  padding-right: 50px;
}

.related-videos h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.video-list-container {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  background-color: #0000002c;
  overflow: hidden;
}

.video-list {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  max-width: calc(4 * 300px);
  gap: 0px;
  flex-grow: 1;
}

.video-item {
  position: relative;
  width: 300px;
  height: 150px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.playing-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.678);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-item:hover .hover-overlay {
  opacity: 1;
}

.play-button {
  position: relative;
  top: 10%;
  transform: translate(0%, -60%);
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
}

.play-button .icon {
  width: 25px;
  height: 25px;
}

.video-info {
  color: white;
  text-align: center;
  margin-top: 10px;
}

.arrow {
  cursor: pointer;
  color: white;
  font-size: 2em;
  user-select: none;
  padding: 0 10px;
}

.arrow:hover {
  color: #ccc;
}

.arrow-container {
  position: relative;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-arrow-container {
  left: 0;
}

.right-arrow-container {
  right: 0;
}

.invisible {
  visibility: hidden;
  pointer-events: none;
}

.video-list::-webkit-scrollbar {
  display: none;
}

.video-list {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.chevron {
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}



@media (max-width: 1500px) {
  .video-list {
    max-width: calc(3 * 300px); /* Ancho máximo para mostrar 3 videos a la vez */
  }
}

@media (max-width: 1200px) {
  .video-list {
    max-width: calc(2 * 300px); /* Ancho máximo para mostrar 2 videos a la vez */
  }
}
</style>
