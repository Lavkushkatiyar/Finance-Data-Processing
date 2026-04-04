require("dotenv").config();
const app = require("./app");
const { seedAdmin } = require("./utils");

const port = process.env.PORT || 3000;

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