const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

const registerRoute = require("./routes/SignupRoutes/SignupRoutes");
const loginRoutes = require("./routes/LoginRoutes/LoginRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/signup", registerRoute);
app.use("/api/login", loginRoutes);

app.get("/", (req, res) => {
    res.send("Hello world, this is my get route brother");
});

// Database connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://raykushwaha0031:C1k4maJXzH2vAmh4@blog.zlf5agh.mongodb.net/ProjectX";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1); // Exit process with failure
    }
};

// MongoDB event listeners for better debugging
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB Cluster');
});

mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Close the Mongoose connection on Ctrl+C
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed on app termination');
    process.exit(0);
});

// Start the server and connect to the database
const startServer = async () => {
    await connectDB();

    app.listen(port, (err) => {
        if (err) {
            console.error("Server error:", err);
        } else {
            console.log(`Server is listening at http://localhost:${port}`);
        }
    });
};

startServer();
