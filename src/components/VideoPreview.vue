<template>
    <div class="video-preview" :style="{ backgroundImage: `url(${thumbnail})` }">
      <div class="overlay">
        <h1>{{ title }}</h1>
        <button @click="playVideo">Reproducir Video</button>
        <button @click="toggleVideoList">Todos los videos</button>
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
  
  button {
    margin: 10px 0;
    padding: 10px 20px;
    background-color: white;
    border: none;
    cursor: pointer;
    width: 200px;
    display: block;
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
  </style>
  