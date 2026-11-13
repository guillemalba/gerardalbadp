import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import ProjectView from './views/ProjectView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/work/:id', name: 'Project', component: ProjectView, props: true },
  // Old links keep working
  { path: '/bio', redirect: { name: 'Home', hash: '#about' } },
  { path: '/video', redirect: to => ({ name: 'Project', params: { id: String(to.query.videoSrc || '').split('/').pop() } }) },
  { path: '/video-detail/:sectionTitle/:id', redirect: to => ({ name: 'Project', params: { id: to.params.id } }) },
  { path: '/:pathMatch(.*)*', redirect: { name: 'Home' } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Wait for the route transition (out-in) before restoring/jumping
    return new Promise(resolve => {
      setTimeout(() => {
        if (savedPosition) resolve(savedPosition);
        else if (to.hash) resolve({ el: to.hash, top: 0 });
        else resolve({ top: 0 });
      }, 320);
    });
  },
});

export default router;
