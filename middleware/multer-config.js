const multer = require('multer');
const sharp = require('sharp');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp' // Ajoutez le type MIME pour les fichiers WebP
};

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        const isValidMimeType = MIME_TYPES[file.mimetype];
        if (isValidMimeType) {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type.'));
        }
    }
});

module.exports = upload.single('image');
