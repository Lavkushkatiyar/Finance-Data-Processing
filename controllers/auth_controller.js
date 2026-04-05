const { getToken, isValidUser, addNewUser } = require("../utils");

const registerHandler = async (req, res) => {
  const { name, email, password } = req.validatedBody;
  try {
    const user = await addNewUser(name, email, password);

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

const loginHandler = async (req, res) => {
  const { email, password } = req.validatedBody;

  try {
    const user = await isValidUser(email, password);

    if (!user) {
      return res.status(401).json({
        error: "invalid credentials",
      });
    }

    const token = getToken(user);

    return res.json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error during login" });
  }
};

module.exports = {
  registerHandler,
  loginHandler,
};
