<template>
    <div class="mobile-video-detail">
      <header class="sticky-header">
        <button @click="$router.go(-1)">
            <i class="fas fa-arrow-left"></i>
        </button>
        <h1>{{ formattedSectionTitle }}</h1>
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
  
          <!-- Mostramos la descripción como "créditos" si está disponible -->
          <div class="credits">
            <div v-if="video.description" v-html="formattedCredits"></div>
            <p v-else>No credits available for this video.</p>
          </div>
        </div>
  
        <div v-else>
          <p>Loading video details...</p>
        </div>
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
          console.log(data[0]); // Verificar los datos recibidos desde la API
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
    background-color: black;
    color: white;
    min-height: 100vh;
    padding-top: 60px; /* Para hacer espacio para el header fijo */
  }
  
  .sticky-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: black;
    color: white;
    z-index: 1000;
    display: flex;
    align-items: center;
    padding: 15px;
    gap: 20px; /* Añadir espacio entre el botón de atrás y el título */
  }
  
  h1 {
    margin: 0;
    font-size: 1.5em;
  }
  
  h2 {
    margin: 20px 0;
  }
  
  .content-wrapper {
    padding: 20px;
    text-align: center;
  }
  
  .video-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* Proporción 16:9 */
    height: 0;
    margin-bottom: 20px;
  }
  
  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
  
  .credits {
    margin-top: 20px;
    white-space: pre-line; /* Asegura que se respeten los saltos de línea */
  }
  
  button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5em;
    cursor: pointer;
  }
  
  @media (orientation: landscape) {
    .video-wrapper {
      padding-bottom: 30%; /* Ajuste para landscape */
    }
  }
  </style>
  