import React from "react";
import {
  Box,
  Card,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";

// Only 4 steps as per requirements
const steps = ["Placed", "Confirmed", "Shipped", "Delivered"];

// Map backend status to step index
const statusToStep = {
  PLACED: 0,
  CONFIRMED: 1,
  SHIPPED: 2,
  DELIVERED: 3,
};

export default function OrderTracker() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { currentOrder } = useSelector((state) => state.order);
  console.log("currentOrder", currentOrder?._id.slice(18));

  // Get active step from current order status
  const activeStep = statusToStep[currentOrder?.orderStatus] ?? 0;
  const isDelivered = currentOrder?.orderStatus === "DELIVERED";

  return (
    <div className="py-5">
      <Box sx={{ width: "100%" }}>
        <Stepper
          className="px-3 md:px-0 lg:px-16"
          activeStep={activeStep}
          orientation={isMobile ? "vertical" : "horizontal"}
        >
          {steps.map((label, index) => {
            const completed =
              index < activeStep || (isDelivered && index === activeStep);

            return (
              <Step key={label} completed={completed}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {isDelivered && (
          <Typography sx={{ mt: 2, textAlign: "center" }}>
            Thanks <span className="text-[#2e7d32] font-semibold italic">{currentOrder?.user?.firstName} {currentOrder?.user?.lastName}</span> for shopping! your order has been successfully delivered
          </Typography>
        )}

        <Card sx={{ mt: 2, textAlign: "center" }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order ID: #{currentOrder?._id.slice(18)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Order Status: {currentOrder?.orderStatus}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Placed on:{" "}
              {new Date(currentOrder?.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Card>
      </Box>
    </div>
  );
}
