import { Grid } from "@mui/material";
import React from "react";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";

export default function AdminDashboard() {
  return (
    <div className="px-10">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Achievement />
        </Grid>
        <Grid item xs={12} md={8}>
          <MonthlyOverview/>
        </Grid>
      </Grid>
    </div>
  );
}
