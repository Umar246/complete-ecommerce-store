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
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.adminOrder);
  const [anchorEl, setAnchorEl] = React.useState([]);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  const handleShippedOrder = (orderId) => {
    dispatch(shippedOrder(orderId));
    handleClose();
  };

  const handleConfirmOrder = (orderId) => {
    dispatch(confirmedOrder(orderId));
    handleClose();
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
    handleClose();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <div className="p-3 md:p-5">
      <Card className="mt-2">
        <CardHeader title="Orders" />
        <TableContainer
          component={Paper}
          sx={{
            // overflowX: "auto",
            tableLayout: "fixed",
            // width: "100%",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell align="center">Order ID</TableCell>
                <TableCell align="center">Order Date</TableCell>
                <TableCell align="center">Total Items</TableCell>
                {/* <TableCell align="center">Total Price</TableCell>
                <TableCell align="center">Discount</TableCell> */}
                <TableCell align="center">Total Price</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Change</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>

            {/* ... */}
            <TableBody>
              {orders?.map((order, index) => (
                <TableRow key={order._id}>
                  {/* Product Images */}
                  <TableCell>
                    <AvatarGroup max={2} sx={{ justifyContent: "start" }}>
                      {order?.orderItems?.map((item, i) => (
                        <Avatar key={i} src={item?.product?.imageUrl || ""}>
                          {item?.product?.title?.[0] || "P"}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell
                    align="center"
                    // sx={{
                    //   whiteSpace: "nowrap",
                    //   overflow: "hidden",
                    //   textOverflow: "ellipsis",
                    //   maxWidth: 150,
                    // }}
                  >
                    {order?._id?.slice(-6)}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">{order.totalItem}</TableCell>
                  {/* <TableCell align="center">Rs. {order.totalPrice}</TableCell>
                  <TableCell align="center">Rs. {order.discount}</TableCell> */}
                  <TableCell align="center">
                    Rs. {order.totalDiscountedPrice}
                  </TableCell>
                  <TableCell align="center">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        order.paymentDetails?.paymentStatus === "PAID"
                          ? "bg-green-700 text-white"
                          : "bg-yellow-600 text-white"
                      }`}
                    >
                      {order.paymentDetails?.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span
                      className={`text-white text-sm px-2 py-1 rounded-full ${
                        order.orderStatus === "CONFIRMED"
                          ? "bg-green-800"
                          : order.orderStatus === "SHIPPED"
                          ? "bg-gray-500"
                          : order.orderStatus === "DELIVERED"
                          ? "bg-blue-800"
                          : "bg-teal-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </TableCell>

                  {/* Change Status */}
                  <TableCell align="center">
                    <Button onClick={(e) => handleClick(e, index)}>
                      Status
                    </Button>
                    <Menu
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => handleClose(index)}
                    >
                      <MenuItem onClick={() => handleConfirmOrder(order._id)}>
                        Confirm
                      </MenuItem>
                      <MenuItem onClick={() => handleShippedOrder(order._id)}>
                        Shipped
                      </MenuItem>
                      <MenuItem onClick={() => handleDeliveredOrder(order._id)}>
                        Delivered
                      </MenuItem>
                    </Menu>
                  </TableCell>

                  {/* Delete */}
                  <TableCell align="center">
                    <Button
                      onClick={() => handleDeleteOrder(order._id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* ... */}
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
