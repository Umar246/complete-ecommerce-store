  import React, { useState } from "react";
  import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import {
    Dashboard,
    ShoppingCart,
    People,
    Assignment,
    AddBox,
    AccountCircle,
    Menu,
  } from "@mui/icons-material";
  import { Link, Outlet, Route, Routes } from "react-router-dom";
  import AdminDashboard from "./AdminDashboard";
  import Products from "./Products";
  import Orders from "./Orders";
  import Customers from "./Customers";
  import AddProduct from "./AddProduct";

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/admin/" },
    { text: "Products", icon: <ShoppingCart />, path: "/admin/products" },
    { text: "Customers", icon: <People />, path: "/admin/customers" },
    { text: "Orders", icon: <Assignment />, path: "/admin/orders" },
    { text: "Add Product", icon: <AddBox />, path: "/admin/products/create" },
  ];

  const Admin = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = useTheme();
    // isLargeScreen is true if screen width is medium (md) or above
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
   
    return (
      <div className="flex">
        {/* Sidebar for large screens */}
        {isLargeScreen && (
        <Drawer
          variant="permanent"
          className="hidden md:flex"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
          }}
        >
          <List className="h-full flex flex-col justify-between">
            <div>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.path}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </div>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/account">
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
          )}

        {/* Collapsible Drawer for small screens */}
        {!isLargeScreen && (
       <>
       <IconButton
          className="md:hidden p-4"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Menu />
        </IconButton>
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{ "& .MuiDrawer-paper": { width: 240 } }}
        >
          <List className="h-full flex flex-col justify-between">
            <div>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </div>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/admin/account"
                onClick={() => setMobileOpen(false)}
              >
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        </>
         )}

        {/* Content Area */}
        <main className="flex-1 p-4">
          <Outlet />
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products/create" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
    );
  };

  export default Admin;
