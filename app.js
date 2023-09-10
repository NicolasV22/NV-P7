const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
require('dotenv').config();

/* Connexion à la base de données via mongoose, utilisation d'un .env afin de sécuriser l'url de la BDD */
mongoose.connect(process.env.MONGODB_URL ,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();


/* Configuation des requêtes à l'API */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json());


/* Connexion de l'api aux routes auth et books + utilisation du dossier images pour le stockage des images des livres */
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports=app;