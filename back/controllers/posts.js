//appel du plugin et du code pour le bon fonctionnement du controlleur
const mysql = require('mysql');

const baseDeDonnees = mysql.createConnection({host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database : "groupamania"});

//fonction permettant de créer une sauce
exports.createPost = (req, res, next) => {
  baseDeDonnees.query("INSERT INTO `topics`(`titre`, `article`, `utilisateur_id`, `date_creation`, `date_dernier_com`) VALUES (?,?,?,NOW(),NOW())",
  [req.body.titre, req.body.text, req.auth.userId], function (err, result) {
    if(err) throw err;
    res.status(201).json({ message: 'Article crée !' , isErr: false})
  })
}

//fonction permettant d'obtenir un tableau contenant les information des différentes sauces de l'API
exports.getAllPosts = (req, res, next) => {
  baseDeDonnees.query("SELECT `topics`.`id` AS topicId, `titre`, `article`, `utilisateur_id`, `date_creation`, `date_dernier_com`, `admin_utilisateur_id`, `date_modif_admin`,`pseudo`,`photo_url`, 0 AS isMyPost, null AS myComments FROM `topics` INNER JOIN `utilisateurs` ON `utilisateurs`.`id`= `topics`.`utilisateur_id` ORDER BY `date_dernier_com` DESC",
  function (err, topics) {
    if(err) throw err;

    topics.forEach(t => t.isMyPost = (req.auth.userId === t.utilisateur_id));

    baseDeDonnees.query("SELECT `commentaires`.`id` AS commentId, `commentaire`, `utilisateur_id`, `topic_id`, `date_creation`, `admin_utilisateur_id`, `date_modif_admin`,`pseudo`,`photo_url`, 0 AS isMyComment FROM `commentaires` INNER JOIN `utilisateurs` ON `utilisateurs`.`id`= `commentaires`.`utilisateur_id` ORDER BY  `topic_id`,`date_creation` DESC;",
    function (err, comments) {
      if(err) throw err;

    comments.forEach(c => c.isMyComment = (req.auth.userId === c.utilisateur_id));

    for( let comment of comments){
      
      var topicIndex = topics.findIndex(t => t.topicId === comment.topic_id);
      if(topicIndex !== null && topicIndex >= 0){
        if(topics[topicIndex].myComments == null){
          topics[topicIndex].myComments = [];
        }
        topics[topicIndex].myComments.push(comment);
      }

    }
    res.status(200).json(topics);
  })
  });
};

//fonction permettant de modifié une sauce si l'utilisateur est le créateur de la sauce
exports.modifyPost = (req, res, next) => {
  if(req.auth.adminAuth){
    baseDeDonnees.query("UPDATE `topics` SET `titre`= ?,`article`=?, `admin_utilisateur_id`=?,`date_modif_admin`= NOW() WHERE `id` = ?"
    ,[req.body.titre, req.body.text,req.auth.userId, req.body.postId], function (err, result) {
      if(err) throw err;
      res.status(200).json({ message: 'Article modifié par admin!', isErr: false });
    });
  }else{
    if(req.auth.userId !== req.body.utilisateur_id){
      res.status(403).json({message: 'Utilisateur non autorisé' , isErr: true});
    }else{
      baseDeDonnees.query("UPDATE `topics` SET `titre`= ?,`article`=?,`date_creation`= NOW() WHERE `id` = ?"
      ,[req.body.titre, req.body.text, req.body.postId], function (err, result) {
        if(err) throw err;
        res.status(200).json({ message: 'Article modifié !' , isErr: false});
      });
    }  
  }  
};
//fonction permettant de supprimer une sauce si l'utilisateur est le créateur de la sauce
exports.deletePost = (req, res, next) => {
  if(req.auth.adminAuth){
    baseDeDonnees.query("DELETE FROM `topics` WHERE `id`=?"
    ,[req.body.postId], function (err, result) {
      if(err) throw err;
      res.status(200).json({ message: 'Article supprimé par admin !' , isErr: false});
    });
  }else{
    if(req.auth.userId !== req.body.utilisateur_id){
      res.status(403).json({message: 'Utilisateur non autorisé' , isErr: true});
    }else{
      baseDeDonnees.query("DELETE FROM `topics` WHERE `id`=?"
      ,[req.body.postId], function (err, result) {
        if(err) throw err;
        res.status(200).json({ message: 'Article supprimé !' , isErr: false});
      });
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