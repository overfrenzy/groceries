import axios from "axios";

const isServer = typeof window === "undefined";

const axiosClient = axios.create({
  baseURL: isServer
    ? process.env.NEXT_PUBLIC_BACKEND_API_URL // Absolute URL for server-side
    : "/api", // Relative URL for client-side (browser)
  withCredentials: true, // Important: Sends the HttpOnly cookies automatically
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

const login = async (email, password, remember) => {
  try {
    const response = await axiosClient.post("/login", {
      email,
      password,
      remember,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

const logout = async () => {
  try {
    const response = await axiosClient.post("/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed", error);
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
    console.error(
      "Error fetching user data",
      error.response ? error.response : error
    );
    return null;
  }
};

const addToCart = async (data) => {
  try {
    const response = await axiosClient.post("/cart", data);
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart", error);
    throw error;
  }
};

export default {
  login,
  logout,
  register,
  getUser,
  getCategories: () => fetchData("/categories"),
  getSliders: () => fetchData("/sliders"),
  getProducts: () => fetchData("/products"),
  getProductsByCategory,
  addToCart,
};
