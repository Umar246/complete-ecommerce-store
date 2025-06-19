// AdminDashboard.js
import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import Achievement from "./Achievement";
import MonthlyOverview from "./MonthlyOverview";
import RecentOrders from "./RecentOrders";

export default function AdminDashboard() {
  return (
    <div className="md:px-10 py-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Typography variant="h4" className="font-bold text-gray-800">
          Dashboard Overview
        </Typography>
        <Typography variant="subtitle1" className="text-gray-600">
          Welcome back! Here's what's happening today
        </Typography>
      </div>

      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
          <Achievement />
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: "flex" }}>
          <MonthlyOverview />
        </Grid>
        
        <Grid item xs={12} sx={{ display: "flex" }}>
          <RecentOrders />
        </Grid>
      </Grid>
    </div>
  );
}