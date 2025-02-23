import React from "react";
import HomeSectionCard from "./HomeSectionCard";

export default function index({ product }) {
  // console.log("product", product);
  return (
    <>
      <HomeSectionCard product={product} />
    </>
  );
}
