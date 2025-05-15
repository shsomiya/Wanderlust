const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,  // Correct casing
    api_key: process.env.CLOUD_API_KEY,  // Correct casing
    api_secret: process.env.CLOUD_SECRET,  // Correct casing
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Wanderlust-DEV',  // Your folder name for uploaded images
      allowed_formats: ['png', 'jpg', 'jpeg'],  // Corrected to plural 'allowed_formats'
    },
});

module.exports = {
    cloudinary,
    storage,
};
