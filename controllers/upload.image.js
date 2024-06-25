/** load library 'multer' and 'path' */
const multer = require(`multer`);
const path = require(`path`);
/** storage configuration */
const storage = multer.diskStorage({
  /** define storage folder */
  destination: (req, file, cb) => {
    cb(null, `./image`);
  },
  /** define filename for upload file */
  filename: (req, file, cb) => {
    cb(null, `cover-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({
  /** storage configuration */
  storage: storage,
  /** filter uploaded file */
  fileFilter: (req, file, cb) => {

    const acceptedType = [`image/jpg`, `image/jpeg`, `image/png`];
    if (!acceptedType.includes(file.mimetype)) {
      cb(null, false); 
      return cb(`Invalid file type (${file.mimetype})`);
    }
  u
    const fileSize = req.headers[`content-length`];
    const maxSize = 1 * 1024 * 1024;
    if (fileSize > maxSize) {
      cb(null, false); 
      return cb(`File size is too large`);
    }
    cb(null, true);
  },
});
module.exports = upload;
