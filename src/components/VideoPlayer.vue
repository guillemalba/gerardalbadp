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
    },
    mounted() {
      window.addEventListener('resize', this.updateHeights);
      this.updateHeights();
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
      updateHeights() {
        const videoContainer = this.$refs.videoContainer;
        const videoDetails = this.$refs.videoDetails;
        if (videoContainer && videoDetails) {
          videoDetails.style.height = `${videoContainer.clientHeight}px`;
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
    max-width: 92%; /* Limit the maximum width */
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
  </style>
  