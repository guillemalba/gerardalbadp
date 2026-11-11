<template>
  <div class="video-player-page">
    <LeftSidebar />
    <RightSidebar />

    <main class="main-content">
      <header class="head">
        <div>
          <p class="label kicker">Now playing</p>
          <h2 class="section-title">{{ sectionTitle }}</h2>
        </div>
        <button class="close-button btn-round" aria-label="Close" @click="redirectToHomePage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </header>

      <div class="video-content">
        <div class="video-container" ref="videoContainer">
          <iframe :src="videoEmbedUrl" frameborder="0" allow="autoplay; fullscreen" allowfullscreen
            @load="updateHeights"></iframe>
        </div>
        <div class="video-details" ref="videoDetails">
          <h1>{{ videoTitle }}</h1>
          <div v-html="videoDescription" class="video-description"></div>
          <ul class="video-credits">
            <li><span class="label">Director</span>{{ videoDirector }}</li>
            <li><span class="label">Producer</span>{{ videoProducer }}</li>
            <li><span class="label">Duration</span>{{ videoDuration }}</li>
          </ul>
        </div>
      </div>

      <div class="related-videos">
        <button class="btn-round arrow" :class="{ invisible: !canScrollLeftRelated }" aria-label="Previous" @click="scrollLeftRelated">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="video-list" ref="videoList">
          <button v-for="(video, index) in relatedVideos" :key="video.id" class="video-item"
            :class="{ 'active-video': currentVideoIndex === index }"
            :style="{ backgroundImage: `url(${video.thumbnail})` }" @click="handlePlayRelatedVideo(video.src, index)">
            <span class="item-info">
              <span class="item-title">{{ video.title }}</span>
              <span class="item-time label">{{ currentVideoIndex === index ? 'Playing' : video.duration }}</span>
            </span>
          </button>
        </div>
        <button class="btn-round arrow" :class="{ invisible: !canScrollRightRelated }" aria-label="Next" @click="scrollRightRelated">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </main>
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
          { id: 3, src: 'https://vimeo.com/491834523', thumbnail: '', title: '', duration: '' },
          { id: 4, src: 'https://vimeo.com/1005402186', thumbnail: '', title: '', duration: '' }
        ];
      } else if (videoType === 'commercial') {
        this.relatedVideos = [
          { id: 1, src: 'https://vimeo.com/290744844', thumbnail: '', title: '', duration: '' },
          { id: 2, src: 'https://vimeo.com/199707225', thumbnail: '', title: '', duration: '' },
          { id: 3, src: 'https://vimeo.com/189584267', thumbnail: '', title: '', duration: '' },
          { id: 4, src: 'https://vimeo.com/522549222', thumbnail: '', title: '', duration: '' }
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
.video-player-page {
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
}

.main-content {
  max-width: 1500px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 40px calc(var(--rail) + var(--gutter)) 48px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  justify-content: center;
}

.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}
.kicker { color: var(--ink-dim); margin: 0 0 10px; }
.section-title { font-size: clamp(28px, 3.2vw, 44px); line-height: 1; text-transform: uppercase; }

.video-content {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 3fr);
  gap: 24px;
  align-items: start;
}

.video-container {
  position: relative;
  background: #0d0d0d;
}
.video-container::after { content: ''; display: block; padding-bottom: 56.25%; }
.video-container iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.video-details {
  padding: 4px 0 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
}
.video-details h1 { font-size: 26px; line-height: 1.15; }
.video-description { font-family: var(--font-text); font-size: 15px; line-height: 1.6; color: var(--ink-dim); }
.video-credits { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
.video-credits li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-text);
  font-size: 15px;
}
.video-credits .label { font-size: 11px; color: var(--ink-dim); align-self: center; }

.related-videos { display: flex; align-items: center; gap: 14px; }
.video-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  flex: 1;
  min-width: 0;
}
.video-list::-webkit-scrollbar { display: none; }

.video-item {
  position: relative;
  flex: 0 0 clamp(200px, 22vw, 280px);
  aspect-ratio: 16 / 9;
  padding: 0;
  border: none;
  background-color: #111;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  text-align: left;
  outline: 1px solid transparent;
  outline-offset: -1px;
  transition: transform var(--t) var(--ease), outline-color var(--t), opacity var(--t);
}
.video-item:not(.active-video) { opacity: 0.8; }
.video-item.active-video { outline-color: var(--accent); opacity: 1; }
.item-info {
  width: 100%;
  padding: 24px 12px 10px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0));
}
.item-title { font-family: var(--font-text); font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.item-time { font-size: 11px; letter-spacing: 0.16em; color: var(--ink-dim); flex: none; }
.video-item.active-video .item-time { color: var(--accent); }

.arrow svg { width: 20px; height: 20px; }
.invisible { visibility: hidden; pointer-events: none; }

@media (hover: hover) {
  .video-item:hover { transform: translateY(-2px); opacity: 1; }
}

@media (max-width: 1000px) {
  .main-content { padding-left: var(--gutter); padding-right: var(--gutter); }
  .video-content { grid-template-columns: 1fr; }
  .video-details { height: auto !important; }
}
</style>
