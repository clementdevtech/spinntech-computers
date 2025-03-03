const multer = require("multer");
const path = require("path");
const fs = require("fs");
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

// Ensure the frontend assets folder exists
const uploadPath = path.join(__dirname, "../../frontend/src/assets/products/");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."), false);
    }
    cb(null, true);
  },
});


module.exports = upload;
