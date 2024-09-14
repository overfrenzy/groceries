"use client";
import React, { useState, useEffect, useRef } from "react";
import ProductItem from "./ProductItem";

function ProductList({ productList, categoryList }) {
  const [visibleProducts, setVisibleProducts] = useState([]); // Visible products state
  const loadMoreRef = useRef(null); // Ref to trigger loading more products

  // Load more products as the user scrolls
  const loadMore = () => {
    setVisibleProducts((prev) => [
      ...prev,
      ...productList.slice(prev.length, prev.length + 4), // Load 4 more products at a time
    ]);
  };

  // Setup IntersectionObserver to trigger loading more products
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 } // Trigger when the loadMoreRef element is fully visible
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [productList]);

  // Initialize the visible products with 8 items
  useEffect(() => {
    setVisibleProducts(productList.slice(0, 8));
  }, [productList]);

  return (
    <div className="mt-10">
      <h2 className="text-green-600 font-bold text-2xl">
        Our Popular Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {visibleProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            categories={categoryList}
          />
        ))}
      </div>
      <div ref={loadMoreRef} className="h-10"></div>{" "}
      {/* Empty div to trigger lazy loading */}
    </div>
  );
}

export default ProductList;
