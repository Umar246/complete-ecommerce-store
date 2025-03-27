import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { deleteProduct, getProducts } from "../../Features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Products() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state);

  // console.log("products --------", product);

  const handleProductDelete = (productId) => {
    try {
      console.log("productId handleProductDelete: ", productId);
      dispatch(deleteProduct(productId));
      // toast.success("Product Deleted Successfully")
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: Infinity,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: "",
      pageSize: "",
      stock: "",
    };

    console.log("Sending data to API: ", data);
    dispatch(getProducts(data));
  }, []);
  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Products" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product?.products?.content?.map((item) => (
                <TableRow
                  key={item?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    <Avatar src={item?.imageUrl}></Avatar>
                  </TableCell>
                  <TableCell align="center">{item?.title}</TableCell>
                  <TableCell align="center">{item?.category?.name}</TableCell>
                  <TableCell align="center">{item?.price}</TableCell>
                  <TableCell align="center">{item?.quantity}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleProductDelete(item._id)}
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
