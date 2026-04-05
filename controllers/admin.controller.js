const {
  getUserService,
  deleteUserService,
} = require("../services/adminService");
const { addNewUser } = require("../utils");

const createUserController = async (req, res) => {
  const body = req.body;
  const keys = Object.keys(body);
  const allowedKeys = ["name", "email", "password", "role"];
  const isValid = keys.every((key) => allowedKeys.includes(key));
  if (!isValid || keys.length !== allowedKeys.length) {
    return res.status(400).json({
      error: "body must contain only name, email, password and role",
    });
  }
  try {
    const user = await addNewUser(
      body.name,
      body.email,
      body.password,
      body.role,
    );
    return res.status(201).json({ id: user.id, msg: "user created" });
  } catch (error) {
    console.error("Registration error:", error.message);
    if (error.message === "user exists") {
      return res.status(409).json({ error: "User already exists" });
    }
    return res
      .status(500)
      .json({ error: "Internal server error during registration" });
  }
};
const getUserController = async (req, res) => {
  try {
    const users = await getUserService();
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await deleteUserService(userId);
    res.status(200).json({ data: deletedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUserController,
  getUserController,
  deleteUserController,
};
