const mysql = require('mysql');
require('dotenv').config();

//connection avec MYSQL
const baseDeDonnees = mysql.createConnection({host: "localhost", user: "root", password: process.env.MYSQL_PASSWORD, database : "groupamania"});

baseDeDonnees.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  baseDeDonnees.query("INSERT INTO `utilisateurs`( `nom`, `prenom`, `pseudo`, `password`, `email`, `photo_ulr`, `admin`) VALUES ('greg','prout','proutogreg','prout','prout@prout.pet',' ',1);  ", function (err, user) {
    if (err) throw err;
       console.log(user);
  })
});

module.exports = baseDeDonnees;