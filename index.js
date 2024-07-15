const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();

require('dotenv').config();

// start of my web socket implimentations
const socket = require("socket.io");
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/comments");
const userProfileRoutes =
    require("./routes/userProfileRoutes");
const likesRoutes = require("./routes/blogLikesCount");
const messageRoutes = require("./routes/directMessage");
const followRoutes = require("./routes/follow Routes/followRoutes")

const messageEditAndDeleteRoute = require("./routes/message_edit_and_delete_routes/message_edit_and_delete_route");

const searchResultsRoutes = require("./routes/searchResultsRoutes/searchResultsRoutes");

const recentMessageRoutes = require("./routes/recentMessagesRoutes/recentMessagesRoutes");

const videoCallRoutes = require("./routes/VideoCallApiRoutes/VideoCallApiRoutes")
// this is the api routes for the adding the reply to a comments
const CommentsReplyRoutes = require("./routes/CommentsReplyRoutes/CommentsReplyRoutes");
// this is the api route for the adding the rply for a reply
const replyForReplyRoutes = require("./routes/ReplyForReplyApiRoutes/ReplyForReplyApiRoutes");
// this is the GroupChatRoomMessage routes for handling all types of edit add update and delete the data

const groupChatRoomMessagesRoutes = require("./routes/GroupChatRoomBackendRoutes/GroupChatRoomBackendRoutes");

// this is the api routes for the handling the chats and messages in the groups and all in my social media brother

const groupMessagesRoutes = require("./routes/GroupMessagesBackedRoutes/GroupMessagesBackedRoutes");

// this is the api routes for handling the saving post in the user profile

const AddPostsToUserProfileRoutes = require("./routes/SavingPostsBackendApiRoutes/SavingPostsBackendApiRoutes");





const port = process.env.PORT || 8001;

const registerRoute = require("./routes/SignupRoutes/SignupRoutes");
const loginRoute = require("./routes/LoginRoutes/LoginRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", registerRoute);
app.use("/", loginRoute);


// start  routes from the blog



// Adjust the registration route
app.use("/", userRoutes); // Change the route path to /api

// api for blogs routes;

app.use("/", blogRoutes);

// api for the comments in my blogs

app.use("/", commentRoutes);



// api for the useProfile in the system in my blogs

app.use("/", userProfileRoutes);


// api for the handling the likes of the and dislikes of the blog

app.use('/', likesRoutes);



// api for the handling the message between users
app.use('/', messageRoutes);

// api for handling the messages between two users

app.use('/', messageEditAndDeleteRoute);

// this is my followers routes

app.use('/', followRoutes);

// this is the my search results routes

app.use('/', searchResultsRoutes);


// this is the my search results routes

app.use('/', recentMessageRoutes);

// this is the my video call feature routes

app.use('/', videoCallRoutes);

// this is the my COmments reply routes for the receiving my end points on the backend 
app.use('/', CommentsReplyRoutes);

// this is for the handlng the reply fo reply routes

app.use('/', replyForReplyRoutes);

// this is for handling the groupChatRommMessages routes
app.use('/', groupChatRoomMessagesRoutes);

// this is the for handling the group chat and messages functionality in the group

app.use('/', groupMessagesRoutes);


// this is the for handling the saved posts
// in the profile sections of the user

app.use('/', AddPostsToUserProfileRoutes);



// end of the routes from the blog 

app.get("/", (req, res) => {
    res.send("Hello world, this is my get route brother");
});

// Database connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://raykushwaha0031:C1k4maJXzH2vAmh4@blog.zlf5agh.mongodb.net/Blog";

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
