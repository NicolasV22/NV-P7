const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')


/* Routes user, connexion et inscription */

router.post('/signup', userCtrl.signup);      /* Route d'inscription */
router.post('/login', userCtrl.login);     /* Route de connexion */

module.exports = router;