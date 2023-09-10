const express = require('express');
const bookCtrl = require('../controllers/book')
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config')

/* Router book -> import des controllers aux routes */
/* Intervention du middleware d'authentification dans les routes où il est requis (creation/modification/suppresion/notation d'un livre ) */
/* Intervention du middleware multer dans book post et put : il sert à gérer l'image envoyée, et dans la conversion de celle-ci via le controller */

router.get('/',  bookCtrl.getAllBooks);     /* route d'affichage de tous les livres */
router.post('/', auth, multer,  bookCtrl.createBook);     /* route d'ajout d'un livre */   
router.get('/bestrating', bookCtrl.bestRatedBooks);     /* route d'import des 3 meilleurs livre lors de l'ouverture d'un livre */
router.get('/:id', bookCtrl.getOneBook);     /* route d'affichage d'un seul livre lorsqu'on clique dessus */
router.put('/:id', auth, multer, bookCtrl.modifyBook);     /* route de modification d'un livre */
router.delete('/:id', auth , bookCtrl.deleteBook);     /* route de suppression d'un livre */
router.post('/:id/rating', auth, bookCtrl.bookRating);     /* route d'ajout d'une note à un livre par un user */

module.exports = router;