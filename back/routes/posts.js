//appel des plugins et code pour le bon fonctionnement du routeur
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const postsCtlr = require('../controllers/posts');


//gestion des différentes option d'implantation dans l'API
router.post('/',auth, postsCtlr.createPost);
router.post('/getposts', postsCtlr.getAllPosts);
router.put('/',auth, postsCtlr.modifyPost);
router.delete('/:id', auth, postsCtlr.deletePost);

module.exports = router;