const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

const fetchData = (endpoint) => axiosClient.get(endpoint).then(resp => resp.data);

export default {
  getCategories: () => fetchData('/categories'),
  getSliders: () => fetchData('/sliders'),
  getProducts: () => fetchData('/products'),
  getProductById: (id) => fetchData(`/products/${id}`),
};