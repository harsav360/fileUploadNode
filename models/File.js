const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// Post Middleware

fileSchema.post("save", async function (doc) {
  try {
    console.log("DOC", doc);

    // Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send Mail
    const info = await transporter.sendMail({
      from: `Harsav Group of Companies`, // sender address
      to: doc.email, // list of receivers
      subject: "New File Uploaded on Cloudinary", // Subject line
      html: `<h2>Hello Pardhan</h2> <p>Padhne Likhne ki umar me File upload ki ja rhi hai, File Yhan per hai: <a href = "${doc.imageUrl}">${doc.imageUrl}</a></p>`, // html body
    });

    console.log("Information", info);
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
