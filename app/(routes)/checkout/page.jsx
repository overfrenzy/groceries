"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";
import { AuthContext } from "../../_context/AuthContext";
import { UpdateCartContext } from "../../_context/UpdateCartContext";
import GlobalApi from "@/utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Checkout() {
  const { isAuthenticated, user, setIsAuthenticated } = useContext(AuthContext);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      getCartItems();
    }
  }, [isAuthenticated, updateCart]);

  const getCartItems = async () => {
    if (user) {
      try {
        const cartItems = await GlobalApi.getCartItems(user.id);
        const updatedCartItems = cartItems.map((item) => ({
          ...item,
          productName: item.product.name,
          productImage: item.product.image,
          productPrice: item.product.mrp,
        }));
        setCartItemList(updatedCartItems);
        setTotalCartItem(updatedCartItems.length);

        const total = updatedCartItems.reduce(
          (sum, item) => sum + parseFloat(item.amount),
          0
        );
        setSubTotal(total);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
  };

  const handlePlaceOrder = async () => {
    if (isAuthenticated && cartItemList.length > 0) {
      const orderData = {
        username,
        email,
        phone,
        zip,
        address,
        totalOrderAmount: calculateTotalAmount().totalAmount.toFixed(2),
        items: cartItemList.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.productPrice,
        })),
      };

      try {
        const response = await GlobalApi.placeOrder(orderData);
        if (response.success) {
          setUpdateCart(!updateCart);
          toast("Order Successful");
          router.push(`/order-success/${response.order_id}`);
        }
      } catch (error) {
        console.error("Order placement failed", error);
      }
    }
  };

  const calculateTotalAmount = () => {
    const tax = subtotal * 0.09; // 9% tax
    const deliveryFee = 150; // Fixed delivery fee
    const totalAmount = subtotal + tax + deliveryFee;
    return { totalAmount, tax, deliveryFee };
  };

  return (
    <div className="p-5 px-5 md:px-10 flex flex-col md:flex-row py-8 justify-between">
      {/* Billing Details */}
      <div className="md:w-2/3">
        <h2 className="font-bold text-3xl">Billing Details</h2>
        <div className="grid grid-cols-2 gap-10 mt-3">
          <Input
            placeholder="Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-10 mt-3">
          <Input
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
        </div>
        <div className="mt-3">
          <Input
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      {/* Cart Summary */}
      <div className="md:w-1/3 mx-10 border">
        <h2 className="p-3 bg-gray-200 font-bold text-center">
          Total Cart ({totalCartItem})
        </h2>
        <div className="p-4 flex flex-col gap-4">
          <h2 className="font-bold flex justify-between">
            Subtotal: <span>{subtotal} ₽</span>
          </h2>
          <hr />
          <h2 className="flex justify-between">
            Delivery :{" "}
            <span>{calculateTotalAmount().deliveryFee.toFixed(2)} ₽</span>
          </h2>
          <h2 className="flex justify-between">
            Tax (9%) : <span>{calculateTotalAmount().tax.toFixed(2)} ₽</span>
          </h2>
          <hr />
          <h2 className="font-bold flex justify-between">
            Total :{" "}
            <span>{calculateTotalAmount().totalAmount.toFixed(2)} ₽</span>
          </h2>
          <Button onClick={handlePlaceOrder}>
            Payment
            <ArrowBigRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
