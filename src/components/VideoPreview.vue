<template>
  <section class="video-preview" :style="{ backgroundImage: `url(${customThumbnail || thumbnail})` }">
    <div class="shade"></div>

    <div class="overlay">
      <p class="count label">{{ number }}<span v-if="number"> / 04</span></p>
      <h2 class="title">{{ title }}</h2>
      <CButton icon="play" :onClick="playVideo" :label="'Play ' + title" />
    </div>

    <div class="bottom">
      <button @click="toggleVideoList" class="toggle label" :aria-expanded="showVideoList">
        <span>{{ showVideoList ? 'Show less' : 'Show more' }}</span>
        <svg class="chev" :class="{ flip: showVideoList }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>

      <transition name="slide-fade">
        <div v-if="showVideoList" class="strip">
          <button class="btn-round arrow" :class="{ invisible: !canScrollLeft }" aria-label="Previous" @click="scrollLeft">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <div class="video-list" ref="videoList" @scroll="checkScroll">
            <button
              v-for="video in relatedVideos"
              :key="video.id"
              class="video-item"
              :style="{ backgroundImage: `url(${video.thumbnail})` }"
              @click="handlePlayRelatedVideo(video.src)"
            >
              <span class="item-info">
                <span class="item-title">{{ video.title }}</span>
                <span class="item-time label">{{ video.duration }}</span>
              </span>
            </button>
          </div>

          <button class="btn-round arrow" :class="{ invisible: !canScrollRight }" aria-label="Next" @click="scrollRight">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import CButton from './CButton.vue';

export default {
  name: 'VideoPreview',
  components: {
    CButton
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
    },
    type: {
      type: String,
      required: true
    },
    number: {
      type: String,
      default: ''
    },
    customThumbnail: {
      type: String,
      default: '' // Permite que no sea obligatorio
    }
  },
  emits: ['play-video'],
  data() {
    return {
      thumbnail: '',
      showVideoList: false,
      canScrollLeft: false,
      canScrollRight: false
    };
  },
  created() {
    this.fetchThumbnail(this.videoSrc);
    this.fetchThumbnailsForRelatedVideos();
  },
  mounted() {
    this.$nextTick(this.checkScroll); // Comprobar el estado inicial del scroll
    window.addEventListener('resize', this.checkScroll); // Detectar cambios en el tamaño de la ventana
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScroll); // Eliminar el listener al desmontar
  },
  methods: {
    async fetchThumbnail(videoUrl) {
      const videoId = videoUrl.split('/').pop();
      const response = await fetch(`https://vimeo.com/api/v2/video/${videoId}.json`);
      const data = await response.json();
      this.thumbnail = data[0].thumbnail_large;
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
    },
    playVideo() {
      this.$emit('play-video', this.videoSrc, this.type);
    },
    toggleVideoList() {
      this.showVideoList = !this.showVideoList;
      this.$nextTick(this.checkScroll); // Verificar el scroll después de cambiar la lista
    },
    scrollLeft() {
      const container = this.$refs.videoList;
      if (container) {
        container.scrollBy({ left: -300, behavior: 'smooth' });
        this.$nextTick(this.checkScroll); // Verificar después de mover
      }
    },
    scrollRight() {
      const container = this.$refs.videoList;
      if (container) {
        container.scrollBy({ left: 300, behavior: 'smooth' });
        this.$nextTick(this.checkScroll); // Verificar después de mover
      }
    },
    checkScroll() {
      const container = this.$refs.videoList;
      if (container) {
        // Verificar si se puede hacer scroll a la izquierda o derecha
        this.canScrollLeft = container.scrollLeft > 0;
        this.canScrollRight = container.scrollWidth > container.clientWidth + container.scrollLeft;
      }
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    handlePlayRelatedVideo(src) {
      this.$emit('play-video', src, this.type);
    }
  }
};
</script>

<style scoped>
.video-preview {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
  min-height: 600px;
  background-color: #000;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.shade {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%),
    linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0) 40%);
  pointer-events: none;
}

.overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  text-align: center;
  padding: 0 calc(var(--rail) + var(--gutter));
}

.count { color: var(--ink-dim); margin: 0; }

.title {
  font-size: clamp(40px, 6.5vw, 104px);
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

/* bottom dock: toggle on top of the strip, both centred */
.bottom {
  position: absolute;
  left: calc(var(--rail) + var(--gutter));
  right: calc(var(--rail) + var(--gutter));
  bottom: 28px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: var(--tap);
  padding: 0 16px;
  background: none;
  border: none;
  color: var(--ink);
  cursor: pointer;
  transition: color var(--t);
}
.chev { width: 18px; height: 18px; transition: transform 0.35s var(--ease); }
.chev.flip { transform: rotate(180deg); }

.strip {
  display: flex;
  align-items: center;
  gap: 14px;
  max-width: 100%;
}

.video-list {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-width: calc(4 * 280px + 3 * 10px);
}
.video-list::-webkit-scrollbar { display: none; }

.video-item {
  position: relative;
  flex: 0 0 280px;
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
  transition: transform var(--t) var(--ease), outline-color var(--t);
  outline: 1px solid transparent;
  outline-offset: -1px;
}
.item-info {
  width: 100%;
  padding: 24px 12px 10px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  color: var(--ink);
  background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0));
}
.item-title {
  font-family: var(--font-text);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-time { font-size: 11px; letter-spacing: 0.16em; color: var(--ink-dim); flex: none; }

.arrow svg { width: 20px; height: 20px; }
.invisible { visibility: hidden; pointer-events: none; }

.slide-fade-enter-active, .slide-fade-leave-active { transition: opacity 0.35s var(--ease), transform 0.35s var(--ease); }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateY(16px); }

@media (hover: hover) {
  .toggle:hover { color: var(--accent); }
  .video-item:hover { transform: translateY(-2px); outline-color: var(--accent); }
}

@media (max-width: 1500px) { .video-list { max-width: calc(3 * 280px + 2 * 10px); } }
@media (max-width: 1250px) { .video-list { max-width: calc(2 * 280px + 10px); } }
@media (max-width: 1000px) {
  .video-preview { min-height: 0; }
  .overlay, .bottom { padding-left: 0; padding-right: 0; left: var(--gutter); right: var(--gutter); }
}
</style>
