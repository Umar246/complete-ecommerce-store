import React, { useState, useEffect } from "react";
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
  CssBaseline,
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
  { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
  { text: "Products", icon: <ShoppingCart />, path: "/admin/products" },
  { text: "Customers", icon: <People />, path: "/admin/customers" },
  { text: "Orders", icon: <ViewList />, path: "/admin/orders" },
  { text: "Add Product", icon: <AddBox />, path: "/admin/products/create" },
];

const ResponsiveLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const drawerWidth = 240;
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [location.pathname]);

  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        bgcolor: "#4f46e5",
        color: "#fff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden", // Fixes horizontal scrollbar
      }}
    >
      <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>
        {" "}
        {/* Reduced padding */}
        Admin Panel
      </Typography>

      <List sx={{ flex: 1, py: 0 }}>
        {" "}
        {/* Reduced vertical padding */}
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                className="hover:!bg-[#0a1535]"
                sx={{
                  backgroundColor: isActive ? "#0a1535" : "inherit",
                  color: "inherit",
                  py: 1, // Reduced vertical padding
                  px: 2, // Reduced horizontal padding
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: "36px" }}>
                  {" "}
                  {/* Reduced min-width */}
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Account at bottom */}
      {/* <List sx={{ py: 0 }}>
        {" "}
       
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/admin/account"
            className="hover:!bg-[#0a1535]"
            sx={{
              backgroundColor:
                location.pathname === "/admin/account" ? "#0a1535" : "inherit",
              color: "inherit",
              py: 1, 
              px: 2, 
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: "36px" }}>
              {" "}
           
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
      </List> */}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* AppBar for Mobile */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "#4f46e5",
        }}
      >
        <Toolbar sx={{ minHeight: "56px !important" }}>
          {" "}
          {/* Reduced toolbar height */}
          {!isDesktop && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontSize: "1.1rem" }}
          >
            {" "}
            {/* Reduced font size */}
            {menuItems.find((item) => item.path === location.pathname)?.text ||
              "Admin Panel"}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar for Desktop */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {isDesktop ? (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                bgcolor: "#4f46e5",
                color: "#fff",
                overflowX: "hidden", // Double protection for scrollbar
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                bgcolor: "#4f46e5",
                color: "#fff",
                overflowX: "hidden", // Double protection for scrollbar
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, md: 2 }, // Responsive padding reduction
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 3, md: 0 }, // Reduced mobile top margin
        }}
      >
        <Toolbar sx={{ minHeight: "48px !important" }} />{" "}
        {/* Reduced spacer height */}
        <Box
          sx={{
            bgcolor: "#f2f2f2",
            borderRadius: 2,
            p: { xs: 0, md: 2 }, // Responsive padding reduction
            minHeight: "calc(100vh - 56px)", // Adjusted height calculation
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
    </Box>
  );
};

export default ResponsiveLayout;
