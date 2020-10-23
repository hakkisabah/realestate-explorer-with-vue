import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
// Every request we check own rules
router.beforeEach((to, from, next) => {
    // If route to out of Auth page and user non authenticate , we check this
    if (to.name !== 'Auth' && !store.getters.isAuthenticated) {
        store.dispatch('api', to, {}).then(result => {
            if (result.data.length > 0 && !result.data.error) {
                next()
            } else {
                next({name: 'Auth'})
            }
        })
    } else {
        // or is auth ok but checking other page
        if (store.getters.isAuthenticated){
            // if current route or next route seeming when stop this any action,
            // router.currentRoute.path condition describe for
            // any error
            if (router.currentRoute.path ==='Auth' || to.name === 'Auth'){
                next(false)
            }else{
                store.dispatch('api', to, {})
                    .then(response=>{
                        if (!response.data.error){
                            store.dispatch('setUserInfo',response.data.result.data)
                        }else{
                            store.dispatch('logout')
                            next('/auth')
                        }
                    }).catch(()=>{
                       next('/error')
                })
                next()
            }

        }else{
            next()
        }
    }
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
