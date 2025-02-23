import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../Features/cartSlice";

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state);
  console.log("cart?.", cartData?.cart?.totalPrice);

  const handleCheckout = () => {
    navigate("/checkout/?step=2");
  };

  useEffect(() => {
    dispatch(getCart());
  }, [cartData.updateCartItem, cartData.deleteCartItem]);
  return (
    <div className="bg-[#f2f2f2]">
      <div className="flex flex-col-reverse bg-[#f2f2f2] lg:grid grid-cols-3  lg:px-10 relative  lg:pt-8 pb-10">
        <div className="col-span-2 space-y-4 px-2 lg:px-0">
          {cartData?.cartItems?.map((item) => (
            <CartItem cartItemDetails={item} />
          ))}
        </div>

        <div className="px-2 lg:px-5 lg:sticky top-5 lg:h-[100vh] mb-5 pt-5 md:pt-0 lg:mt-0">
          <div className="border shadow-md p-5 bg-white">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>

            <Divider />

            <div className="space-y-2 font-semibold ">
              <div className="flex justify-between pt-3">
                <span>Price</span>
                <span> ₹{cartData?.cart?.totalPrice}</span>
              </div>

              <div className="flex justify-between pt-3">
                <span>Discount</span>
                <span className="text-green-600">
                  {" "}
                  -₹{cartData?.cart?.discount}
                </span>
              </div>

              <div className="flex justify-between pt-3 mb-1">
                <span>Delivery Charges</span>
                <span className="text-green-600"> Free</span>
              </div>
              <Divider />
              <div className="flex justify-between pt-3">
                <span>Total Amount</span>
                <span className="text-green-600">
                  {" "}
                  ₹{cartData?.cart?.totalDiscountedPrice}
                </span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              variant="contained"
              className="styledButton w-full"
              sx={{
                px: "1.2rem",
                py: "0.5rem",
                bgcolor: "#9155fd",
                mt: "2rem",
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
