import { createRouter, createWebHistory } from 'vue-router';
import VictimReportView from '../views/VictimReportView.vue';
import RescueMapView from '../views/RescueMapView.vue';
import HotlineView from '../views/HotlineView.vue';

const routes = [
  { path: '/', redirect: '/report' },
  { path: '/report', component: VictimReportView },
  { path: '/rescue', component: RescueMapView },
  { path: '/hotline', component: HotlineView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
