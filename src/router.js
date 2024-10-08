import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import BioPage from './components/BioPage.vue';
import MobileVideoDetail from './components/MobileVideoDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
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
  history: createWebHashHistory(),
  routes,
});

export default router;
