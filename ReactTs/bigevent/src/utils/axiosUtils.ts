import axios from "axios";
const http = axios.create({
    baseURL:'http://bigevent-production.up.railway.app/',
    timeout:5000
})

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if(token){
            config.headers = config.headers || {}
            config.headers.Authorization = `Bearer ${token}`
        }
        
        return config
    }
)

export default http