import axios from "axios";
const http = axios.create({
    baseURL:'https://bigevent-production.up.railway.app',
    // baseURL:'http://localhost:8080/',
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