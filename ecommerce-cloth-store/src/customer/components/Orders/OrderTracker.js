import React from "react";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const steps = [
  "Placed",
  "Order Confirmed",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

export default function OrderTracker({ activeStep }) {
  // TODO: FOR Responsiveness
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="py-5">
      {/* //TODO: MUI Steppe Code */}
      <Box sx={{ width: "100%" }}>
        <Stepper
          className="px-3 md:px-0 lg:px-16"
          activeStep={activeStep}
          orientation={isMobile ? "vertical" : "horizontal"}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished successfully
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>{/* ... */}</React.Fragment>
        )}
      </Box>
    </div>
  );
}
