//appel du plugin et du code pour le bon fonctionnement du controlleur
const mysql = require('mysql');

const baseDeDonnees = mysql.createConnection({host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database : "groupamania"});

//fonction permettant de créer un commentaire
exports.createComment = (req, res, next) => {
    console.log(req.body.postId)
  baseDeDonnees.query("INSERT INTO `commentaires`(`commentaire`, `utilisateur_id`, `topic_id`, `date_creation`) VALUES (?,?,?,NOW())",
  [req.body.commentaire, req.auth.userId, req.body.postId], function (err, result) {
    if(err) throw err;
    res.status(201).json({ message: 'Commentaire crée !' })
    })
}
//fonction permettant d'obtenir un tableau contenant les information des différentes sauces de l'API
exports.getAllComments = (req, res, next) => {
  baseDeDonnees.query("SELECT `topics`.`id` AS topicsId, `titre`, `article`, `utilisateur_id`, `date_creation`, `date_dernier_com`, `admin_utilisateur_id`, `date_modif_admin`,`pseudo`,`photo_url` FROM `topics` INNER JOIN `utilisateurs` ON `utilisateurs`.`id`= `topics`.`utilisateur_id` ORDER BY `date_dernier_com` DESC",
  function (err, comments) {
    if(err) throw err;
    res.status(200).json(comments);
  })
};

//fonction permettant de modifié uncommentaire si l'utilisateur est le créateur du commentaire
exports.modifyComment = (req, res, next) => {
  if(admin){
//gestion admin
  }else{
    if(req.auth.userId !== req.body.utilisateur_id){
      res.status(403).json({error: new Error('Unauthorized request!')});
    }else{
      baseDeDonnees.query("UPDATE `commentaires` SET `commentaire`= ?,`date_creation`=NOW() WHERE `id` = ?"
      ,[req.body.commentaire, req.body.commentId], function (err, result) {
      if(err) throw err;
      res.status(200).json({ message: 'Commentaire modifié !' });
      })
    }  
  }  
};
//fonction permettant de supprimer une sauce si l'utilisateur est le créateur de la sauce
exports.deleteComment = (req, res, next) => {
  if(admin){
//gestion admin
  }else{
    if(req.auth.userId !== req.body.utilisateur_id){
      res.status(403).json({error: new Error('Unauthorized request!')});
    }else{
      baseDeDonnees.query("DELETE FROM `commentaires` WHERE `id`=?"
      ,[req.body.commentId], function (err, result) {
      if(err) throw err;
      res.status(200).json({ message: 'Commentaire supprimé !' });
      })
    }  
  }
};