const multer = require('multer');
const path = require('path');
// const { UnsupportedMediaType } = require('http-errors');
// require('dotenv').config();

const tempDir = path.join(__dirname, '../', 'images_tmp');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: 5242880 },
});

module.exports = upload;
