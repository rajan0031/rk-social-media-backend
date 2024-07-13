const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const port = process.env.port || 8000;

require('dotenv').config();
const registerRoute = require("./routes/SignupRoutes/SignupRoutes");
const loginRoutes = require("./routes/LoginRoutes/LoginRoutes")



app.use(cors());
app.use(express.json());
// Use express.urlencoded middleware
app.use(express.urlencoded({ extended: true }));


app.use("/", registerRoute);
app.use("/", loginRoutes);

app.get("/", (req, res) => {
    res.send("hello world this is my get route brother");
});



// // database connections 
mongoose.connect("mongodb+srv://raykushwaha0031:C1k4maJXzH2vAmh4@blog.zlf5agh.mongodb.net/ProjectX").then(() => {
    console.log("Database connected succesfully")
}).catch((err) => {
    console.log(err)
});




app.listen(port, (err) => {
    console.log("server is listening at port 8000");
});