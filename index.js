const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("hello world")
});

app.listen(8000, (err) => {
    console.log("server is listening at port 8000");
});