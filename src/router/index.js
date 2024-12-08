import {createRouter, createWebHistory} from 'vue-router'
import CompositionAPI from '../views/CompositionAPI.vue'
import OptionAPI from '../views/OptionAPI.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      redirect: "/option",
    },
    {
      path: '/composition',
      name: 'composition',
      component: CompositionAPI,
    },
    {
      path: '/option',
      name: 'option',
      component: OptionAPI,
    },
  ],
})

export default router
