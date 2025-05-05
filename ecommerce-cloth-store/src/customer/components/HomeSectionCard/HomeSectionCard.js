import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeSectionCard({ product }) {
  const navigate = useNavigate();
 
  const handleNavigate = () => {
    navigate(`/product/${product._id}`);
  };

  // console.log("product in here ", product);
  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer pt-5  flex flex-col items-center bg-white rounded-lg shadow-sm md:shadow-md overflow-hidden w-[15rem]  mx-auto mb-2 "
    >
      {/* Img */}
      <div className="h-[13rem] w-[10rem] ">
        <img
          className="object-cover object-top w-full h-full"
          src={product.imageUrl}
          alt="none"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-lg text-gray-900">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.title}</p>
      </div>
    </div>
  );
}
