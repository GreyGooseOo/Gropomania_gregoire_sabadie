const mysql = require('mysql');

//connection avec MYSQL
const baseDeDonnees = mysql.createConnection({host: "localhost", user: "root", password: "MonSQL54", database : "groupamania"});

baseDeDonnees.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = baseDeDonnees;