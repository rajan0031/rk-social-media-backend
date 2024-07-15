const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const registerRoute = require("./routes/SignupRoutes/SignupRoutes");
const loginRoute = require("./routes/LoginRoutes/LoginRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", registerRoute);
app.use("/", loginRoute);

app.get("/", (req, res) => {
    res.send("Hello world, this is my get route brother");
});

// Database connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://raykushwaha0031:C1k4maJXzH2vAmh4@blog.zlf5agh.mongodb.net/ProjectX";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1); // Exit process with failure
    }
};

// Start the server and connect to the database
const startServer = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use.`);
            process.exit(1); // Exit process with failure
        } else {
            console.error("Server error:", err);
        }
    });
};

startServer();
