"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalApi from "@/utils/GlobalApi";
import Image from "next/image";

const OrderSuccess = () => {
  const { order_id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (order_id) {
      GlobalApi.getOrderDetails(order_id)
        .then((response) => setOrderDetails(response))
        .catch((error) =>
          console.error("Failed to fetch order details", error)
        );
    }
  }, [order_id]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Order Success</h1>
      <h2 className="text-xl">Order ID: {order_id}</h2>

      {/* Billing Details */}
      <div className="mt-5 bg-gray-100 p-4 rounded-md">
        <h3 className="text-xl font-bold mb-3">Billing Details:</h3>
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Name:</strong> {orderDetails.username}
          </p>
          <p>
            <strong>Email:</strong> {orderDetails.email}
          </p>
          <p>
            <strong>Phone:</strong> {orderDetails.phone}
          </p>
          <p>
            <strong>Address:</strong> {orderDetails.address}, {orderDetails.zip}
          </p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-5 bg-gray-100 p-4 rounded-md">
        <h3 className="text-xl font-bold mb-3">Order Summary:</h3>
        <div className="grid grid-cols-3 gap-4">
          {orderDetails.items.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center gap-4 p-2 border-b"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${item.product.image}`}
                alt={item.product.name}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-md"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.product.name}</p>
                <p>
                  {item.quantity} x {item.price} ₽
                </p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-lg font-bold mt-5">
          Total: {orderDetails.totalOrderAmount} ₽
        </h3>
      </div>
    </div>
  );
};

export default OrderSuccess;
