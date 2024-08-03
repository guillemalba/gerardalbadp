import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import VideoPlayer from './components/VideoPlayer.vue'; // Importa el nuevo componente

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/video-player', // Nueva ruta
    name: 'VideoPlayer',
    component: VideoPlayer,
    props: route => ({ videoSrc: route.query.videoSrc }) // Pasar videoSrc como prop
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
