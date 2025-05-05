import { Box, Modal } from "@mui/material";
import React from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const responsiveStyle = {
    ...style,
    width: isSmallScreen ? "95%" : isMediumScreen ? "70%" : 500,
    p: isSmallScreen ? 2 : 4, // Adjust padding for small screens
    paddingY: isSmallScreen ? 4 : 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={responsiveStyle}>
          {location.pathname === "/signup" ? <Signup /> : <Signin />}
        </Box>
      </Modal>
    </div>
  );
}
