<template>
    <div class="video-player">
      <div class="video-container">
        <div class="iframe-wrapper">
          <iframe :src="embedUrl" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
          
        </div>
      </div>
      <div class="video-info">
        <h1>{{ videoInfo.title }}</h1>
        <p>{{ videoInfo.description }}</p>
        <div class="credits">
          <h2>Credits</h2>
          <ul>
            <li v-for="credit in videoInfo.credits" :key="credit">{{ credit }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VideoPlayer',
    props: {
      videoSrc: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        videoInfo: {
          title: '',
          description: '',
          credits: []
        }
      };
    },
    computed: {
      embedUrl() {
        if (this.videoSrc) {
          const videoId = this.videoSrc.split('/').pop();
          return `https://player.vimeo.com/video/${videoId}`;
        }
        return '';
      }
    },
    created() {
      if (this.videoSrc) {
        this.fetchVideoInfo(this.videoSrc);
      }
    },
    methods: {
      async fetchVideoInfo(videoUrl) {
        const videoId = videoUrl.split('/').pop();
        const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
        const data = await response.json();
        this.videoInfo.title = data[0].title;
        this.videoInfo.description = data[0].description;
        this.videoInfo.credits = data[0].credits || ['No credits available'];
      }
    }
  };
  </script>
  
  <style scoped>
  .video-player {
    display: flex;
    gap: 20px;
    padding: 20px;
    background-color: #b30000;
    color: #fff;
    height: 100vh;
    box-sizing: border-box;
  }
  
  .iframe-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
  }

  .credits-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
  }
  
  .video-container {
    flex: 2;
    display: flex;
    justify-content: center;
  }
  
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  
  .video-info {
    flex: 1;
    background-color: #1e1e1e;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;

    height: 400px;
  }
  
  .video-info h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .video-info p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .credits h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .credits ul {
    list-style-type: none;
    padding: 0;
  }
  
  .credits li {
    font-size: 14px;
    margin-bottom: 5px;
  }
  </style>
  