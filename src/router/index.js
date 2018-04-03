import Vue from 'vue'
import Router from 'vue-router'
import Lerneinheit from '@/components/Lerneinheit'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/lerneinheit/:id',
        name: 'Lerneinheit',
        component: Lerneinheit
    }
  ]
})
