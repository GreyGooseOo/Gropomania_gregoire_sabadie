//appel des plugins et code pour le bon fonctionnement du controlleur
//const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

const baseDeDonnees = mysql.createConnection({host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database : "groupamania"});

baseDeDonnees.connect(function(err) {
  if (err) throw err ;
  console.log("Connecté à la base de données MySQL!");
});

exports.getSignup = (req, res, next) => {
  var decodedToken = jwt.verify(req.body.token, process.env.TOKEN_JWT);
  var id = decodedToken.id;
  baseDeDonnees.query("SELECT `id`, `nom`, `prenom`, `pseudo`, `email`, `photo_url`, `admin` FROM `utilisateurs` WHERE `id` = ?",[id], function (err, user) {
    if (err) throw  err;
    if (!user || user.length === 0) {
      return res.status(401).json({ err: 'Utilisateur non trouvé !',profil: "" });
    }
    res.status(200).json({
      //création du token d'authentification
      err : "",
      profil : user[0]
      })
});
}
//fonction permettant la création d'un compte
exports.signup = (req, res, next) => {
  //vérification de la bonne comformité de l'email grace a une regex
  if(!/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(req.body.email)){
    return res.status(400).json({ error : 'Email non correct'});
  };
  //vérification de la présence de tous les élements
  if(!req.body.mdp || !req.body.nom || !req.body.prenom || !req.body.email || !req.body.pseudo || !req.body.photo_url ){
    return res.status(400).json({ error : 'Paramètre manquant'});
  };
  //haschage du mot de passe dans la base de donnée
  console.log(1)
  bcrypt.hash(req.body.mdp, 10)
  .then(hash => {
    const user = {
      nom : req.body.nom,
      prenom : req.body.prenom,
      pseudo : req.body.pseudo,
      email: req.body.email,
      password : hash,
      photo_url : req.body.photo_url
    };
    if(req.body.token && req.body.token.length > 0 ){
      console.log(2);
        var verifyToken = jwt.verify(req.body.token, process.env.TOKEN_JWT);
        var _id = verifyToken.id;
        console.log(_id)
        console.log(4)
      baseDeDonnees.query("UPDATE `utilisateurs` SET `nom`=?,`prenom`=?,`pseudo`=?,`password`=?,`email`=?,`photo_url`=? WHERE 'id' = ?"
      ,[user.nom,user.prenom,user.pseudo,user.password,user.email,user.photo_url,_id], function (err, user) {
        console.log(3)
        if(err){
          if (err.errno == 1062){
            var cibleErreur = err.sqlMessage.split('utilisateurs.')[1].split(`'`)[0]
            console.log(cibleErreur);
            res.status(401).json({ message: `${cibleErreur} déjà existant !` })
          }else{
            throw err
          }
          
        }else{
          res.status(201).json({ message: 'Profil modifié !' })
        }
      });
      
    }else{
      baseDeDonnees.query("INSERT INTO `utilisateurs`(`nom`, `prenom`, `pseudo`, `password`, `email`, `photo_url`) VALUES (?,?,?,?,?,?)"
      ,[user.nom,user.prenom,user.pseudo,user.password,user.email,user.photo_url], function (err, user) {
        console.log(5)
        if(err){
          if (err.errno == 1062){
            var cibleErreur = err.sqlMessage.split('utilisateurs.')[1].split(`'`)[0]
            console.log(cibleErreur);
            res.status(401).json({ message: `${cibleErreur} déjà existant !` })
          }else{
            throw err
          }
          
        }else{
          res.status(201).json({ message: 'Utilisateur créé !' })
        }
      });
    }console.log(6)
})
  .catch(error => res.status(500).json({ error }));
};

//fonction permettant l'identification d'un utilisateur
exports.login = (req, res, next) => { 
  baseDeDonnees.query("SELECT `id`,`pseudo`,`password` FROM `utilisateurs` WHERE `pseudo`= ?; ",[req.body.pseudo], function (err, user) {
    if (err) throw  err;
    if (!user || user.length === 0) {
      return res.status(401).json({ err: 'Utilisateur non trouvé !',token: "" });
    }
    bcrypt.compare(req.body.mdp, user[0].password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ err: 'Mot de passe incorrect !',token: "" });
          }
        });
    res.status(200).json({
      //création du token d'authentification
      err : "",
      token: jwt.sign({ id: user[0].id}, process.env.TOKEN_JWT, { expiresIn: '24h' })
      })
  });

};