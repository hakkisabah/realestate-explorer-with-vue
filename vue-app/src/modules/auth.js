import api from "./api";

export const auth = {
    initAuth(VuexContext) {
        let token = localStorage.getItem('token')
        if (token) {
            VuexContext.commit('setToken', token)
            return true
        } else {
            return false
        }
    },
    authChecker(VuexContext, to) {
        return api(to, VuexContext.state.token, {})
    },
    login(VuexContext, authData) {
        let to = {name: 'login'}
        return api(to, VuexContext.state.token,
            {
                userName: authData.userName,
                pass: authData.pass,
            }).then(res => {
            if (res.data.result && res.data.result !== false) {
                VuexContext.commit('setToken', res.data.result)
                localStorage.setItem('token', res.data.result)
                return true
            } else {
                return false
            }
        }).catch(() => {
            alert('Unknow error for login')
        })
    },
    logout(VuexContext) {
        VuexContext.commit('clearToken')
    },
    checkemployee(VuexContext, payload) {
        let to = {name: 'checkemployee'}
        return api(to, {}, payload)

    },
    register(VuexContext, payload) {
        let to = payload.userName ? {name: 'register'} : {name: 'checkemployeer'}
        console.log(to)
        // return api()
    },
}