const express = require('express');
const bookCtrl = require('../controllers/book')
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config')


router.get('/',  bookCtrl.getAllBooks);
router.post('/', auth, multer,  bookCtrl.createBook);
router.get('/bestrating', bookCtrl.bestRatedBooks);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth , bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.bookRating);

module.exports = router;