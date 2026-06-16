// Import du framework Express pour créer le serveur HTTP
import express from 'express';

// Chargement des variables d'environnement depuis le fichier .env
import dotenv from 'dotenv';

// Middleware permettant de gérer les requêtes cross-origin (CORS)
import cors from 'cors';

// Middleware de sécurité ajoutant des headers HTTP pour protéger l'application
import helmet from 'helmet';

// Import des routes métier de l'application
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js';
import annonceRoutes from './routes/annonce.routes.js';

// Initialisation de dotenv pour rendre les variables .env accessibles via process.env
dotenv.config();

// Création de l'instance Express (application principale)
const app = express();

/**
 * ==========================
 * MIDDLEWARES GLOBAUX
 * ==========================
 */

// Middleware pour parser automatiquement les requêtes JSON
// Permet d'accéder aux données via req.body
app.use(express.json());

// Activation du CORS pour autoriser les requêtes provenant d'autres domaines
// Indispensable pour une communication frontend ↔ backend
app.use(cors({
  origin: ['http://localhost:5173', 'https://lemauvaiscoin.vercel.app'],
  credentials: true // autorise les cookies
}));

// Activation de Helmet pour renforcer la sécurité HTTP
// Ajoute automatiquement des headers sécurisés
app.use(helmet());

// Exposition publique du dossier "uploads"
// Permet d'accéder aux fichiers uploadés (ex : images d'annonces)
app.use('/uploads', express.static('uploads', {
    setHeaders : (res , path , stat  ) => {
        res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    }
 }));

/**
 * ==========================
 * ROUTES DE L'APPLICATION
 * ==========================
 */

// Routes d'authentification (login, register, etc.)
app.use('/api/auth', authRoutes);

// Routes de gestion des catégories
app.use('/api/categories', categoryRoutes);

// Routes de gestion des annonces (CRUD)
app.use('/api/annonces', annonceRoutes);

// Export de l'application pour être utilisée dans server.js ou index.js
export default app;
