//appel des plugins pour le bon fonctionnement du middleware
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mysql = require('mysql');

const baseDeDonnees = mysql.createConnection({host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database : "groupamania"});

//vérifacation du token pour validation de l'authentification
module.exports = (req, res, next) => {
  try {
    var adminAuth = 0;
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.TOKEN_JWT);
    const userId = decodedToken.id;
    baseDeDonnees.query("SELECT `admin` FROM `utilisateurs` WHERE `id`= ?; ",[userId], function (err, admin) {
      if (err) throw  err;
      adminAuth = admin[0].admin;
      if (!adminAuth && req.body.utilisateur_id && req.body.utilisateur_id != userId) {
        throw res.status(403).json({message: 'Utilisateur non autorisé', isErr: true });
      } else {
        req.auth = { userId, adminAuth };
        next();
      }
    })
  } catch {
    res.status(401).json({message: 'Requète invalide', isErr: true });
  }
};