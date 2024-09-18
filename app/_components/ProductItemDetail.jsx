"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GlobalApi from "@/utils/GlobalApi";

function ProductItemDetail({ product, categories = [] }) {
  const { isAuthenticated, user } = useContext(AuthContext);
  const router = useRouter();
  const productPrice = product.selling_price || product.mrp;
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading]=useState(false)
  const totalPrice = quantity * productPrice;

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    setLoading(true)
    if (!isAuthenticated) {
      router.push("/sign-in");
      setLoading(false)
      return;
    }

    try {
      const data = {
        quantity: quantity,
        amount: totalPrice,
        product_id: product.id,
        user_id: user.id,
      };
      await GlobalApi.addToCart(data);
      toast("Added to cart");
      setLoading(false)
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast("Failed to add to cart");
      setLoading(false)
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.image}`}
        alt="product image"
        width={300}
        height={300}
        className="bg-slate-200 p-5 h-[320px] w-[300px] object-contain rounded-lg"
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <h2 className="text-sm text-gray-500">{product.description}</h2>

        <div className="flex gap-3">
          {product.selling_price && (
            <h2 className="text-red-500 text-3xl font-bold">
              {product.selling_price} ₽
            </h2>
          )}
          <h2
            className={`font-bold text-3xl ${
              product.selling_price ? "line-through text-gray-500" : ""
            }`}
          >
            {product.mrp} ₽
          </h2>
        </div>

        <h2 className="font-medium text-lg">
          Quantity ({product.itemQuantityType})
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex gap-3 items-center">
            <div className="p-2 border flex gap-5 items-center px-5">
              <button
                disabled={quantity === 1}
                onClick={handleDecrease}
                className="bg-gray-200 hover:bg-gray-300 text-lg text-black font-bold w-12 h-12 rounded-full flex items-center justify-center disabled:bg-gray-300 disabled:text-gray-500"
              >
                -
              </button>
              <h2 className="text-xl font-bold">{quantity}</h2>
              <button
                onClick={handleIncrease}
                className="bg-gray-200 hover:bg-gray-300 text-lg text-black font-bold w-12 h-12 rounded-full flex items-center justify-center"
              >
                +
              </button>
            </div>
            <h2 className="text-2xl font-bold">= {totalPrice} ₽</h2>
          </div>

          <Button className="flex gap-3" onClick={addToCart} disabled={loading}>
            <ShoppingBasket />
            {loading?<LoaderCircle className="animate-spin"/>:"Add to cart"}
          </Button>
        </div>

        <h2>
          <span className="font-bold">Category: </span>
          {getCategoryName(product.category_id)}
        </h2>
      </div>
    </div>
  );
}

export default ProductItemDetail;
