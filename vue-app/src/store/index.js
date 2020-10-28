import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from "../modules/auth";
import {requests} from "../modules/requests";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        userInfo: {},
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUserInfo(state, userInfo) {
            localStorage.setItem('userInfo',JSON.stringify(userInfo))
            state.userInfo = userInfo
        },
        clearToken(state) {
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            state.token = ""
        }
    },
    actions: {
        // auth module in actions..
        ...auth,
        ...requests,
        autoLogout(Vuexcontext){
            alert("Your session has been expired, you will redirect for authorization")
            Vuexcontext.dispatch('logout')
        },
        setUserInfo(VuexContext, userInfo) {
            VuexContext.commit('setUserInfo', userInfo)
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== ''
        },

        getUserInfo(state) {
            return state.userInfo ?? localStorage.getItem('userInfo')
        }
    },
    modules: {}
})
