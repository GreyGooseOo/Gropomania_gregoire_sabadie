//appel des plugins pour le bon fonctionnement du middleware
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mysql = require('mysql');

const baseDeDonnees = mysql.createConnection({host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database : "groupamania"});

//vérifacation du token pour validation de l'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.body.token;
    const decodedToken = jwt.verify(token, process.env.TOKEN_JWT);
    const userId = decodedToken.id;
    if (req.body.userId && req.body.userId !== userId) {
      throw res.status(403).json({ error: 'unauthorized request' });
    } else {
      baseDeDonnees.query("SELECT `admin` FROM `utilisateurs` WHERE `id`= ?; ",[userId], function (err, admin) {
        if (err) throw  err;
        const adminAuth = admin[0].admin;
        req.auth = { userId, adminAuth };
        next();
      })
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};