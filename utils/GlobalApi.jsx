import axios from "axios";

const isServer = typeof window === "undefined";

const axiosClient = axios.create({
  baseURL: isServer ? process.env.NEXT_PUBLIC_BACKEND_API_URL : "/api",
  withCredentials: true,
});

// Fetcher for all GET requests
const fetchData = async (endpoint) => {
  try {
    const response = await axiosClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}`, error);
    throw error;
  }
};

// Auth actions
const login = (email, password, remember) =>
  axiosClient.post("/login", { email, password, remember }).then((res) => res.data);

const logout = () => axiosClient.post("/logout").then((res) => res.data);

const register = (username, email, password) =>
  axiosClient.post("/register", { name: username, email, password }).then((res) => res.data);

// Cart actions
const addToCart = (data) => axiosClient.post("/cart", data).then((res) => res.data);

const deleteCartItem = (id) => axiosClient.delete(`/cart/${id}`).then((res) => res.data);

// Filter products by category
const getProductsByCategory = async (categoryName) => {
  if (!categoryName) throw new Error("Category name is required");

  const categories = await fetchData("/categories");
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
  );

  if (!category) throw new Error("Category not found");

  return fetchData(`/products?category_id=${category.id}`);
};

// Exports
export default {
  login,
  logout,
  register,
  getUser: () => fetchData("/user"),
  getCategories: () => fetchData("/categories"),
  getSliders: () => fetchData("/sliders"),
  getProducts: () => fetchData("/products"),
  getProductsByCategory,
  getCartItems: (userId) => fetchData(`/cart?user_id=${userId}`),
  addToCart,
  deleteCartItem,
};
