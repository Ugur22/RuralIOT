import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/Home'
import about from '@/pages/About'
import water from '@/pages/Water'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import firebase from "firebase";

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/about',
      name: 'about',
      component: about,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/water',
      name: 'water',
      component: water,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router
