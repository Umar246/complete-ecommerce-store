import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createProduct } from "../../Features/productSlice";

// src/config/categoryData.js

export const categoryData = {
  women: {
    clothing: [
      { name: "Tops", value: "top" },
      { name: "Dresses", value: "women_dress" },
      { name: "Women Jeans", value: "women_jeans" },
      { name: "Lengha Choli", value: "lengha_choli" },
      { name: "Sweaters", value: "sweater" },
      { name: "T-Shirts", value: "t-shirt" },
      { name: "Jackets", value: "jacket" },
      { name: "Gouns", value: "gouns" },
      { name: "Sarees", value: "saree" },
      { name: "Kurtas", value: "kurtas" },
    ],
    accessories: [
      { name: "Watches", value: "watch" },
      { name: "Wallets", value: "wallet" },
      { name: "Bags", value: "bag" },
      { name: "Sunglasses", value: "sunglasse" },
      { name: "Hats", value: "hat" },
      { name: "Belts", value: "belt" },
    ],
    brands: [
      { name: "Full Nelson", value: "full_nelson" },
      { name: "My Way", value: "my_way" },
      { name: "Re-Arranged", value: "re_arranged" },
      { name: "Counterfeit", value: "counterfeit" },
      { name: "Significant Other", value: "significant_other" },
    ],
  },
  men: {
    clothing: [
      { name: "Mens Kurtas", value: "mens_kurta" },
      { name: "Shirt", value: "mens_shirt" },
      { name: "Men Jeans", value: "men_jeans" },
      { name: "Sweaters", value: "mens_sweater" },
      { name: "T-Shirts", value: "mens_t-shirt" },
      { name: "Jackets", value: "mens_jacket" },
      { name: "Activewear", value: "mens_activewear" },
    ],
    accessories: [
      { name: "Watches", value: "mens_watch" },
      { name: "Wallets", value: "mens_wallet" },
      { name: "Bags", value: "mens_bag" },
      { name: "Sunglasses", value: "mens_sunglasses" },
      { name: "Hats", value: "mens_hats" },
      { name: "Belts", value: "mens_belts" },
    ],
    brands: [
      { name: "Re-Arranged", value: "re-arranged" },
      { name: "Counterfeit", value: "counterfeit" },
      { name: "Full Nelson", value: "full_nelson" },
      { name: "My Way", value: "my_way" },
    ],
  },
};


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
      { name: "L", quantity: null },
    ],
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
  });
  const [secondLevelOptions, setSecondLevelOptions] = useState([]);
  const [thirdLevelOptions, setThirdLevelOptions] = useState([]);
  const dispatch = useDispatch();
  // const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "topLevelCategory") {
      const secondLevels = Object.keys(categoryData[value] || {});
      setSecondLevelOptions(secondLevels);
      setThirdLevelOptions([]);
      setProduct({
        ...product,
        topLevelCategory: value,
        secondLevelCategory: "",
        thirdLevelCategory: "",
      });
    } else if (name === "secondLevelCategory") {
      const thirdLevels = categoryData[product.topLevelCategory]?.[value] || [];
      setThirdLevelOptions(thirdLevels);
      setProduct({
        ...product,
        secondLevelCategory: value,
        thirdLevelCategory: "",
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
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
        <Typography
          variant="h5"
          gutterBottom
          className="pb-5 font-bold text-gray-800"
        >
          Add New Product
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={product.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            value={product.description}
            onChange={handleChange}
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            value={product.price}
            onChange={handleChange}
            required
          />
          <TextField
            label="Discounted Price"
            name="discountedPrice"
            type="number"
            fullWidth
            value={product.discountedPrice}
            onChange={handleChange}
            required
          />
          <TextField
            label="Discount Percentage"
            name="discountedPecentage"
            type="number"
            fullWidth
            value={product.discountedPecentage}
            onChange={handleChange}
            required
          />
          <TextField
            label="Brand"
            name="brand"
            fullWidth
            value={product.brand}
            onChange={handleChange}
            required
          />
          <TextField
            label="Color"
            name="color"
            fullWidth
            value={product.color}
            onChange={handleChange}
            required
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            fullWidth
            value={product.imageUrl}
            onChange={handleChange}
            required
          />

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

          <TextField
            label="Total Quantity"
            required
            name="quantity"
            fullWidth
            value={product.quantity}
            disabled
          />

          <TextField
            select
            label="Top Level Category"
            name="topLevelCategory"
            fullWidth
            onChange={handleChange}
            value={product.topLevelCategory}
            required
          >
            <MenuItem value="men">Men</MenuItem>
            <MenuItem value="women">Women</MenuItem>
          </TextField>

          <TextField
            select
            label="Second Level Category"
            name="secondLevelCategory"
            fullWidth
            onChange={handleChange}
            value={product.secondLevelCategory}
            required
            disabled={!product.topLevelCategory}
          >
            {secondLevelOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {/* {option.charAt(0).toUpperCase() + option.slice(1)} */}
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Third Level Category"
            name="thirdLevelCategory"
            fullWidth
            onChange={handleChange}
            value={product.thirdLevelCategory}
            required
            disabled={!product.secondLevelCategory}
          >
            {thirdLevelOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="mt-5 bg-[#01518C]"
          >
            Add Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
