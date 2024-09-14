import React from "react";
import ProductItem from "./ProductItem";

// Shuffle array to make it random
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function ProductList({ productList, categoryList }) {
  // after shuffling take only 8
  const limitedProductList = shuffleArray(productList).slice(0, 8);

  return (
    <div className="mt-10">
      <h2 className="text-green-600 font-bold text-2xl">Our Popular Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {limitedProductList.map((product, index) => (
          <ProductItem key={product.id} product={product} categories={categoryList} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
