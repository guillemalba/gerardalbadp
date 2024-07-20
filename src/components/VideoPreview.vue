<template>
    <div class="video-preview" :style="{ backgroundImage: `url(${thumbnail})` }">
      <div class="overlay">
        <h1>{{ title }}</h1>
        <CustomButton @click="playVideo">Reproducir</CustomButton>
        <CustomButton @click="toggleVideoList">Mas videos</CustomButton>
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
    import CustomButton from './CustomButton.vue';

    export default {
    name: 'VideoPreview',
    components: {
        CustomButton
    },
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
  </style>
  