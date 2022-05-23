//appel des plugins et code pour le bon fonctionnement du routeur
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const commentsCtlr = require('../controllers/comments');

//gestion des différentes option d'implantation des commentaires dans l'API
router.post('/', commentsCtlr.createComment);
router.put('/:id', auth, commentsCtlr.modifyComment);
router.delete('/delete/:id', auth, commentsCtlr.deleteComment);


module.exports = router;