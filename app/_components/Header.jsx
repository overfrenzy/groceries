"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import GlobalApi from "@/utils/GlobalApi";
import Link from "next/link";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GlobalApi.getCategories()
      .then((resp) => {
        setCategoryList(resp);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-5 shadow-md flex justify-between">
      <div className="flex items-center gap-8">
        <Image src="/logo.png" alt="logo" width={50} height={50} />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <h2
              className="hidden md:flex gap-2 items-center
            border rounded-full p-2 px-10 bg-slate-200 cursor-pointer
        "
            >
              <LayoutGrid className="h-5 w-5" />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {loading ? (
              <DropdownMenuItem>Loading categories...</DropdownMenuItem>
            ) : categoryList.length > 0 ? (
              categoryList.map((category) => (
                <Link href={"/products-category/" + category.name}>
                  <DropdownMenuItem
                    key={category.id}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${category.icon}`}
                      alt="icon"
                      width={25}
                      height={25}
                      className="object-contain"
                    />
                    <h2>{category.name}</h2>
                  </DropdownMenuItem>
                </Link>
              ))
            ) : (
              <DropdownMenuItem>No categories available</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBag /> 0
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
}

export default Header;
