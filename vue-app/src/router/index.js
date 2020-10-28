import Vue from 'vue'
import VueRouter from 'vue-router'
import userarea from "../components/Containers/userarea";
import Auth from "../components/Auth";
import checkemployee from "../components/Containers/auth/checkemployee";
import appointments from "../components/Containers/appointments";
import employeeprocess from "../components/Containers/admin/employeeprocess";
import Error from "../views/Error";

Vue.use(VueRouter)


const routes = [
  {
    path: '/userarea',
    name:'userarea',
    component: userarea,
  },
  {
    path: '/auth',
    name:'Auth',
    component: Auth
  },
  {
    path: '/checkemployee/:id',
    name:'checkemployee',
    component: checkemployee
  },
  {
    // appointments not describe to server side and getting error this
    path: '/appointments',
    name:'appointments',
    component: appointments
  },
  {
    path: '/employeeprocess',
    name:'employeeprocess',
    component: employeeprocess
  },
  {
    path: '/error',
    name:'Error',
    component: Error
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
