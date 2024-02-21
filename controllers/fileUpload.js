const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
// LocalfileUpload -> Handler Function

exports.localFileUpload = async (req, res) => {
  try {
    // Fetch File
    const file = req.files.file;
    console.log("Aa gyi Bhai Aa gyi, File Aa gyi -> ", file);
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("Path -> ", path);
    file.mv(path, (err) => {
      console.log(err);
    });
    res.status(200).json({
      success: true,
      message: "Local file Uploaded Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Bhai code fatt gya hai",
    });
  }
};

function isFileTypeSupported(type, supprotedTypes) {
  return supprotedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
// Image Upload Handler

exports.imageUpload = async (req, res) => {
  try {
    // Data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // Validation for supproted types
    const supprotedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supprotedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // Upload to Cloudinary
    const response = await uploadFileToCloudinary(file, "FileUploadNode");
    console.log(response);
    // Save entry in Database
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Video Upload Handler

exports.videoUpload = async (req, res) => {
  try {
    // Data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;

    // Validation for supproted types
    const supprotedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();
    console.log(fileType);

    // Todo : Add upper limit of 5 MB to video
    if (!isFileTypeSupported(fileType, supprotedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // Upload to Cloudinary
    const response = await uploadFileToCloudinary(file, "FileUploadNode");
    console.log(response);

    // Save entry in Database
    const fileData = await File.create({
      name,
      tags,
      email,
      videoUrl: response.secure_url,
    });

    res.json({
      success: true,
      videoUrl: response.secure_url,
      message: "Video Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    // Data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // Validation for supproted types
    const supprotedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supprotedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // Upload to Cloudinary
    const response = await uploadFileToCloudinary(
      file,
      "FileUploadNode",
      quality
    );
    console.log(response);
    // Save entry in Database
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
