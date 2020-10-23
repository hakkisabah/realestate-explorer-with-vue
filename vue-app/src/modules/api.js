import axios from "axios"
const api = (to,token,payload)=>{
        return axios.post('http://localhost:8181/' + to.name,
            payload,{
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res=>{
                console.log(res)
            if (!res.data.error && res.data){
                return res
            }else{
                return res
            }
        })
}
export default api