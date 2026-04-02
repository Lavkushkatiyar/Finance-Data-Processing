const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());


app.get("/", (req, res) => {
    res.send("apps start");
});


app.post("/", (req, res) => {
    console.log(req.body)

    res.json(req.body);
    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});