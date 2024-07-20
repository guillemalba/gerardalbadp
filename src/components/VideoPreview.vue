<template>
    <div class="video-preview" :style="{ backgroundImage: `url(${thumbnail})` }">
      <div class="overlay">
        <h1>{{ title }}</h1>
        <button @click="playVideo" class="custom-button">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Reproducir
        </button>
        <button @click="toggleVideoList" class="custom-button">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Más videos
        </button>
      </div>
      <div v-if="showVideoList" class="video-list">
        <div v-for="video in relatedVideos" :key="video.id" class="video-item">
          <iframe
            :src="getEmbedUrl(video.src)"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </template>
  
<script>
    export default {
        name: 'VideoPreview',
        props: {
            title: {
                type: String,
                required: true
            },
            videoSrc: {
                type: String,
                required: true
            },
            relatedVideos: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                thumbnail: '',
                showVideoList: false
            };
        },
        created() {
            this.fetchThumbnail(this.videoSrc);
        },
        methods: {
            getEmbedUrl(src) {
                const videoId = src.split('/').pop();
                return `https://player.vimeo.com/video/${videoId}`;
            },
            async fetchThumbnail(videoUrl) {
                const videoId = videoUrl.split('/').pop();
                const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
                const data = await response.json();
                this.thumbnail = data[0].thumbnail_large;
            },
            playVideo() {
                this.$emit('play-video', this.videoSrc);
            },
            toggleVideoList() {
                this.showVideoList = !this.showVideoList;
            }
        }
    };
</script>

  
  <style scoped>
  h1 {
    font-size: 34px;
  }

  .video-preview {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  
  .overlay {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    padding: 20px;
  }
  
  .video-list {
    display: flex;
    margin-top: 20px;
  }
  
  .video-item {
    width: 300px;
    margin: 10px;
    background-color: black;
  }
  
  iframe {
    width: 100%;
    height: 200px;
    border: none;
  }


  .custom-button {
    margin: 10px 0;
    padding: 12px 24px;
    background-color: #0000001b;
    border: 2px solid #f4f4f4ac;
    color: #f4f4f4ac;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 15px;
    transition: all 0.3s ease;
    width: 200px;
    display: flex;
    text-align: center;
    text-transform: uppercase;
  }
  
  .custom-button .icon {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
  
  .custom-button:hover {
    color: #ffffff;
    transform: scale(1.05);
    border: 2px solid #ffffff;
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
  
  .custom-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
  }
  </style>
