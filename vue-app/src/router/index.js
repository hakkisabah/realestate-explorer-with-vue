import Vue from 'vue'
import VueRouter from 'vue-router'
import userarea from "../components/Containers/userarea";
import Auth from "../components/Auth";
import appointments from "../components/Containers/appointments";
import Error from "../views/Error";

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name:'userarea',
    component: userarea,
  },
  {
    path: '/auth',
    name:'Auth',
    component: Auth
  },
  {
    // appointments not describe to server side and getting error this
    path: '/appointments',
    name:'appointments',
    component: appointments
  },
  {
    path: '/error',
    name:'Error',
    component: Error
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
