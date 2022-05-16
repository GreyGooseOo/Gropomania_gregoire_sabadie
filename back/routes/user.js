//appel des plugins et code pour le bon fonctionnement du routeur
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')


//gestion de création/identification de compte
router.post('/photo', multer, userCtrl.photo);
router.post('/signup', multer, userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/getsignup', userCtrl.getSignup);
router.delete('/delete', userCtrl.deleteUser);


module.exports = router;