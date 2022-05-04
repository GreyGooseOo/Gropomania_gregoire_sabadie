//appel des plugins et code pour le bon fonctionnement de l'application 
const express = require('express');
const app = express();
const mysql = require('mysql');
//const saucesRoutes = require('./routes/sauces');
//const userRoutes = require('./routes/user');
const path = require('path');
require('dotenv').config();

//connection avec MYSQL
const db = mysql.createConnection({host: "localhost:3306", user: "root", password: "MonSQL54", database : "groupamania"});

db.connect(function(err) {
  if (err) throw "Erreur Connection";
  console.log("Connecté à la base de données MySQL!");
});

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//stokage des images téléchargé dans le dossier /images
//app.use('/images', express.static(path.join(__dirname, 'images')));

//appel des routes pour l'authentification et les produits
app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;