import api from "./api";
import router from "../router";
export const requests = {
    postCodeChecker(VuexContext, payload) {
        let to = {name: 'postcode'}
        return api(to, VuexContext.state.token, {userPostCode: payload})
    },
    async updateUser(VuexContext,payload){
        let to = {name: 'updateuser'}
        let updateResult = await api(to, VuexContext.state.token, payload)
        if (updateResult.data.token === false){
            VuexContext.dispatch('autoLogout')
            router.push('/auth')
        }
        if (updateResult.data.result.isUpdate){
            console.log(updateResult.data.result)
            VuexContext.commit('setUserInfo',updateResult.data.result.isUpdate)
            VuexContext.commit('setToken',updateResult.data.result.updatedToken.result)
            alert('Update Successful')
            return updateResult.data.result.isUpdate
        }else{
            alert('Update Error')
        }
    },
    async createEmployeeId(VuexContext,payload){
        let to = {name: 'createemployeeid'}
        let createResult = await api(to, VuexContext.state.token, payload)
        if (createResult.data.token === false){
            VuexContext.dispatch('autoLogout')
            router.push('/auth')
        }
        if (createResult.data.result !== false){
            alert(createResult.data.success)
            alert(createResult.data.result.userMail +'\'s mail employeer '+'id = > ' + createResult.data.result.employeeId)
        }else{
            alert('Employeer Id Create Error')
            alert('Reason : ' + createResult.data.error)
        }
    }
}
