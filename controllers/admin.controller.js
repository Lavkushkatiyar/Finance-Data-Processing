const {
  getUserService,
  deleteUserService,
  updateUserStatusService,
} = require("../services/adminService");
const { addNewUser } = require("../services/auth.service");

const createUserController = async (req, res) => {
  const { name, email, password, role } = req.validatedBody;

  try {
    const user = await addNewUser(name, email, password, role);

    return res.status(201).json({
      id: user.id,
      msg: "user created",
    });
  } catch (error) {
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

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const deleteUserController = async (req, res) => {
  const { id } = req.validatedParams;

  try {
    const deletedUser = await deleteUserService(id);

    return res.status(200).json({
      data: deletedUser,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const updateUserStatusController = async (req, res) => {
  const { id } = req.validatedParams;
  const { status } = req.validatedBody;

  try {
    const updatedUser = await updateUserStatusService(id, status);

    return res.status(200).json({
      data: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  createUserController,
  getUserController,
  deleteUserController,
  updateUserStatusController,
};
