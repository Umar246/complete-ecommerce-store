import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartItem } from "../../../Features/cartSlice";

export default function CartItem({ cartItemDetails }) {
  console.log("cartItemDetails", cartItemDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdateCartItem = async (num) => {
    const data = {
      data: { quantity: cartItemDetails?.quantity + num },
      cartItemId: cartItemDetails?._id,
    };
    await dispatch(updateCartItem(data));
  };
  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(cartItemDetails?._id));
  };
  return (
    <div
      key={cartItemDetails?._id}
      className="p-5 bg-white shadow-md border rounded-md space-y-4"
    >
      {/* //TODO: Image and details */}
      <div className="flex items-center">
        <div
          className="w-[7rem] h-[7rem] lg:w-[9rem] lg:h-[9rem]"
          onClick={() => navigate(`/product/${cartItemDetails?.product?._id}`)}
        >
          <img
            className="w-full h-full object-cover object-top cursor-pointer"
            src={cartItemDetails?.product?.imageUrl}
            alt=""
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold text-[0.8rem] md:text-[1rem]">
            {cartItemDetails?.product?.title}{" "}
          </p>
          <p className="opacity-70 text-[0.8rem] md:text-[1rem]">
            Size: {cartItemDetails?.size} , {cartItemDetails?.product?.color}
          </p>
          <p className="opacity-70 mt-2 text-[0.8rem] md:text-[1rem]">
            Seller: {cartItemDetails?.product?.brand}
          </p>
          <div className="flex space-x-3 lg:space-x-5 items-center  text-gray-900 pt-4">
            <p className="font-semibold text-[0.8rem] md:text-[1rem]">
              ₹{cartItemDetails?.discountedPrice}
            </p>
            <p className="line-through opacity-50 text-[0.8rem] md:text-[1rem]">
              ₹{cartItemDetails?.price}
            </p>
            <p className="text-green-600 font-semibold text-[0.8rem] md:text-[1rem]">
              {cartItemDetails?.product?.discountedPecentage}% Off
            </p>
          </div>
        </div>
      </div>

      {/* //TODO: Remove & Add button */}
      <div className="flex items-center space-x-3 lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton
            sx={{ color: "RGB(145 85 253)" }}
            onClick={() => handleUpdateCartItem(-1)}
            disabled={cartItemDetails?.quantity <= 1}
          >
            <RemoveCircleOutline />
          </IconButton>

          <span className="py-1 px-5 md:px-7 border rounded-sm">
            {" "}
            {cartItemDetails?.quantity}
          </span>

          <IconButton
            sx={{ color: "RGB(145 85 253)" }}
            onClick={() => handleUpdateCartItem(1)}
          >
            <AddCircleOutline />
          </IconButton>
        </div>

        <div>
          <Button
            sx={{ color: "RGB(145 85 253)" }}
            onClick={handleRemoveCartItem}
          >
            remove
          </Button>
        </div>
      </div>
    </div>
  );
}
