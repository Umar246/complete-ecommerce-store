const UserService = require("../Services/UserService");
const jwtProvider = require("../Utils/jwtProvider");

//* GET USER PROFILE
const getUserProfile = async (req, res) => {
  try {
    let jwt = req.headers.authorization;

    // Check if the token has the 'Bearer' prefix, then extract the token part
    // if (jwt && jwt.startsWith("Bearer ")) {
    //   jwt = jwt.split(" ")[1]; // Extract the token part after 'Bearer '
    // }

    if (!jwt) {
      return res.status(404).send({ message: "token not found" });
    }

    const user = await UserService.getUserProfileByToken(jwt);

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//* GET ALL USERS CONTROLLER
const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();

    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await UserService.updateUserRole({ userId, role });
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//* DELETE USER CONTROLLER
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserService.deleteUser(userId);
    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const UserController = {
  getAllUsers,
  getUserProfile,
  updateRole,
  deleteUser,
};

module.exports = UserController;
