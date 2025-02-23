import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { StarBorder } from "@mui/icons-material";

export default function OrderDetails() {
  return (
    <div className="px-5 pb-10 bg-[#f2f2f2] lg:px-16 pt-5 md:pt-10">
      {/* 1 */}
      <div className="px-5 py-3 bg-white  shadow-md border">
        <h1 className="font-bold text-lg pb-5 md:pb-7 ">Delivery Address</h1>
        <AddressCard />
      </div>

      {/* 2 */}
      <div className="py-5 lg:py-10">
        <OrderTracker activeStep={2} />
      </div>

      {/* 3 */}
      <Grid container className="space-y-5">
        {[1, 1, 1, 1, 1, 1, 1].map((item) => (
          <Grid
            item
            container
            className="shadow-md hover:shadow-lg bg-white rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
            gap={{ xs: 3, md: 0 }}
          >
            <Grid item xs={12} md={6}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[6rem] h-[6rem] object-cover object-top"
                  src="https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70"
                  alt="product_image"
                />

                <div className="space-y-1 ">
                  <p className="font-semibold">Men Slim Mid Rise Black Jeans</p>
                  <p className="space-x-5 opacity-50 text-xs font-semibold">
                    {" "}
                    <span>Color: Pink</span> <span>Size: M</span>{" "}
                  </p>
                  <p className="text-gray-600 ">Seller: Linaria</p>
                  <p className="font-semibold ">₹1099</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <Box sx={{ color: deepPurple[500] }}>
                <div className="flex items-center">
                  <StarBorder
                    sx={{ fontSize: "1.2rem", marginRight: "0.3rem" }}
                    className=""
                  />
                  <span>Rate & Review Product</span>
                </div>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
