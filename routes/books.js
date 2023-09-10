const express = require('express');
const bookCtrl = require('../controllers/book')
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config')

/* Router book -> import des controllers aux routes */
/* Intervention du middleware d'authentification dans les routes où il est requis (creation/modification/suppresion/notation d'un livre ) */
/* Intervention du middleware multer dans book post et put : il sert à gérer l'image envoyée, et dans la conversion de celle-ci via le controller */

router.get('/',  bookCtrl.getAllBooks);
router.post('/', auth, multer,  bookCtrl.createBook);
router.get('/bestrating', bookCtrl.bestRatedBooks);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth , bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.bookRating);

module.exports = router;