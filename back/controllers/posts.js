//appel du plugin et du code pour le bon fonctionnement du controlleur
//const Sauce = require('../models/post');
const mysql = require('mysql');
//const fs = require('fs');

const baseDeDonnees = mysql.createConnection({host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database : "groupamania"});

//fonction permettant de créer une sauce
exports.createPost = (req, res, next) => {
  baseDeDonnees.query("INSERT INTO `topics`(`titre`, `article`, `utilisateur_id`, `date_creation`, `date_dernier_com`) VALUES (?,?,?,NOW(),NOW())",
  [req.body.titre, req.body.text, req.auth.userId], function (err, user) {
    if(err) throw err;
    res.status(201).json({ message: 'Article crée !' })
    })
}

//fonction permettant d'obtenir un tableau contenant les information des différentes sauces de l'API
exports.getAllPosts = (req, res, next) => {
  baseDeDonnees.query("SELECT `topics`.`id` AS topicsId, `titre`, `article`, `utilisateur_id`, `date_creation`, `date_dernier_com`, `admin_utilisateur_id`, `date_modif_admin`,`pseudo`,`photo_url` FROM `topics` INNER JOIN `utilisateurs` ON `utilisateurs`.`id`= `topics`.`utilisateur_id` ORDER BY `date_dernier_com` DESC",
  function (err, topics) {
    if(err) throw err;
    res.status(200).json(topics);
  })
};

//fonction permettant de modifié une sauce si l'utilisateur est le créateur de la sauce
exports.modifyPost = (req, res, next) => {
  if(admin){
//gestion admin
  }else{
    if(req.auth.userId !== req.body.utilisateur_id){
      res.status(403).json({error: new Error('Unauthorized request!')});
    }else{
      baseDeDonnees.query("UPDATE `topics` SET `titre`= ?,`article`=?,`date_creation`= NOW() WHERE `id` = ?"
      ,[req.body.titre, req.body.text, req.body.postId], function (err, topics) {
      if(err) throw err;
      res.status(200).json({ message: 'Article modifié !' });
      })
    }  
  }  
};
//fonction permettant de supprimer une sauce si l'utilisateur est le créateur de la sauce
exports.deletePost = (req, res, next) => {
  if(admin){
//gestion admin
  }else{
    if(req.auth.userId !== req.body.utilisateur_id){
      res.status(403).json({error: new Error('Unauthorized request!')});
    }else{
      baseDeDonnees.query("DELETE FROM `topics` WHERE `id`=?"
      ,[req.body.postId], function (err, topics) {
      if(err) throw err;
      res.status(200).json({ message: 'Article supprimé !' });
      })
    }  
  }
};
/*
//fonction permettant d'obtenir les information d'une sauce dans l'API
exports.getOnePost = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
  };

//fonction permettant la gestion des likes/dislikes d'une sauce
exports.likePost = (req, res, next) =>{
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {
    if (!sauce) {
      res.status(404).json({error: new Error('No such sauce!')});
    }
    //remise à zéro du like
    if(req.body.like === 0){
      if(sauce.usersDisliked.indexOf(req.body.userId)!==-1){
        sauce.dislikes--;
        sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId),1);
      }
      if(sauce.usersLiked.indexOf(req.body.userId)!==-1){
        sauce.likes--;
        sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId),1);
      }
    }
    //ajout d'un like
    if(req.body.like === 1){
      sauce.likes++;
      sauce.usersLiked.push(req.body.userId);
    }
    //ajout d'un dislike
    if(req.body.like === -1){
      sauce.dislikes++;
      sauce.usersDisliked.push(req.body.userId);
    }
    Sauce.updateOne({_id: req.params.id}, sauce)
    .then(() => {
      res.status(201).json({message: 'Likes updated'});
    })
    .catch((error) => {
      res.status(401).json({ error: error });
    });
  })
  .catch((error) => {
    res.status(400).json({ error: error });
  });
};*/