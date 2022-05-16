//appel des plugins et code pour le bon fonctionnement du routeur
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const commentsCtlr = require('../controllers/comments');
//const multer = require('../middleware/multer-config')

//gestion des différentes option d'implantation dans l'API
router.post('/', commentsCtlr.createComment);
router.put('/',auth, commentsCtlr.modifyComment);
router.delete('/', auth, commentsCtlr.deleteComment);


module.exports = router;