import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Menu,
  Dashboard,
  ShoppingCart,
  People,
  AccountCircle,
  ViewList,
  AddBox,
} from "@mui/icons-material";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import Products from "./Products";
import Orders from "./Orders";
import Customers from "./Customers";
import AddProduct from "./AddProduct";

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin/" },
  { text: "Products", icon: <ShoppingCart />, path: "/admin/products" },
  { text: "Customers", icon: <People />, path: "/admin/customers" },
  { text: "Orders", icon: <ViewList />, path: "/admin/orders" },
  { text: "Add Product", icon: <AddBox />, path: "/admin/products/create" },
];

const ResponsiveLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  // For screens md and above, we'll show permanent sidebar.
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const drawerWidth = 240;
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        bgcolor: "#01518C",
        color: "#fff",
        height: "100%",
        overflowX: "hidden",
      }}
      role="presentation"
    >
      <List sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="hover:!bg-[#2ba9db]"
                  sx={{
                    backgroundColor: isActive ? "#2ba9db" : "inherit",
                    color: isActive ? "white" : "inherit",
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? "white" : "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </Box>
        {/* Account Name menu item always at the bottom */}
        <ListItem disablePadding sx={{ mt: "auto" }}>
          <ListItemButton
            component={Link}
            to="/admin/account"
            onClick={() => setMobileOpen(false)}
            className="hover:!bg-[#2ba9db] "
            sx={{
              backgroundColor:
                location.pathname === "/admin/account" ? "#2ba9db" : "inherit",
              color:
                location.pathname === "/admin/account" ? "white" : "inherit",
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === "/admin/account" ? "white" : "inherit",
              }}
            >
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar for Desktop */}
      {isDesktop && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              overflowX: "hidden",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Main Layout Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* AppBar for Mobile */}
        {!isDesktop && (
          <AppBar position="static">
            <Toolbar className="bg-[#01518C]">
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Admin Panel
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        {/* Content Section */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
            px: 2,
            minHeight: "100vh",
            // display: "flex",
            bgcolor: "#edeee9",
            overflowX: "auto",
          }}
        >
          <Outlet />

          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products/create" element={<AddProduct />} />
          </Routes>
        </Box>
      </Box>

      {/* Temporary Drawer for Mobile */}
      {!isDesktop && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              overflowX: "hidden",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default ResponsiveLayout;
