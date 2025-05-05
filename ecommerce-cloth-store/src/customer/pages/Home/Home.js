import React, { useEffect } from "react";
import MainCarousel from "../../components/Carousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
// import { mens_kurta } from "../../../Data/Men/mens_kurta";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../Features/productSlice";

export default function Home() {
  const { products } = useSelector((state) => state.product);
  console.log("products ", products);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: Infinity,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: "",
      pageSize: "",
      stock: "",
    };

    console.log("Sending data to API: ", data);
    dispatch(getProducts(data));
  }, []);

  // 2) Define the sections you want on the home page,
  //    each with the slug (matches product.category.name) and title:
  const homeSections = [
    { slug: "mens_kurta", title: "Men's Kurta" },
    { slug: "mens_t-shirt", title: "Men's T-Shirts" }, // replace with your actual slug
    { slug: "mens_watch", title: "Men's Watches" },
    { slug: "saree", title: "Women's Saree" },
    { slug: "bag", title: "Women's Bag" },
  ];

  // 3) Helper to filter products by that slug:
  const filterByCategory = (slug) =>
    (products.content || [])
      .filter((p) => p.category?.name?.toLowerCase() === slug.toLowerCase())
      .slice(0, 10); // only first 10 items

  return (
    <>
      <div className="bg-[#f2f2f2] pb-10">
        <MainCarousel />
        <div className="bg-[#f2f2f2] px-2 md:px-5 lg:px-10 py-5 md:py-10 md:space-y-7 lg:space-y-10">
          {homeSections.map(({ slug, title }) => (
            <HomeSectionCarousel
              key={slug}
              productsData={filterByCategory(slug)}
              sectionName={title}
            />
          ))}
        </div>
      </div>
    </>
  );
}
