import { Alert, AlertTitle, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderTracker from "../Orders/OrderTracker";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import { getOrderById } from "../../../Features/orderSlice";
import { updatePayment } from "../../../Features/paymentSlice";
import AddressCard from "../AddressCard/AddressCard";

export default function PaymentSuccess() {
  const [paymentId, setPaymentId] = useState();
  const [orderId, setOrderId] = useState();
  // const [referenceId, setReferenceId] = useState();
  // const { orderId } = useParams();
  // console.log('orderId', orderId)

  const dispatch = useDispatch();
  const { currentOrder } = useSelector((state) => state.order);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    setPaymentId(urlParams.get("payment_id"));
    setOrderId(urlParams.get("order_id"));
  }, []);

  useEffect(() => {
    if (paymentId) {
      const data = { order_Id: orderId, payment_Id: paymentId };
      console.log('orderId', orderId)
      console.log('paymentId', paymentId)
      dispatch(getOrderById(orderId));
      dispatch(updatePayment(data));
    }
  }, [orderId, paymentId]);

  return (
    <div className="px-2 bg-[#f1f1f1] lg:px-20 pt-7 pb-3 md:pb-8 md:pt-10">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          security="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Successfull</AlertTitle>
          Congratulations Your Order Get Placed
        </Alert>
      </div>

      <OrderTracker activeStep={1} />
      <Grid container className="space-y-5 py-5 md:pt-20">
        {currentOrder?.orderItems?.map((item) => {
          return (
            <>
              <Grid
                container
                item
                className="py-5 md:py-5 px-5 md:px-14 bg-white space-y-8 md:space-y-0 shadow-md border rounded-md"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Grid item xs={12} md={6}>
                  <div className="flex items-center">
                    <img
                      className="w-[7rem] h-[7rem] object-cover object-top"
                      src={item?.product?.imageUrl}
                      alt="none"
                    />

                    <div className="ml-5 space-y-2">
                      <p>{item.product.title}</p>
                      <div className="opacity-50 text-xs font-semibold space-x-5">
                        <span>Size: {item.size}</span>
                      </div>
                      <p>Seller: {item.product.brand}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                </Grid>

                <Grid item>
                  <AddressCard address={currentOrder?.shippingAddress} />
                </Grid>
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
}
