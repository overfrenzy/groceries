import React from "react";
import Image from "next/image";
import Link from "next/link";

function CategoryList({ categoryList }) {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">Shop by Category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-2">
        {categoryList.map((category) => (
          <Link
            href={`/products-category/${category.name}`}
            key={category.id}
            className="flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-600"
          >
            <div className="w-20 h-20 flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.icon}`}
                alt="icon"
                width={50}
                height={50}
                className="group-hover:scale-125 transition-all ease-in-out object-contain"
              />
            </div>
            <h2 className="text-green-800">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
