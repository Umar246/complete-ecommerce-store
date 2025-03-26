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
  const open = Boolean(anchorEl);

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
    // handleClose();
  };

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="Orders" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((item, index) => (
                <TableRow
                  key={item?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <AvatarGroup sx={{ justifyContent: "start" }}>
                      {item?.orderItems?.map((orderItem) => (
                        <Avatar src={orderItem?.product?.imageUrl}></Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center">
                    {item?.orderItems?.map((orderItem) => (
                      <p>{orderItem?.product?.title}</p>
                    ))}
                  </TableCell>
                  <TableCell align="center">{item?._id}</TableCell>
                  <TableCell align="center">{item?.totalPrice}</TableCell>
                  <TableCell align="center">
                    <span
                      className={`text-white px-2 py-1 rounded-full ${
                        item.orderStatus === "CONFIRMED"
                          ? "bg-green-800"
                          : item.orderStatus === "SHIPPED"
                          ? "bg-gray-500"
                          : item.orderStatus === "DELIVERED"
                          ? "bg-blue-800"
                          : item.orderStatus === "PENDING" && "bg-teal-500"
                      }`}
                    >
                      {item?.orderStatus}
                    </span>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      id="demo-positioned-button"
                      // aria-controls={open ? "demo-positioned-menu" : undefined}
                      aria-haspopup="true"
                      // aria-expanded={open ? "true" : undefined}
                      onClick={(event) => handleClick(event, index)}
                      aria-controls={`basic-menu-${item?._id}`}
                      aria-expanded={Boolean(anchorEl[index])}
                    >
                      Status
                    </Button>
                    <Menu
                      id={`demo-positioned-menu-${item?._id}`}
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => handleClose(index)}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <MenuItem onClick={() => handleConfirmOrder(item?._id)}>
                        Confirm Order
                      </MenuItem>
                      <MenuItem onClick={() => handleShippedOrder(item?._id)}>
                        Shipped Order
                      </MenuItem>
                      <MenuItem onClick={() => handleDeliveredOrder(item?._id)}>
                        Delivered Order
                      </MenuItem>
                    </Menu>
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      onClick={() => handleDeleteOrder(item._id)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
