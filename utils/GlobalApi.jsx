const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  withCredentials: true,
});

const fetchData = async (endpoint) => {
  try {
    const response = await axiosClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}`, error);
    throw error;
  }
};

// Filter products by category name
const getProductsByCategory = async (categoryName) => {
  try {
    if (!categoryName) {
      throw new Error("Category name is required");
    }

    const categories = await fetchData("/categories");

    // Find the category by name
    const category = categories.find(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (!category) {
      throw new Error("Category not found");
    }

    // Fetch products by category_id
    const products = await fetchData(`/products?category_id=${category.id}`);
    return products;
  } catch (error) {
    console.error("Error fetching products by category", error);
    return [];
  }
};

const login = async (email, password) => {
  try {
    const response = await axiosClient.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

const register = async (username, email, password) => {
  try {
    const response = await axiosClient.post("/register", {
      name: username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Registration failed", error.response.data);
    } else {
      console.error("Error", error.message);
    }
    throw error;
  }
};

// Get authenticated user's data
const getUser = async () => {
  try {
    const response = await axiosClient.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  }
};

export default {
  login,
  register,
  getUser,
  getCategories: () => fetchData("/categories"),
  getSliders: () => fetchData("/sliders"),
  getProducts: () => fetchData("/products"),
  getProductsByCategory,
};
