import { useState } from "react";
import { TextField, Button, MenuItem, Card, CardContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { createProduct } from "../../Features/productSlice";



const AddProductForm = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountedPrice: "",
    discountedPecentage: "",
    quantity: 0,
    brand: "",
    color: "",
    imageUrl: "",
    sizes: [
      { name: "S", quantity: null },
      { name: "M", quantity: null },
      { name: "L", quantity: null},
    ],
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
  });

  const dispatch = useDispatch();
  // const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (index, e) => {
    const newSizes = [...product.sizes];
    newSizes[index][e.target.name] = Number(e.target.value);
    setProduct({
      ...product,
      sizes: newSizes,
      quantity: newSizes.reduce((total, size) => total + size.quantity, 0),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createProduct(product));
    setProduct({
      title: "",
      description: "",
      price: "",
      discountedPrice: "",
      discountedPecentage: "",
      quantity: 0,
      brand: "",
      color: "",
      imageUrl: "",
      sizes: [
        { name: "S", quantity: 0 },
        { name: "M", quantity: 0 },
        { name: "L", quantity: 0 },
      ],
      topLevelCategory: "",
      secondLevelCategory: "",
      thirdLevelCategory: "",
    });
  };

  return (
    <Card className="max-w-4xl mx-auto mt-10 p-5 shadow-lg bg-white">
      <CardContent>
        <Typography variant="h5" gutterBottom className="pb-5 font-bold text-gray-800">
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Title" name="title" fullWidth value={product.title} onChange={handleChange} required />
          <TextField label="Description" name="description" fullWidth value={product.description} onChange={handleChange} required />
          <TextField label="Price" name="price" type="number" fullWidth value={product.price} onChange={handleChange} required />
          <TextField label="Discounted Price" name="discountedPrice" type="number" fullWidth value={product.discountedPrice} onChange={handleChange} required />
          <TextField label="Discount Percentage" name="discountedPecentage" type="number" fullWidth value={product.discountedPecentage} onChange={handleChange} required />
          <TextField label="Brand" name="brand" fullWidth value={product.brand} onChange={handleChange} required />
          <TextField label="Color" name="color" fullWidth value={product.color} onChange={handleChange} required />
          <TextField label="Image URL" name="imageUrl" fullWidth value={product.imageUrl} onChange={handleChange} required />

          {product.sizes.map((size, index) => (
            <div key={index} className="flex gap-4 w-full">
              <TextField label="Size" value={size.name} disabled fullWidth />
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                fullWidth
                value={size.quantity}
                onChange={(e) => handleSizeChange(index, e)}
                required
              />
            </div>
          ))}
          
          <TextField label="Total Quantity" required name="quantity" fullWidth value={product.quantity} disabled />

          <TextField select label="Top Level Category" name="topLevelCategory" fullWidth onChange={handleChange} required>
            <MenuItem value="Men">Men</MenuItem>
            <MenuItem value="Women">Women</MenuItem>
            <MenuItem value="Kids">Kids</MenuItem>
          </TextField>

          <TextField select label="Second Level Category" name="secondLevelCategory" fullWidth onChange={handleChange} required>
            <MenuItem value="Formal">Formal</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
            <MenuItem value="Party Wear">Party Wear</MenuItem>
            <MenuItem value="Wedding Dresses">Wedding Dresses</MenuItem>
          </TextField>

          <TextField select label="Third Level Category" name="thirdLevelCategory" fullWidth onChange={handleChange} required>
            <MenuItem value="Shirts">Shirts</MenuItem>
            <MenuItem value="Jeans">Jeans</MenuItem>
            <MenuItem value="Kurta">Kurta</MenuItem>
            <MenuItem value="Kameez">Kameez</MenuItem>
          </TextField>
          
          <Button type="submit" variant="contained"fullWidth className="mt-5 bg-[#01518C]">
            Add Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
