<template>
  <div class="mobile-video-detail">
    <header class="sticky-header">
      <button class="btn-round" aria-label="Back" @click="$router.go(-1)">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <h1 class="label">{{ formattedSectionTitle }}</h1>
    </header>

    <div class="content-wrapper">
      <div v-if="video">
        <div class="video-wrapper">
          <iframe
            :src="getEmbedUrl(videoId)"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <h2>{{ video.title }}</h2>

        <div class="credits">
          <div v-if="video.description" v-html="formattedCredits"></div>
          <p v-else>No credits available for this video.</p>
        </div>
      </div>

      <p v-else class="loading label">Loading</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      videoId: {
        type: String,
        required: true
      },
      sectionTitle: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        video: null // Almacenará los detalles del video
      };
    },
    computed: {
      formattedSectionTitle() {
        return this.sectionTitle.replace(/-/g, ' '); // Formatear el título de la sección
      },
      formattedCredits() {
        // Convertir los saltos de línea <br /> en HTML para una correcta visualización
        if (this.video && this.video.description) {
          return this.video.description.replace(/<br\s*\/?>/g, '<br>');
        }
        return '';
      }
    },
    created() {
      this.fetchVideoDetails();
      window.scrollTo(0, 0); // Esto asegura que el scroll esté arriba de todo
    },
    methods: {
      async fetchVideoDetails() {
        try {
          const response = await fetch(`https://vimeo.com/api/v2/video/${this.videoId}.json`);
          const data = await response.json();
          this.video = data[0]; // Asignar los detalles del video
        } catch (error) {
          console.error('Error fetching video details:', error);
        }
      },
      getEmbedUrl(id) {
        return `https://player.vimeo.com/video/${id}?autoplay=1`;
      }
    }
  };
  </script>

<style scoped>
.mobile-video-detail {
  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
  padding-top: 72px;
}

.sticky-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 var(--gutter);
  background: rgba(5, 5, 5, 0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
}
.sticky-header h1 { font-size: 12px; margin: 0; text-transform: uppercase; }

.content-wrapper { padding: 8px var(--gutter) 56px; }

.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  background: #0d0d0d;
}
.video-wrapper iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }

h2 { margin: 28px 0 16px; font-size: 28px; line-height: 1.15; }

.credits {
  font-family: var(--font-text);
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink-dim);
  white-space: pre-line;
}
.credits p { margin: 0; }
.loading { color: var(--ink-dim); padding-top: 24px; }

@media (orientation: landscape) and (max-height: 500px) {
  .video-wrapper { padding-bottom: 40%; }
}
</style>
