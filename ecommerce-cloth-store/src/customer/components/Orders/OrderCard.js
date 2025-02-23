import { Adjust } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderCard() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/account/order/${5}`)}
      className="p-5 shadow-md bg-white hover:shadow-lg"
    >
      <Grid
        container
        spacing={2}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={{ md: "space-between" }}
      >
        <Grid item xs={12} sm={6}>
          <div className="flex flex-col md:flex-row md:items-center space-y-5 md:space-y-0 cursor-pointer">
            <img
              className="w-[8rem] h-[8rem] md:w-[5rem] mx-auto md:mx-0 md:md:h-[5rem] object-cover object-top"
              src="https://rukminim1.flixcart.com/image/612/612/l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg?q=70"
              alt="product_image"
            />

            <div className="md:ml-2 space-y-2">
              <p>Men Slim Mid Rise Black Jeans</p>
              <p className="opacity-50 text-xs font-semibold">Size: M</p>
              <p className="opacity-50 text-xs font-semibold">Color: Black</p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={2}>
          <p>₹1099</p>
        </Grid>

        <Grid item xs={12} sm={4}>
          {true && (
            <div>
              <p className="flex items-center">
                <Adjust
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-1 text-sm"
                />
                <span>Delivered On March 03</span>
              </p>

              <p className="text-xs">Your item has been delivered</p>
            </div>
          )}
          {false && (
            <p>
              <span>Delivered On March 03</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
