const ProductService = require("../Services/ProductService");

//* CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = await ProductService.createProduct(req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

//* UPDATE PRODUCT
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const updatedProduct = await ProductService.updateProduct(
      productId,
      req.body
    );
    return res.status(201).send(updatedProduct);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
//* FIND PRODUCT BY ID
const findProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductService.findProductById(productId);
    return res.status(201).send(product);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//* GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    console.log("Request Query Parameters: ", req.query);
    const products = await ProductService.getAllProducts(req.query);
    return res.status(201).send(products);
  } catch (error) {
    console.error("Error in getAllProducts:", error.message);
    res.status(500).send({ error: error.message });
  }
};

//* DELETE PRODUCT
const deleteProduct = async (req, res) => {
  console.log('request for delete:', req)
  const productId = req.params.id;

  try {
    const product = await ProductService.deleteProduct(productId);
    return res
      .status(201)
      .send({ product, message: "Product deleted successfully", productId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//* CREATE MULTIPLE PRODUCTS
const createMultipleProducts = async (req, res) => {
  try {
    const products = await ProductService.createMultipleProducts(req.body);
    return res
      .status(201)
      .send({ message: "Products created successfully", products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

async function fetchCategories(req, res) {
  try {
    const categories = await ProductService.getCategoriesWithProducts();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

const ProductController = {
  createProduct,
  findProductById,
  getAllProducts,
  createMultipleProducts,
  deleteProduct,
  updateProduct,
  fetchCategories
};
module.exports = ProductController;
