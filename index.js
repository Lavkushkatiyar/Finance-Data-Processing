require("dotenv").config();
const express = require("express");

const {
  registerHandler,
  loginHandler,
} = require("./controllers/auth_controller");

const { seedAdmin } = require("./utils");

const app = express();
const port = 3000;
const router = express.Router();
app.use(express.json());

app.use(express.urlencoded({extended:true}))


app.get("/", (req, res) => {
  res.send("apps start");
});


app.post("/", (req, res) => {
    console.log(req.body)

    res.json(req.body);

});

router.post("/auth/register", registerHandler);
router.post("/auth/login", loginHandler);

app.use(router);

seedAdmin().then(() => {
  console.log("Admin seeded");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});