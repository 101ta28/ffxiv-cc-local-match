// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/match-create',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'CreateMatch',
        component: () => import('@/views/CreateMatch.vue'),
      },
    ],
  },
  {
    path: '/match/:id',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Match',
        component: () => import('@/views/Match.vue'),
      },
    ],
  },
  {
    path: '/match',
    redirect: '/',
  },
  // 404のページ
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
