import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout';

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '综合能耗', icon: 'shebeinenghaoguanli' },
      },
    ],
  },
];

export const asyncRoutes = [
  {
    path: '/comElectricityCharge',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'ComElectricityCharge',
        component: () => import('@/views/comElectricityCharge/index'),
        meta: { title: '综合电费', icon: 'dianfeidan', roles: ['admin'] },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes,
});

export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes,
  });
  router.matcher = newRouter.matcher; // reset router
}

export default router;
