const Users = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwtProvider = require("../Utils/jwtProvider");

//* CREATE USER
const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password, role, mobile } = userData;

    const isUserExisted = await Users.findOne({ email });

    if (isUserExisted) {
      throw new Error("User already existed with email : ", email);
    }

    password = await bcrypt.hash(password, 8);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password,
      role,
      mobile,
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* FIND USER BY ID
const findUserById = async (userId) => {
  try {
    const user = await Users.findById(userId);
    //.populate("address");

    if (!user) {
      throw new Error("User not found with id : ", userId);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* FIND USER BY EMAIL
const findUserByEmail = async (email) => {
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      throw new Error("User not found with email : ", email);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* GET USER PROFILE BY TOKEN
const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);

    const user = Users.findById(userId).populate("address");

    if (!user) {
      throw new Error("User not found with Id ", userId);
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* GET ALL USERS
const getAllUsers = async () => {
  try {
    const users = await Users.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* UPDATE USER ROLE
const updateUserRole = async ({ userId, role }) => {
  try {
    // Validate role
    const validRoles = ["ADMIN", "CUSTOMER"];
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error(`User not found with id: ${userId}`);
    }

    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

//* DELETE USER
const deleteUser = async (userId) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error(`User not found with id: ${userId}`);
    }
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};


const UserService = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  getUserProfileByToken,
  updateUserRole,
  deleteUser,
  
};
module.exports = UserService;
