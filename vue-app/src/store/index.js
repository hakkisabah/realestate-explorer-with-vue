import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import api from "../modules/api"

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
            state.userInfo = userInfo
        },
        clearToken(state){
            localStorage.removeItem('token')
          state.token = ""
        }
    },
    actions: {
        initAuth(VuexContext){
            let token = localStorage.getItem('token')
            if (token){
                VuexContext.commit('setToken',token)
                return true
            }else{
                return false
            }

        },
        login(VuexContext, authData) {
            return axios.post('http://localhost:8181/login',
                {
                    userName: authData.userName,
                    pass: authData.pass,
                }, {
                    headers: {
                        'Authorization': 'Baerer ' + VuexContext.state.token
                    }
                }).then(res => {
                if (res.data.result) {
                    VuexContext.commit('setToken', res.data.result)
                    localStorage.setItem('token',res.data.result)
                    return true
                }else{
                    return false
                }
            }).catch(()=>{
                alert('Unknow error for login')
            })
        },
        api(VuexContext, to, payload) {
            return api(to, VuexContext.state.token, payload)
        },
        setUserInfo(VuexContext,userInfo){
            VuexContext.commit('setUserInfo',userInfo)
        },

        logout(VuexContext){
            VuexContext.commit('clearToken')
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== ''
        },
        getUserInfo(state){
            return state.userInfo
        }
    },
    modules: {
        api
    }
})
