import axios from "axios"

const api = (to, token, payload) => {
    return axios.post('http://' + process.env.VUE_APP_BASE_URL + '/' + to.name,
        payload, {
            headers: {
                'authorization': 'Bearer ' + token
            }
        }).then(res => {
        return res
    })
}
export default api