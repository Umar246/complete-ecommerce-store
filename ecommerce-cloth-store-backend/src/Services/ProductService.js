const Categories = require("../Models/categoryModel");
const Products = require("../Models/productModel");

//* CREATE NEW PRODUCT
const createProduct = async (reqData) => {
  //? Level 1
  let topLevel = await Categories.findOne({ name: reqData.topLevelCategory });

  if (!topLevel) {
    topLevel = new Categories({
      name: reqData.topLevelCategory,
      level: 1,
    });
    topLevel = await topLevel.save(); // Save the category
  }

  //? Level 2
  let secondLevel = await Categories.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id.toString(),
  });

  if (!secondLevel) {
    secondLevel = new Categories({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id.toString(),
      level: 2,
    });
    secondLevel = await secondLevel.save(); // Save the category
  }

  //? Level 3
  let thirdLevel = await Categories.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id.toString(),
    level: 3,
  });

  if (!thirdLevel) {
    thirdLevel = new Categories({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id.toString(),
      level: 3,
    });
    thirdLevel = await thirdLevel.save(); // Save the category
  }

  //? Categories are ready, now we are creating product

  const product = new Products({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountedPecentage: reqData.discountedPecentage,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    sizes: reqData.sizes,
    quantity: reqData.quantity,
    numRatings: reqData.numRatings,
    category: thirdLevel._id.toString(),
  });

  const savedProduct = await product.save();

  //? Populate category before returning
  return await savedProduct.populate("category");
};

//* DELETE PRODUCT
const deleteProduct = async (productId) => {
  const product = await findProductById(productId);

  const deletedProduct = await Products.findByIdAndDelete(product._id);

  return { message: "Product deleted successfully", deletedProduct };
};

//* UPDATE PRODUCT
const updateProduct = async (productId, reqData) => {
  const updatedProduct = await Products.findByIdAndUpdate(productId, reqData);
  return updatedProduct;
};

//* FIND PRODUCT BY ID
const findProductById = async (productId) => {
  const product = await Products.findById(productId)
    .populate("category")
    .exec();

  if (!product) {
    throw new Error("Product not found: ", productId);
  }

  return product;
};

//* CREATE MULTIPLE PRODUCTS
const createMultipleProducts = async (products) => {
  for (let product of products) {
    await createProduct(product);
  }
};

//* GET ALL PRODUCTS WITH FILTERS
// productService.js
const getAllProducts = async (reqQuery) => {
  console.log("Received query:", reqQuery);

  let {
    category,
    color,
    sizes = "",
    minPrice = 0,
    maxPrice = Infinity,
    minDiscount = 0,
    sort = "price_low",
    stock,
    pageNumber = 1,
    pageSize = 10,
  } = reqQuery;
  console.log("Filtering by category slug:", category);

  if (pageNumber < 1) pageNumber = 1;

  let query = Products.find().populate("category");

  // — Category filter by slug now —
  if (category) {
    // Enforce lowercase & trimmed
    if (category) category = category.trim().toLowerCase();
    const existedCategory = await Categories.findOne({ name: category });
    if (existedCategory) {
      query = query.where("category").equals(existedCategory._id);
    } else {
      return { content: [], currentPage: pageNumber, totalPages: 0 };
    }
  }

  // — Color filter —
  if (color && color.trim() !== "") {
    const colorSet = new Set(
      color.split(",").map((c) => c.trim().toLowerCase())
    );
    const regex = new RegExp([...colorSet].join("|"), "i");
    query = query.where("color").regex(regex);
  }

  // — Sizes filter —
  if (sizes && sizes.trim() !== "") {
    const sizesSet = new Set(sizes.split(",").map((s) => s.trim()));
    query = query.where("sizes.name").in([...sizesSet]);
  }

  // — Price range filter —
  if (minPrice > 0 || maxPrice < Infinity) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  // — Minimum discount filter —
  if (minDiscount > 0) {
    let maxDiscount = null;
    switch (minDiscount) {
      case 10:
        maxDiscount = 19.99;
        break;
      case 20:
        maxDiscount = 29.99;
        break;
      case 30:
        maxDiscount = 39.99;
        break;
      case 40:
        maxDiscount = 49.99;
        break;
      case 50:
        maxDiscount = 59.99;
        break;
      case 60:
        maxDiscount = 69.99;
        break;
      case 70:
        maxDiscount = 79.99;
        break;
      case 80:
        maxDiscount = 100;
        break;
      default:
        maxDiscount = null;
    }
    if (maxDiscount) {
      query = query
        .where("discountedPecentage")
        .gte(minDiscount)
        .lte(maxDiscount);
    } else {
      query = query.where("discountedPecentage").gte(minDiscount);
    }
  }

  // — Stock filter —
  if (stock === "in_stock") {
    query = query.where("quantity").gt(0);
  } else if (stock === "out_of_stock") {
    query = query.where("quantity").lt(1);
  }

  // — Sorting —
  const sortOptions = {
    price_high: { discountedPrice: -1 },
    price_low: { discountedPrice: 1 },
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
  };
  query = query.sort(sortOptions[sort] || { createdAt: -1 });

  // — Pagination using dynamic pageSize —
  const totalProducts = await Products.countDocuments(query);
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);

  const products = await query.exec();
  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: products, currentPage: pageNumber, totalPages };
};

async function getCategoriesWithProducts() {
  try {
    // 1) Find all distinct category ObjectIds used in the Products collection
    const usedCategoryIds = await Products.distinct("category");

    if (!usedCategoryIds || usedCategoryIds.length === 0) {
      return [];
    }

    // 2) Query the Categories collection for those IDs
    const categories = await Categories.find({
      _id: { $in: usedCategoryIds },
    })
      .select("name slug") // only return name and slug
      .sort({ name: 1 }); // sort alphabetically by name

    return categories;
  } catch (err) {
    console.error("Error in getCategoriesWithProducts:", err);
    throw new Error("Could not fetch categories with products");
  }
}

const ProductService = {
  createProduct,
  findProductById,
  createMultipleProducts,
  getCategoriesWithProducts,
  deleteProduct,
  updateProduct,
  getAllProducts,
};
module.exports = ProductService;
