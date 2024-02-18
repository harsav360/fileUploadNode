const File = require("../models/File");

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
