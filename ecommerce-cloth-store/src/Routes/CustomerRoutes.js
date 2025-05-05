import React from "react";
import Navbar from "../customer/components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../customer/pages/Home";
import Footer from "../customer/components/Footer/Footer";
import Cart from "../customer/components/Cart/Cart";
import Product from "../customer/components/Product/Product";
import ProductDetail from "../customer/components/ProductDetail/ProductDetail";
import OrderDetails from "../customer/components/Orders/OrderDetails";
import Checkout from "../customer/components/Checkout/Checkout";
import Orders from "../customer/components/Orders/Orders";
import PaymentSuccess from "../customer/components/Payment/PaymentSuccess";

export default function CustomerRoutes() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Home />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:levelOne/:levelTwo/:levelThree" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/order" element={<Orders />} />
        <Route path="/account/order/:orderId" element={<OrderDetails />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}
