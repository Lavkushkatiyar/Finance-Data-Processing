require("dotenv").config();

const express = require("express");
const authenticate = require("./middleware/authenticate");
const authorizeRoles = require("./middleware/authorize_Roles");

const recordRoutes = require("./routes/record.routes");
const {
  registerHandler,
  loginHandler,
} = require("./controllers/auth_controller");

const { seedAdmin } = require("./utils");
const ROLES = require("./constant");

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const authRouter = express.Router();
const userRouter = express.Router();
const protectedRouter = express.Router();


authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);


userRouter.get("/me", authenticate, (req, res) => {
  return res.status(200).json({
    message: "User fetched successfully",
    user: req.user,
  });
});


protectedRouter.use(authenticate);

protectedRouter.get("/test", (req, res) => {
  console.log("Test route accessed");
  return res.json({ user: req.user });
});

protectedRouter.get(
  "/admin-only",
  authorizeRoles([ROLES.ADMIN]),
  (req, res) => {
    return res.json({ message: "Admin access granted" });
  }
);

protectedRouter.get(
  "/analytics",
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST]),
  (req, res) => {
    return res.json({ message: "Analytics data" });
  }
);

protectedRouter.get(
  "/records",
  authorizeRoles([ROLES.ADMIN, ROLES.ANALYST, ROLES.VIEWER]),
  (req, res) => {
    return res.json({ message: "Records accessible" });
  }
);


app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/api", protectedRouter);
app.use("/records", recordRoutes);


const startServer = async () => {
  try {
    await seedAdmin();
    console.log("Admin seeded");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
};

startServer();