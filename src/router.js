import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import VideoPlayer from './components/VideoPlayer.vue';
import BioPage from './components/BioPage.vue';
import MobileVideoDetail from './components/MobileVideoDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/video',
    name: 'VideoPlayer',
    component: VideoPlayer,
    props: route => ({ videoSrc: route.query.videoSrc })
  },
  {
    path: '/bio',
    name: 'Bio',
    component: BioPage
  },
  {
    path: '/video-detail/:sectionTitle/:id', // Usamos tanto sectionTitle como id en la URL
    name: 'MobileVideoDetail',
    component: MobileVideoDetail,
    props: route => ({
      videoId: route.params.id,
      sectionTitle: route.params.sectionTitle // Ahora pasamos el sectionTitle como parámetro de la ruta
    })
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
