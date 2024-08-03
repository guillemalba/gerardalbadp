<template>
    <div class="video-player-page">
      <div class="video-content">
        <div class="video-container" ref="videoContainer">
          <iframe
            :src="videoEmbedUrl"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
            @load="updateHeights"
          ></iframe>
        </div>
        <div class="video-details" ref="videoDetails">
          <h1>{{ videoTitle }}</h1>
          <p>{{ videoDescription }}</p>
          <ul>
            <li><strong>Director:</strong> {{ videoDirector }}</li>
            <li><strong>Producer:</strong> {{ videoProducer }}</li>
            <li><strong>Duration:</strong> {{ videoDuration }}</li>
          </ul>
        </div>
      </div>
      <div class="related-videos">
        <h2>Related Videos</h2>
        <div class="video-list-container">
          <div v-if="canScrollLeft" class="arrow left-arrow" @click="scrollLeft">&#9664;</div>
          <div class="video-list" ref="videoList">
            <div
              v-for="video in relatedVideos"
              :key="video.id"
              class="video-item"
              :style="{ backgroundImage: `url(${video.thumbnail})` }"
            >
              <div class="hover-overlay">
                <div class="video-info">
                  <p>{{ video.title }} / {{ video.duration }}</p>
                </div>
                <button @click="handlePlayRelatedVideo(video.src)" class="play-button">
                  <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div v-if="canScrollRight" class="arrow right-arrow" @click="scrollRight">&#9654;</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VideoPlayer',
    data() {
      return {
        videoTitle: '',
        videoDescription: '',
        videoDirector: '',
        videoProducer: '',
        videoDuration: '',
        relatedVideos: [],
        canScrollLeft: false,
        canScrollRight: true
      };
    },
    computed: {
      videoEmbedUrl() {
        const videoId = this.$route.query.videoSrc.split('/').pop();
        return `https://player.vimeo.com/video/${videoId}`;
      },
    },
    created() {
      this.fetchVideoDetails();
      this.fetchRelatedVideos();
    },
    mounted() {
      window.addEventListener('resize', this.updateHeights);
      this.updateHeights();
      this.$nextTick(this.checkScroll);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.updateHeights);
    },
    methods: {
      async fetchVideoDetails() {
        const videoId = this.$route.query.videoSrc.split('/').pop();
        const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
        const data = await response.json();
        const videoData = data[0];
        this.videoTitle = videoData.title;
        this.videoDescription = videoData.description;
        this.videoDirector = videoData.user_name; // Assuming the user name is the director
        this.videoProducer = videoData.user_name; // Assuming the user name is the producer
        this.videoDuration = this.formatDuration(videoData.duration);
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
            { id: 5, src: 'https://vimeo.com/189584267', thumbnail: '', title: '', duration: '' },
            { id: 6, src: 'https://vimeo.com/522549222', thumbnail: '', title: '', duration: '' },
            { id: 7, src: 'https://vimeo.com/189584267', thumbnail: '', title: '', duration: '' }
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
          video.title = data[0].title; // Assuming the API provides the title
          video.duration = this.formatDuration(data[0].duration); // Convert duration to mm:ss format
        }
      },
      updateHeights() {
        const videoContainer = this.$refs.videoContainer;
        const videoDetails = this.$refs.videoDetails;
        if (videoContainer && videoDetails) {
          videoDetails.style.height = `${videoContainer.clientHeight}px`;
        }
      },
      handlePlayRelatedVideo(src) {
        const videoType = this.$route.query.videoType;
        this.$router.push({ name: 'VideoPlayer', query: { videoSrc: src, videoType: videoType } });
      },
      scrollLeft() {
        const container = this.$refs.videoList;
        if (container) {
          container.scrollBy({ left: -300, behavior: 'smooth' });
          this.$nextTick(this.checkScroll);
        }
      },
      scrollRight() {
        const container = this.$refs.videoList;
        if (container) {
          container.scrollBy({ left: 300, behavior: 'smooth' });
          this.$nextTick(this.checkScroll);
        }
      },
      checkScroll() {
        const container = this.$refs.videoList;
        if (container) {
          this.canScrollLeft = container.scrollLeft > 0;
          this.canScrollRight = container.scrollWidth > container.clientWidth + container.scrollLeft;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .video-player-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #000;
    color: #fff;
    align-items: center;
  }
  
  .video-content {
    margin-top: 50px;
    display: flex;
    width: 100%;
    max-width: 1500px; 
    align-items: center;
    justify-content: space-between; /* Space between the video and details */
    padding: 20px;
    box-sizing: border-box;
  }
  
  .video-container {
    flex: 0 0 70%; /* Take 70% of the parent width */
    position: relative;
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .video-container::after {
    content: "";
    display: block;
    padding-bottom: 56.25%; /* Maintain 16:9 aspect ratio */
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
    flex: 0 0 30%; /* Take the remaining 30% of the parent width */
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
  
  .video-details p {
    margin-bottom: 20px;
  }
  
  .video-details ul {
    list-style: none;
    padding: 0;
  }
  
  .video-details li {
    margin-bottom: 10px;
  }
  
  .video-details strong {
    color: #ccc;
  }
  
  .related-videos {
    width: 100%;
    max-width: 1000px;
    box-sizing: border-box;
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
    /* Oculta el contenido desbordado para que las flechas no se muevan */
  }
  
  .video-list {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    max-width: calc(4 * 300px);
    /* Ancho máximo para mostrar 4 videos a la vez, ajusta según el tamaño de los videos */
    gap: 0px;
    /* Espacio entre los videos */
    flex-grow: 1;
    /* Permite que el contenedor de videos crezca y ocupe el espacio disponible */
  }
  
  .video-item {
    position: relative;
    width: 300px;
    height: 200px;
    flex-shrink: 0;
    /* Evita que los videos se encojan */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
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
    top: 10%; /* Subir el botón */
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
  
  /* Ocultar la barra de desplazamiento en diferentes navegadores */
  .video-list::-webkit-scrollbar {
    display: none;
    /* Ocultar en Chrome, Safari y Opera */
  }
  
  .video-list {
    -ms-overflow-style: none;
    /* Ocultar en Internet Explorer y Edge */
    scrollbar-width: none;
    /* Ocultar en Firefox */
  }
  </style>
