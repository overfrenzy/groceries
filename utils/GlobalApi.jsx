const {default: axios} = require("axios");

const axiosClient=axios.create({
    baseURL:''
})

const getCategory=()=>axiosClient.get('/categories');

export default{
    getCategory
}