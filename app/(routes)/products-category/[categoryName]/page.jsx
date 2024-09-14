import GlobalApi from "@/utils/GlobalApi";
import React from "react";
import TopCategoryList from "./_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

async function ProductCategory({ params }) {
  const categoryName = params.categoryName || params.CategoryName;

  if (!categoryName) {
    console.error("Category name is missing from params");
    return null;
  }

  const productList = await GlobalApi.getProductsByCategory(categoryName);
  const categoryList = await GlobalApi.getCategories();

  return (
    <div>
      <h2 className="p-4 bg-green-600 text-white font-bold text-3xl text-center">
        {categoryName}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={categoryName}
      />
      <div className="p-5 md:p-10">
        <ProductList productList={productList} categoryList={categoryList} />
      </div>
    </div>
  );
}

export default ProductCategory;
