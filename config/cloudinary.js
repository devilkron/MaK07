const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "depfo3qmn",
  api_key: "255939885348372",
  api_secret: process.env.CLOUDINARY_SECRET,
});
module.exports = cloudinary;
