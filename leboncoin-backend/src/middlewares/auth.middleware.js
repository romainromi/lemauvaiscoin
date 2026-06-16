

import jwt from 'jsonwebtoken';

// Middleware pour protéger les routes avec JWT
export const authMiddleware = (req, res, next) => {
    try {
        // Récupérer le header Authorization
        const header = req.headers.authorization;
        if (!header) {
            // Pas de token : accès interdit
            return res.status(401).json({ message: 'Token manquant' });
        }

        // Extraire le token (format : "Bearer <token>")
        const token = header.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token malformé' });
        }

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajouter les informations utilisateur à la requête
        req.user = decoded;

        // Passer au prochain middleware ou route

        console.log("middlewre ");
        
        next();

    } catch (error) {
        console.error(' Erreur authMiddleware :', error.message);
        return res.status(401).json({ message: 'Token invalide' });
    }
};
