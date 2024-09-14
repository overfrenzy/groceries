const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

const fetchData = (endpoint) =>
  axiosClient.get(endpoint).then((resp) => resp.data);

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
    console.error(error);
    return [];
  }
};

export default {
  getCategories: () => fetchData("/categories"),
  getSliders: () => fetchData("/sliders"),
  getProducts: () => fetchData("/products"),
  getProductsByCategory,
};
