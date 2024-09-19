import { Button } from "@/components/ui/button";
import { LoaderCircle, TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/utils/GlobalApi";
import { toast } from "sonner";

function CartItemList({ cartItemList = [], onCartUpdate }) {
  const [loadingItemId, setLoadingItemId] = useState(null);

  const handleDelete = async (id) => {
    try {
      setLoadingItemId(id); // Set the loading state for the specific item
      await GlobalApi.deleteCartItem(id);
      onCartUpdate();
      toast("Item removed");
    } catch (error) {
      console.error("Failed to delete item", error);
    } finally {
      setLoadingItemId(null); // Clear the loading state
    }
  };

  return (
    <div>
      <div className="h-[400px] overflow-auto">
        {cartItemList.length > 0 ? (
          cartItemList.map((cart, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 mb-5"
            >
              <div className="flex gap-6 items-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${cart.productImage}`}
                  width={90}
                  height={90}
                  alt={cart.productName}
                  className="border p-2"
                />
                <div>
                  <h2 className="font-bold">{cart.productName}</h2>
                  <h2>Quantity: {cart.quantity}</h2>
                  <h2 className="text-lg font-bold">{cart.amount} ₽</h2>
                </div>
              </div>
              {loadingItemId === cart.id ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <TrashIcon
                  className="cursor-pointer"
                  onClick={() => handleDelete(cart.id)}
                />
              )}
            </div>
          ))
        ) : (
          <h2>No items in the cart.</h2>
        )}
      </div>
    </div>
  );
}

export default CartItemList;
