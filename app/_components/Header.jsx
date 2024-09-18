"use client";
import React, { useState, useEffect, useContext } from "react";
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
import { CircleUserRound, LayoutGrid, Search, ShoppingBasket } from "lucide-react";
import GlobalApi from "@/utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user, setIsAuthenticated } = useContext(AuthContext); // Use auth context
  const [totalCartItem, setTotalCartItem] = useState(0)
  const router = useRouter();

  useEffect(() => {
    // Fetch categories
    GlobalApi.getCategories()
      .then((resp) => {
        setCategoryList(resp);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [isAuthenticated]);

  const getCartItems=()=>{
    //cart items overwrite themselves, getCartItems
  }

  const handleLogout = async () => {
    try {
      await GlobalApi.logout();
      setIsAuthenticated(false);
      router.push("/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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
                <Link
                  href={`/products-category/${category.name}`}
                  key={category.id}
                >
                  <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
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
          <ShoppingBasket className="h-7 w-7"/> 
          <span className="bg-primary text-white px-2 rounded-full">{totalCartItem}</span></h2>
        {!isAuthenticated ? (
          <Link href="/sign-in">
            <Button>Login</Button>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <span>Welcome, {user?.name}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CircleUserRound className="h-12 w-12 bg-green-100 text-green-600 p-2 rounded-full cursor-pointer"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Orders</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
