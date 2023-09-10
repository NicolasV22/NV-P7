const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user')


/* Routes user, connexion et inscription */

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;