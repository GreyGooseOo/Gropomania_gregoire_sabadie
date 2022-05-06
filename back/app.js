//appel des plugins et code pour le bon fonctionnement de l'application 
const express = require('express');
const app = express();
//const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
console.log(userRoutes);
//const path = require('path');
require('dotenv').config();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//appel des routes pour l'authentification et les produits
//app.use('/api/posts', postsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;