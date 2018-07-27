import Vue from 'vue'
import Router from 'vue-router'
import errorShow from '@/components/errorShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'errorShow',
      component: errorShow
    }
  ]
})
