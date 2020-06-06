import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from '../views/recommend.vue'
import rank from '../views/rank.vue'
import singer from '../views/singer.vue'
import user from '../views/user.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/recommend',
    name: 'Recommend',
    component: recommend
  },
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/rank',
    component: rank
  },
  {
    path: '/singer',
    component: singer
  },
  {
    path: '/user',
    component: user
  }
]

const router = new VueRouter({
  routes
})

export default router
