import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmedOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shippedOrder,
} from "../../Features/adminOrderSlice";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  AvatarGroup,
  Chip,
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
  TableContainer,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

export default function RecentOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.adminOrder);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  // Get latest 5 orders
  const recentOrders = orders?.slice(0, 5) || [];

  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleStatusChange = (action, orderId) => {
    switch (action) {
      case "confirm":
        dispatch(confirmedOrder(orderId));
        break;
      case "ship":
        dispatch(shippedOrder(orderId));
        break;
      case "deliver":
        dispatch(deliveredOrder(orderId));
        break;
      case "delete":
        dispatch(deleteOrder(orderId));
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "CONFIRMED":
        return "primary";
      case "SHIPPED":
        return "info";
      case "DELIVERED":
        return "success";
      case "CANCELLED":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        width: "100%",
      }}
    >
      <CardHeader
        title="Recent Orders"
        titleTypographyProps={{ variant: "h5", fontWeight: 700 }}
        action={
          <Button
            onClick={() => navigate("/admin/orders")}
            color="primary"
            variant="outlined"
            size="small"
          >
            View All Orders
          </Button>
        }
      />
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table sx={{ minWidth: 650 }} aria-label="recent orders table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Order ID</b>
              </TableCell>
              <TableCell>
                <b>Products</b>
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell>
                <b>Amount</b>
              </TableCell>
              <TableCell>
                <b>Payment</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order._id} hover>
                <TableCell>
                  <Typography fontWeight={600}>
                    #{order._id.slice(-6).toUpperCase()}
                  </Typography>
                </TableCell>

                <TableCell>
                  <AvatarGroup max={3} sx={{ justifyContent: "flex-start" }}>
                    {order.orderItems?.slice(0, 3).map((item, index) => (
                      <Avatar
                        key={index}
                        src={item?.product?.imageUrl}
                        sx={{ width: 30, height: 30 }}
                      >
                        {item?.product?.title?.[0]}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </TableCell>

                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell fontWeight={600}>
                  ₹{order.totalDiscountedPrice}
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.paymentDetails?.paymentStatus || "PENDING"}
                    size="small"
                    color={
                      order.paymentDetails?.paymentStatus === "PAID"
                        ? "success"
                        : "warning"
                    }
                    sx={{ fontWeight: 600, minWidth: 80 }}
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.orderStatus}
                    color={getStatusColor(order.orderStatus)}
                    sx={{ fontWeight: 600, minWidth: 100 }}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => handleMenuClick(e, order)}
                  >
                    <MoreVertIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Status Change Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => handleStatusChange("confirm", selectedOrder?._id)}
          >
            Confirm Order
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusChange("ship", selectedOrder?._id)}
          >
            Mark as Shipped
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusChange("deliver", selectedOrder?._id)}
          >
            Mark as Delivered
          </MenuItem>
          <MenuItem
            onClick={() => handleStatusChange("delete", selectedOrder?._id)}
            sx={{ color: "error.main" }}
          >
            Delete Order
          </MenuItem>
        </Menu>
      </TableContainer>
    </Card>
  );
}
