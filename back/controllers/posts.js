//appel des plugins pour le bon fonctionnement du controlleur
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
var fs = require('fs');

const baseDeDonnees = mysql.createConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: "groupamania" });

//fonction permettant de créer un post
exports.createPost = (req, res, next) => {
  let token = req.body.token;
  let decodedToken = jwt.verify(token, process.env.TOKEN_JWT);
  let userId = decodedToken.id;
  if (req.file.filename !== "no file needed") {
    var mediaUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  } else {
    var mediaUrl = req.body.photo_url;
  }
  if (userId) {
    baseDeDonnees.query("INSERT INTO `topics`(`titre`, `article`, `media_url`, `utilisateur_id`, `date_creation`, `date_dernier_com`) VALUES (?,?,?,?,NOW(),NOW())",
      [req.body.titre, req.body.text, mediaUrl, userId], function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: 'Article crée !', isErr: false })
      })
  }
}

//fonction permettant d'obtenir un tableau contenant les information des différentes posts de l'API
exports.getAllPosts = (req, res, next) => {
  let token = req.body.token;
  let decodedToken = jwt.verify(token, process.env.TOKEN_JWT);
  let userId = decodedToken.id;
  if (userId) {
    baseDeDonnees.query("SELECT `topics`.`id` AS topicId, `titre`, `article`,`media_url`, `utilisateur_id`, `date_creation`, `date_dernier_com`, `admin_utilisateur_id`, `date_modif_admin`,`pseudo`,`photo_url`, 0 AS isMyPost, null AS myComments FROM `topics` LEFT JOIN `utilisateurs` ON `utilisateurs`.`id`= `topics`.`utilisateur_id` ORDER BY `date_dernier_com` DESC",
      function (err, topics) {
        if (err) throw err;

        topics.forEach(t => t.isMyPost = (userId === t.utilisateur_id));

        baseDeDonnees.query("SELECT `commentaires`.`id` AS commentId, `commentaire`, `utilisateur_id`, `topic_id`, `date_creation`, `admin_utilisateur_id`, `date_modif_admin`,`pseudo`,`photo_url`, 0 AS isMyComment FROM `commentaires` LEFT JOIN `utilisateurs` ON `utilisateurs`.`id`= `commentaires`.`utilisateur_id` ORDER BY  `topic_id`,`date_creation` ASC;",
          function (err, comments) {
            if (err) throw err;

            comments.forEach(c => c.isMyComment = (userId === c.utilisateur_id));

            for (let comment of comments) {

              var topicIndex = topics.findIndex(t => t.topicId === comment.topic_id);
              if (topicIndex !== null && topicIndex >= 0) {
                if (topics[topicIndex].myComments == null) {
                  topics[topicIndex].myComments = [];
                }
                topics[topicIndex].myComments.push(comment);
              }

            }
            res.status(200).json(topics);
          })
      });
  }
};

//fonction permettant de modifier un post si l'utilisateur est le créateur du post ou un admin
exports.modifyPost = (req, res, next) => {
  if (req.file.filename !== "no file needed") {
    var mediaUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  } else {
    var mediaUrl = req.body.photo_url;
  }
  if (req.auth.adminAuth) {
    baseDeDonnees.query("UPDATE `topics` SET `titre`= ?,`article`=?,`media_url`=?, `admin_utilisateur_id`=?,`date_modif_admin`= NOW() WHERE `id` = ?"
      , [req.body.titre, req.body.text, mediaUrl, req.auth.userId, req.body.postId], function (err, result) {
        if (err) throw err;
        res.status(200).json({ message: 'Article modifié par admin!', isErr: false });
      });
  } else {
    baseDeDonnees.query('SELECT * from `topics` WHERE utilisateur_id = ? and id = ? ', [req.auth.userId, req.body.postId], function (err, result) {
      if (err) throw err;
      if (result.length === 0) {
        res.status(403).json({ message: 'Utilisateur non autorisé', isErr: true });
      } else {
        baseDeDonnees.query("UPDATE `topics` SET `titre`= ?, `article`=?, `media_url`=?, `date_creation`= NOW() WHERE `id` = ?"
          , [req.body.titre, req.body.text, mediaUrl, req.body.postId], function (err, result) {
            if (err) throw err;
            res.status(200).json({ message: 'Article modifié !', isErr: false });
          });
      }
    })
  }
};

//fonction permettant de supprimer un post si l'utilisateur est le créateur du post ou un admin
exports.deletePost = (req, res, next) => {
  baseDeDonnees.query("SELECT `media_url` FROM `topics` WHERE `id`=?"
    , [req.body.postId], function (err, mediaUrl) {
      if (err) throw err;
      if (req.auth.adminAuth) {
        baseDeDonnees.query("DELETE FROM `topics` WHERE `id`=?"
          , [req.body.postId], function (err, result) {
            if (err) throw err;
            res.status(200).json({ message: 'Article supprimé par admin !', isErr: false });
          });
      } else {
        baseDeDonnees.query('SELECT * from `topics` WHERE utilisateur_id = ? and id = ? ', [req.auth.userId, req.body.postId], function (err, result) {
          if (err) throw err;
          if (result.length === 0) {
            res.status(403).json({ message: 'Utilisateur non autorisé', isErr: true });
          } else {
            baseDeDonnees.query("DELETE FROM `topics` WHERE `id`=?"
              , [req.body.postId], function (err, result) {
                if (err) throw err;
                res.status(200).json({ message: 'Article supprimé !', isErr: false });
              });
          }
        })
      }
      if (mediaUrl[0].media_url !== '' && mediaUrl[0].media_url !== null)
        fs.unlinkSync(mediaUrl[0].media_url.split('http://localhost:3000/')[1]);
    })
};