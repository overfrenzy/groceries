import Image from "next/image";
import Link from "next/link";
import React from "react";
import clsx from "clsx";

function TopCategoryList({ categoryList, selectedCategory }) {
  if (!categoryList || categoryList.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center">
      {categoryList.map((category) => (
        <Link
          href={`/products-category/${category.name}`}
          key={category.id}
          className={clsx(
            "flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-600 w-[150px] min-w-[100px]",
            selectedCategory.toLowerCase() === category.name.toLowerCase() && "bg-green-600 text-white"
          )}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.icon}`}
            alt="icon"
            width={50}
            height={50}
            className="group-hover:scale-125 transition-all ease-in-out object-contain"
          />
          <h2
            className={clsx(
              "text-green-800 group-hover:text-white",
              selectedCategory.toLowerCase() === category.name.toLowerCase() && "text-white"
            )}
          >
            {category.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}

export default TopCategoryList;
