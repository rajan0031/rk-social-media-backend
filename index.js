const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

require('dotenv').config();
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
const mongoURI = process.env.MONGO_URI || "mongodb+srv://<username>:<password>@<cluster-address>/<dbname>?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Increase this value if necessary
    socketTimeoutMS: 45000 // Increase this value if necessary
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
