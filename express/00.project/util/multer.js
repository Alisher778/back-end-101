const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const name = `${req.body.name}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, name);
  },
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  }
})
// const upload = multer({ dest: 'public/uploads' });
const upload = multer({ storage });

module.exports = upload;