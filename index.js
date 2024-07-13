const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const registerRoute = require("./routes/SignupRoutes/SignupRoutes");
const loginRoutes = require("./routes/LoginRoutes/LoginRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", registerRoute);
app.use("/", loginRoutes);

app.get("/", (req, res) => {
    res.send("hello world this is my get route brother");
});

// Database connection
const mongoURI = "mongodb+srv://raykushwaha0031:C1k4maJXzH2vAmh4@blog.zlf5agh.mongodb.net/ProjectX";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
}).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Database connection error:", err);
});

app.listen(port, (err) => {
    if (err) {
        console.error("Server error:", err);
    } else {
        console.log(`Server is listening at http://localhost:${port}`);
    }
});
