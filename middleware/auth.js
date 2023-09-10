const jwt = require('jsonwebtoken');



/* Middleware d'authentification pour sécuriser les opérations POST, PUT, et DELETE de la route book */
/* Split pour isoler le token et retirer bearer, puis verification du token généré à la connexion via jwt.verify */


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
	next();
    } catch(error) {
        res.status(401).json({ error });
    }
};