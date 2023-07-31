const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'documents') {
            cb(null, 'uploads/documents');
        } else if (file.fieldname === 'profileImage') {
            cb(null, 'uploads/profiles');
        } else if (file.fieldname === 'productImage') {
            cb(null, 'uploads/products');
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    },
});

const upload = multer({ storage });

module.exports = upload;
