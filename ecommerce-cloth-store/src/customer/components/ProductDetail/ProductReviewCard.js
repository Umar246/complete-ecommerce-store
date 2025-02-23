import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

export default function ProductReviewCard() {
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item sx={4}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              R
            </Avatar>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <div>
            <div className="space-y-2">
              <p className="font-semibold text-lg">Raam</p>
              <p className="opacity-70">July 20, 2024</p>
            </div>
          </div>

          <Rating value={4.5} readOnly precision={0.5} name="half-rating"/>
          <p>Nice shirt, i love this product ❤ </p>
        </Grid>
        </Grid>
    </div>
  );
}
