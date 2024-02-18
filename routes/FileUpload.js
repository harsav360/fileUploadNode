const express = require("express");
const router = express.router();

const { localFileUpload } = require("../controllers/fileUpload");

// API Route
router.post("/localFileUpload", localFileUpload);

module.exports = router;
