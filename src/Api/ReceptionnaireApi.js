import axios from 'axios'

const instance = axios.create({
    baseURL:"http://localhost:1010/receptionnaire/",
})

export default instance;