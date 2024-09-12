const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

const getCategory = () => axiosClient.get("/categories");

const getSliders = () =>
  axiosClient.get("/sliders").then((resp) => {
    return resp.data;
  });

export default {
  getCategory,
  getSliders,
};
