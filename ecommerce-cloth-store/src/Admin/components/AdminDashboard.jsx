import { Grid } from "@mui/material";
import React from "react";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";
// import Products from "./Products";

export default function AdminDashboard() {
  return (
    <div className="md:px-10">
      <Grid container spacing={2} alignItems={"stretch"}>
        <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column" }}>
          <Achievement />
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: "flex" , flexDirection: "column"}}>
          <MonthlyOverview/>
        </Grid>
        {/* <Grid item xs={12} md={6} sx={{ display: "flex" , flexDirection: "column"}}>
          <Products/>
        </Grid> */}
      </Grid>
    </div>
  );
}
