let cloudinary = require('cloudinary').v2; 

// cloudinary configuration
cloudinary.config({
  cloud_name: "hqi10looy",
  api_key: "817579995763326",
  api_secret: "vFQA6kea0I8-O0_ENSYYmGQW2vs"
});

module.exports = cloudinary;