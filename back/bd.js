//connection avec MYSQL
const baseDeDonnees = mysql.createConnection({host: "localhost:3306", user: "root", password: process.env.MYSQL_PASSWORD, database : "groupamania"});

baseDeDonnees.connect(function(err) {
  if (err) throw "Erreur Connection";
  console.log("Connecté à la base de données MySQL!");
});
module.exports = baseDeDonnees;