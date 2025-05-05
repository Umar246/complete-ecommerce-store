import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  // Dialog,
  // DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // TextField,
} from "@mui/material";
import { deleteProduct, getProducts } from "../../Features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { DialogTitle } from "@headlessui/react";
// import { updateProduct } from "../../../../ecommerce-cloth-store-backend/src/Services/ProductService";



// EDIT PRODUCT MODAL
// const EditProductModal = ({ product, open, onClose, onSave }) => {
//   const [editedProduct, setEditedProduct] = useState({ ...product });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSizeChange = (index, e) => {
//     const newSizes = [...editedProduct.sizes];
//     newSizes[index].quantity = parseInt(e.target.value);
//     setEditedProduct(prev => ({ ...prev, sizes: newSizes }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(editedProduct);
//     onClose();
//   };

//   // Add your category options here (same as in AddProduct form)
//   const secondLevelOptions = [/* your options */];
//   const thirdLevelOptions = [/* your options */];

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>Edit Product</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           {/* All your form fields from AddProduct */}
//           <TextField
//             label="Title"
//             name="title"
//             fullWidth
//             value={editedProduct.title}
//             onChange={handleChange}
//             required
//           />
//           {/* Repeat for all other fields */}

//           {/* Size fields */}
//           {editedProduct.sizes.map((size, index) => (
//             <div key={index} className="flex gap-4 w-full">
//               <TextField label="Size" value={size.name} disabled fullWidth />
//               <TextField
//                 label="Quantity"
//                 name="quantity"
//                 type="number"
//                 fullWidth
//                 value={size.quantity}
//                 onChange={(e) => handleSizeChange(index, e)}
//                 required
//               />
//             </div>
//           ))}

//           <Button type="submit" variant="contained" fullWidth className="mt-5 bg-[#01518C]">
//             Save Changes
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// EDIT PRODUCT MODAL ENDS



export default function Products() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  // const [editModalOpen, setEditModalOpen] = useState(false);

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

  // const handleEditProduct = (product) => {
  //   setSelectedProduct(product);
  //   setEditModalOpen(true);
  // };

  // const handleUpdateProduct = async (updatedProduct) => {
  //   try {
  //     await dispatch(updateProduct(updatedProduct)).unwrap();
  //     dispatch(getProducts()); // Refresh the product list
  //     toast.success("Product updated successfully!");
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };
  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Products" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{fontWeight:"600"}}>Image</TableCell>
                <TableCell align="center" sx={{fontWeight:"600"}}>Title</TableCell>
                <TableCell align="center" sx={{fontWeight:"600"}}>Category</TableCell>
                <TableCell align="center" sx={{fontWeight:"600"}}>Price</TableCell>
                <TableCell align="center" sx={{fontWeight:"600"}}>Quantity</TableCell>
                <TableCell align="center" sx={{fontWeight:"600"}}>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product?.products?.content?.map((item) => (
                <TableRow
                  key={item?._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    <Avatar  src={item?.imageUrl}></Avatar>
                  </TableCell>
                  <TableCell align="center">{item?.title}</TableCell>
                  <TableCell align="center" sx={{fontWeight:"600"}}>{item?.category?.name}</TableCell>
                  <TableCell align="center">{item?.price}</TableCell>
                  <TableCell align="center">{item?.quantity}</TableCell>
                  <TableCell align="center">
                  {/* <Button
                      onClick={() => handleEditProduct(item)}
                      variant="contained"
                      color="primary"
                      className="mr-2"
                    >
                      Edit
                    </Button> */}
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
