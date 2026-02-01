const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dgb0mvtpw",
  api_key: "725624335758549",
  api_secret: "*********************************"
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "parfums",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

module.exports = multer({ storage });
