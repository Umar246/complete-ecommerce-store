// MonthlyOverview.js
import {
  AccountCircle,
  AttachMoney,
  TrendingUp,
  Inventory
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  LinearProgress
} from "@mui/material";
import React from "react";

const statsData = [
  {
    stats: "245k",
    title: "Sales",
    progress: 75,
    color: "#8B5CF6",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "12.5k",
    title: "Customers",
    progress: 60,
    color: "#0EA5E9",
    icon: <AccountCircle sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "1.54k",
    title: "Products",
    progress: 40,
    color: "#EC4899",
    icon: <Inventory sx={{ fontSize: "1.75rem" }} />,
  },
  // {
  //   stats: "$88k",
  //   title: "Revenue",
  //   progress: 85,
  //   color: "#10B981",
  //   icon: <AttachMoney sx={{ fontSize: "1.75rem" }} />,
  // },
];

const renderStats = () => {
  return statsData.map((data, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card sx={{ 
        height: "100%", 
        boxShadow: 1,
        borderRadius: 2,
        transition: "box-shadow 0.3s",
        "&:hover": { boxShadow: 3 }
      }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2
            }}
          >
            <Avatar
              variant="rounded"
              sx={{
                mr: 2,
                width: 50,
                height: 50,
                color: "white",
                backgroundColor: `${data.color}22`,
                "& .MuiSvgIcon-root": { color: data.color }
              }}
            >
              {data.icon}
            </Avatar>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">{data.title}</Typography>
              <Typography variant="h5" fontWeight={700}>{data.stats}</Typography>
            </Box>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={data.progress} 
            sx={{ 
              height: 8,
              borderRadius: 4,
              backgroundColor: `${data.color}22`,
              "& .MuiLinearProgress-bar": { backgroundColor: data.color }
            }} 
          />
          <Typography variant="caption" sx={{ mt: 1, display: "block", color: "text.secondary" }}>
            +24% from last month
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ));
};

export default function MonthlyOverview() {
  return (
    <Card sx={{ 
      bgcolor: "#fff", 
      borderRadius: 3,
      boxShadow: 3,
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
      <CardHeader
        title="Monthly Overview"
        titleTypographyProps={{
          variant: "h5",
          fontWeight: 700
        }}
        subheader={
          <Typography variant="body2" color="text.secondary">
            <Box component="span" sx={{ color: "success.main", fontWeight: 600 }}>
              Total 48.5% growth
            </Box>
            😎 this month
          </Typography>
        }
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
}