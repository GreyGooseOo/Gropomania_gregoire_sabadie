//appel des plugins et code pour le bon fonctionnement du routeur
/*const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const postsCtlr = require('../controllers/posts');
const multer = require('../middleware/multer-config')

//gestion des différentes option d'implantation dans l'API
router.post('/', auth, multer, postsCtlr.createSauce);
router.get('/:id', auth, postsCtlr.getOneSauce);
router.put('/:id', auth, multer, postsCtlr.modifySauce);
router.delete('/:id', auth, postsCtlr.deleteSauce);
router.get('/', auth, postsCtlr.getAllSauces);
router.post('/:id/like',auth, postsCtlr.likeSauce);

module.exports = router;*/