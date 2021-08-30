import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export const suffix = " | Timo's CMS";

const router = new VueRouter({
  scrollBehavior(_t, _f, savePosition) {
    return savePosition || { x: 0, y: 0 };
  },

  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/portfolio',
      component: () => import('@/views/portfolio/_interim.vue'),
      children: [
        {
          path: '',
          name: 'portfolio',
          component: () => import('@/views/portfolio/Home.vue'),
          meta: {
            title: 'Portfolio',
          },
        },
        { path: '*', redirect: { name: 'portfolio' } },
      ],
    },
    {
      path: '/newsroom',
      component: () => import('@/views/newsroom/_interim.vue'),
      children: [
        {
          path: '',
          name: 'newsroom',
          component: () => import('@/views/newsroom/Home.vue'),
          meta: {
            title: 'Newsroom',
          },
        },
        { path: '*', redirect: { name: 'newsroom' } },
      ],
    },
    {
      path: '/vuement',
      component: () => import('@/views/vuement/_interim.vue'),
      children: [
        {
          path: '',
          name: 'vuement',
          component: () => import('@/views/vuement/Home.vue'),
          meta: {
            title: 'Vuement',
          },
        },
        {
          path: 'component/register',
          name: 'vuement-register-component',
          component: () => import('@/views/vuement/RegisterComponent.vue'),
          meta: {
            title: 'Vuement - Register Component',
          },
        },
        {
          path: 'component/:id',
          name: 'vuement-edit-component',
          component: () => import('@/views/vuement/EditComponent.vue'),
          meta: {
            title: 'Vuement - Edit Component',
          },
        },
        { path: '*', redirect: { name: 'vuement' } },
      ],
    },
    {
      path: '/vuecons',
      component: () => import('@/views/vuecons/_interim.vue'),
      children: [
        {
          path: '',
          name: 'vuecons',
          component: () => import('@/views/vuecons/Home.vue'),
          meta: {
            title: 'Vuecons',
          },
        },
        { path: '*', redirect: { name: 'vuecons' } },
      ],
    },
    {
      path: '/translator',
      component: () => import('@/views/translator/_interim.vue'),
      children: [
        {
          path: '',
          name: 'translator',
          component: () => import('@/views/translator/Home.vue'),
          meta: {
            title: 'Translator',
          },
        },
        { path: '*', redirect: { name: 'translator' } },
      ],
    },
    { path: '*', redirect: { name: 'home' } },
  ],
});

export default router;
