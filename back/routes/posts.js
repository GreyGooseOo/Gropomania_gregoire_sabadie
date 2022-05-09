//appel des plugins et code pour le bon fonctionnement du routeur
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const postsCtlr = require('../controllers/posts');
//const multer = require('../middleware/multer-config')

//gestion des différentes option d'implantation dans l'API
router.post('/',auth, postsCtlr.createPost);
router.post('/getposts',auth, postsCtlr.getAllPosts);
router.put('/',auth, postsCtlr.modifyPost);
router.delete('/:id', auth, postsCtlr.deletePost);
/*router.get('/', auth, postsCtlr.getAllSauces);
router.post('/:id/like',auth, postsCtlr.likeSauce);*/

module.exports = router;