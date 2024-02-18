// App create
const express = require("express");
const app = express();

// Port Establish
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//Middlware Addition
app.use(express.json());
const fileUpload = require("express-fileupload"); // Ye server per Upload karta hai
app.use(fileUpload);

// DB Connection
const db = require("./config/database");
db.connect();

//Cloud Connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// API route
const Upload = require("./routes/FileUpload");
app.use("api/v1/upload", Upload);

// Activate Server
app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
