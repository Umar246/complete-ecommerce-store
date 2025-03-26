const Cart = require("../Models/cartModel");
const CartItem = require("../Models/cartItemModel");
const Products = require("../Models/productModel");

//* CREATE NEW CART WITH USER (This function calls when register api calls)
const createCart = async (user) => {
  try {
    const cart = new Cart({ user });

    const createdCart = await cart.save();

    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* FIND USER's CART WITH USERID AND CALCULATE THE TOTAL AMOUNT
const findUserCartAndTotal = async (userId) => {
  try {
    let cart = await Cart.findOne({ user: userId }).populate("cartItems");

    if (!cart) {
      throw new Error("Cart not found for this user.");
    }

    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");

    cart.cartItems = cartItems || [];

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discount = totalPrice - totalDiscountedPrice;
    cart.totalDiscountedPrice = totalDiscountedPrice;

    // 🔥 Populate `cart.cartItems.product` to ensure product details are included
    await cart.populate("cartItems.product");

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* ADD TO CART / CREATE ITEM IN CART
const addToCart = async (userId, req) => {
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throw new Error("Cart not found for this user.");
    }

    const product = await Products.findById(req.productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = await new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });

      const createdCartItem = await cartItem.save();

      if (!cart.cartItems) {
        cart.cartItems = [];
      }

      cart.cartItems.push(createdCartItem);

      await cart.save();
    } else {
      return { message: "Item already in cart" };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const CartService = {
  createCart,
  findUserCartAndTotal,
  addToCart,
};
module.exports = CartService;
