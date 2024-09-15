<template>
    <div class="bio-page">
      <LeftSidebar />
      <div class="content-container">
        <div class="content">
          <h1>About Me</h1>
          <p>
            Gerard Alba is a Director of Photography. He was born in Granollers, Barcelona, Spain. Since a young age, he was engaged with filmmaking world. He studied filmmaking and specialized on Cinematography at the New York Film Academy, Los Angeles, California. Since graduating in 2016, he has been working on a variety of projects, including films, music videos and commercials. Gerard's filmmaking skills include directing, camera operator, steadycam, AC, gaffer, editing and graphic animation. He also has recently worked in NARCOS season 3 on the camera department. Gerard is always enthusiastic and energetic on the set, and always excited about upcoming projects in all facets of filmmaking. Gerard has also participated as cameraman, director of photography or assistant in several shorts like Film School Musical, Vanguards & Visionaires, Mia, Camila that have been awarded at international festivals.
          </p>
          <button @click="downloadCV">Download CV</button>
        </div>
      </div>
      <RightSidebar />
    </div>
  </template>
  
  <script>
  import LeftSidebar from './LeftSidebar.vue';
  import RightSidebar from './RightSidebar.vue';
  
  export default {
    name: 'BioPage',
    components: {
      LeftSidebar,
      RightSidebar
    },
    methods: {
      downloadCV() {
        const link = document.createElement('a');
        link.href = '/Gerard_Alba_CV.pdf'; // Ruta relativa desde la carpeta public
        link.download = 'Gerard_Alba_CV.pdf';
        link.click();
      }
    }
  };
  </script>
  
  <style scoped>
  .bio-page {
    position: relative;
    display: flex;
    background-color: rgb(0, 0, 0);
    color: white;
    height: 100vh;
    background-image: url('@/assets/images/bio_profile.jpeg');
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }
  
  .content-container {
    margin: auto;
    padding: 40px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
    max-width: 800px;
    text-align: center;
    backdrop-filter: blur(10px);
  }
  
  .content {
    padding: 20px;
  }
  
  h1 {
    margin-bottom: 20px;
    font-size: 2.5em;
    font-weight: bold;
    font-family: 'Arial', sans-serif;
  }
  
  p {
    margin-bottom: 20px;
    font-size: 1.2em;
    line-height: 1.6;
    font-family: 'Arial', sans-serif;
  }
  
  button {
    padding: 15px 30px;
    background-color: #ff6b6b;
    color: #ffffff;
    border: none;
    border-radius: 50px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #ff3b3b;
  }
  </style>
  