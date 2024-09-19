import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ProductItemDetail from "./ProductItemDetail";

function ProductItem({ product, categories }) {
  const hasDiscount =
    product.selling_price && product.selling_price < product.mrp;

  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg hover:scale-110 hover:shadow-lg transition-all ease-in-out cursor-pointer">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.image}`}
        width={500}
        height={200}
        alt={product.name}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="font-bold text-lg">{product.name}</h2>
      <div className="flex gap-3">
        {hasDiscount && (
          <h2 className="text-red-500 font-bold">{product.selling_price} ₽</h2>
        )}
        <h2
          className={`font-bold ${
            hasDiscount ? "line-through text-gray-500" : ""
          }`}
        >
          {product.mrp} ₽
        </h2>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-green-600"
          >
            Add to cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>Product Details</DialogTitle>
            </VisuallyHidden>
            <DialogDescription>
              <ProductItemDetail product={product} categories={categories} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
