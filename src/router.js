import { createRouter, createWebHashHistory } from 'vue-router'; // Cambia a hash history
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
    path: '/video-detail/:sectionTitle/:id',
    name: 'MobileVideoDetail',
    component: MobileVideoDetail,
    props: route => ({
      videoId: route.params.id,
      sectionTitle: route.params.sectionTitle
    })
  }
];

const router = createRouter({
  history: createWebHashHistory(), // Usar hash history en lugar de web history
  routes,
});

export default router;
