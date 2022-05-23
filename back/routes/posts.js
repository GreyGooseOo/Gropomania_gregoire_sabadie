//appel des plugins et code pour le bon fonctionnement du routeur
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const postsCtlr = require('../controllers/posts');
const images = require('../middleware/recup_images')


//gestion des différentes option d'implantation des posts dans l'API
router.post('/', auth, images, postsCtlr.createPost);
router.post('/getposts', postsCtlr.getAllPosts);
router.put('/', auth, images, postsCtlr.modifyPost);
router.delete('/:id', auth, postsCtlr.deletePost);

module.exports = router;