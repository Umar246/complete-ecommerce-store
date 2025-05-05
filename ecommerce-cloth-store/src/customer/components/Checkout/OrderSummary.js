import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Button, Divider } from "@mui/material";
import CartItem from "../Cart/CartItem";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../Features/orderSlice";
import { createPayment } from "../../../Features/paymentSlice";

export default function OrderSummary() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state) => state.order);
  const searchParamms = new URLSearchParams(location.search);
  const orderId = searchParamms.get("order_id");

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  const handleCheckout = () => {
    console.log("working in order summary");

    dispatch(createPayment(orderId));
  };

  return (
    <div className="mt-[2rem] lg:mt-[3.5rem]">
      {/* Address */}
      <div className="p-5 bg-white shadow-md  rounded-s-md border">
        <AddressCard address={currentOrder?.shippingAddress} />
      </div>

      {/* Orders Code */}
      <div>
        <div className="lg:grid grid-cols-3 relative mt-4 lg:mt-8 lg:space-x-5">
          <div className="col-span-2 space-y-4  lg:px-0">
            {currentOrder?.orderItems?.map((item) => (
              <CartItem cartItemDetails={item} />
            ))}
          </div>

          <div className="sticky top-5 h-[100vh] mt-5 lg:mt-0">
            <div className="border bg-white shadow-md p-5">
              <p className="uppercase font-bold opacity-60 pb-4">
                Price details
              </p>

              <Divider />

              <div className="space-y-2 font-semibold ">
                <div className="flex justify-between pt-3">
                  <span>Price</span>
                  <span> ₹{currentOrder?.totalPrice}</span>
                </div>

                <div className="flex justify-between pt-3">
                  <span>Discount</span>
                  <span className="text-green-600">
                    {" "}
                    -₹{currentOrder?.discount}
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
                    ₹{currentOrder?.totalDiscountedPrice}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                variant="contained"
                className="w-full styledButton"
                sx={{
                  px: "1.2rem",
                  py: "0.5rem",
                  mt: "2rem",
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
