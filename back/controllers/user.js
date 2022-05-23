//appel des plugins et code pour le bon fonctionnement du controlleur
//const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();
var fs = require('fs');

const baseDeDonnees = mysql.createConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: "groupamania" });

baseDeDonnees.connect(function (err) { if (err) throw err; console.log("Connecté à la base de données MySQL!"); });

//fonction permettant la recuperation des informations pour la modification du profile
exports.getSignup = (req, res, next) => {
  var decodedToken = jwt.verify(req.body.token, process.env.TOKEN_JWT);
  var id = decodedToken.id;
  baseDeDonnees.query("SELECT `nom`, `prenom`, `pseudo`, `email`, `photo_url`, `admin` FROM `utilisateurs` WHERE `id` = ?", [id], function (err, user) {
    if (err) throw err;
    if (!user || user.length === 0) {
      return res.status(401).json({ err: 'Utilisateur non trouvé !', profil: "" });
    }
    res.status(200).json({ err: "", profil: user[0] })
  });
}

//fonction permettant la création d'un compte
exports.signup = (req, res, next) => {
  //vérification de la bonne comformité de l'email grace à une regex
  if (!/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(req.body.email)) {
    return res.status(400).json({ message: 'Email non correct' });
  };
  //vérification de la bonne comformité du mot de passe grace à une regex
  if (!/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/.test(req.body.mdp)) {
    return res.status(400).json({ message: 'Mot de passe non correct' });
  };
  //vérification de la présence de tous les élements
  if (!req.body.mdp || !req.body.nom || !req.body.prenom || !req.body.email || !req.body.pseudo) {
    return res.status(400).json({ message: 'Paramètre manquant' });
  };
  //haschage du mot de passe dans la base de donnée
  bcrypt.hash(req.body.mdp, 10)
    .then(hash => {
      const user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash,
        photo_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      };
      // gestion de la modification du profil
      if (req.body.token && req.body.token.length > 0) {
        var decodeToken = jwt.verify(req.body.token, process.env.TOKEN_JWT);
        var id = decodeToken.id;
        baseDeDonnees.query("UPDATE `utilisateurs` SET `nom`=?,`prenom`=?,`pseudo`=?,`password`=?,`email`=?,`photo_url`=? WHERE `id` = ?"
          , [user.nom, user.prenom, user.pseudo, user.password, user.email, user.photo_url, id], function (err, user) {
            if (err) {
              //gestion de l'erreur de l'email ou pseudo non unique
              if (err.errno == 1062) {
                var cibleErreur = err.sqlMessage.split('utilisateurs.')[1].split(`'`)[0]
                res.status(401).json({ message: `${cibleErreur} déjà existant !` })
              } else {
                throw err
              }
            } else {
              res.status(201).json({ message: 'Profil modifié !' })
            }
          });
        // gestion de la création d'un utilisateur'
      } else {
        baseDeDonnees.query("INSERT INTO `utilisateurs`(`nom`, `prenom`, `pseudo`, `password`, `email`, `photo_url`) VALUES (?,?,?,?,?,?)",
          [user.nom, user.prenom, user.pseudo, user.password, user.email, user.photo_url], function (err, user) {
            if (err) {
              //gestion de l'erreur de l'email ou pseudo non unique
              if (err.errno == 1062) {
                var cibleErreur = err.sqlMessage.split('utilisateurs.')[1].split(`'`)[0];
                res.status(401).json({ message: `${cibleErreur} déjà existant !` });
              } else {
                throw err
              }
            } else {
              res.status(201).json({ message: 'Utilisateur créé !' })
            }
          });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//fonction permettant de supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  const token = req.body.token;
  const decodedToken = jwt.verify(token, process.env.TOKEN_JWT);
  const userId = decodedToken.id;
  if (!userId) {
    res.status(403).json({ message: 'Utilisateur non autorisé', isErr: true });
  } else {
    baseDeDonnees.query("SELECT `photo_url` FROM `utilisateurs` WHERE `id`=?"
      , [userId], function (err, photoUrl) {
        if (err) throw err;

        baseDeDonnees.query("DELETE FROM `utilisateurs` WHERE `id`=?"
          , [userId], function (err, result) {
            if (err) throw err;
            if (photoUrl[0].photo_url !== "http://localhost:3000/images/icon.png") {
              fs.unlinkSync(photoUrl[0].photo_url.split('http://localhost:3000/')[1]);
            }
          });
        res.status(200).json({ message: 'utilisateur supprimé !', isErr: false });
      });
  }
};

//fonction permettant l'identification d'un utilisateur
exports.login = (req, res, next) => {
  baseDeDonnees.query("SELECT `id`,`pseudo`,`password`, `admin` FROM `utilisateurs` WHERE `pseudo`= ?; ", [req.body.pseudo], function (err, user) {
    if (err) throw err;
    if (!user || user.length === 0) {
      return res.status(404).json({ err: 'Utilisateur non trouvé !', token: "", admin: false });
    }
    bcrypt.compare(req.body.mdp, user[0].password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ err: 'Mot de passe incorrect !', token: "", admin: false });
        }
        //création du token d'authentification
        res.status(200).json({
          err: "",
          token: jwt.sign({ id: user[0].id }, process.env.TOKEN_JWT, { expiresIn: '24h' }),
          admin: user[0].admin
        })
      });
  });
};