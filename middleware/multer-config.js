const multer = require('multer');
const sharp = require('sharp');


/* Middleware multer configuré de façon à accueilir les format JPG PNG ET WEBP lors de l'ajout / modification de l'image d'un livre */
/* Multer configuré en memoryStorage() afin de permettre la conversion des images en WEBP */

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp' 
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
