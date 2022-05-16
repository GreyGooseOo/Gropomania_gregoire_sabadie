//appel des plugins et code pour le bon fonctionnement du routeur
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const images = require('../middleware/recup_images')


//gestion de création/identification de compte
router.post('/signup', images, userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/getsignup', userCtrl.getSignup);
router.delete('/delete', userCtrl.deleteUser);


module.exports = router;