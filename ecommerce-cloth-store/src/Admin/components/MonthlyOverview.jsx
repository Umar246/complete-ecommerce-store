import {
  AccountCircle,
  AttachMoney,
  MoreVert,
  SettingsCell,
  TrendingUp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

const salesData = [
  {
    stats: "245k",
    title: "Sales",
    color: "#E5D68A",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "12.5k",
    title: "Customers",
    color: "#22CB5C",
    icon: <AccountCircle sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "1.54k",
    title: "Products",
    color: "#DE4839",
    icon: <SettingsCell sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "88k",
    title: "Revenue",
    color: "#12B0E8",
    icon: <AttachMoney sx={{ fontSize: "1.75rem" }} />,
  },
];

const renderStats = () => {
  return salesData.map((data, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          varriant="rounded"
          sx={{
            mr: 1,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "white",
            backgroundColor: `${data.color}`,
          }}
        >
          {data.icon}
        </Avatar>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography varriant="caption">{data.title}</Typography>
          <Typography varriant="h6">{data.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};
export default function MonthlyOverview() {
  return (
    <Card sx={{ bgcolor: "#242B2E", color: "#fff", flexGrow: 1 }}>
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box component={"span"} sx={{ fontWeight: 600 }}>
              Total 48.5% growth
            </Box>
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2,
            lineHeight: "2rem !important",
            letterSpacing: ".15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
    
  );
}
