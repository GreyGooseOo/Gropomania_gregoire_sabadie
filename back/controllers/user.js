//appel des plugins et code pour le bon fonctionnement du controlleur
//const User = require('../models/user');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const mysql = require('mysql');
require('dotenv').config();

const baseDeDonnees = mysql.createConnection({host: "localhost", user: "root", password: process.env.MYSQL_PASSWORD, database : "groupamania"});


//fonction permettant l'identification d'un utilisateur
exports.login = (req, res, next) => {
  baseDeDonnees.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
    baseDeDonnees.query("INSERT INTO `utilisateurs`( `nom`, `prenom`, `pseudo`, `password`, `email`, `photo_ulr`, `admin`) VALUES ('greg','prout','progreg','prout','put@prout.pet',' ',1);  ", function (err, user) {
      if (err) throw err;
         console.log(user);
  });
});
};