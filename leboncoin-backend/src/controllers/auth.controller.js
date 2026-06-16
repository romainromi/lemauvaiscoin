import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../models/user.model.js';
import { registerSchema } from '../validations/auth.validation.js';

// Controller pour l'inscription
export const register = async (req, res) => {
    try {
        // Destructuring des champs du body
        const { email, password } = req.body;
        const avatar = req.file ? req.file.filename : null;

        // Validation simple via Joi
        const { error } = registerSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email déjà utilisé' });
        }

        // Hash du mot de passe
        const hash = await argon2.hash(password);

        // Création de l'utilisateur
        await createUser({ email, password: hash, avatar });

        res.status(201).json({ message: 'Utilisateur créé' });

    } catch (error) {
        console.error(' Erreur register :', error.message);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


/**
 * Controller de connexion utilisateur
 * -----------------------------------
 * - Vérifie les identifiants
 * - Génère un JWT sécurisé
 * - Stocke le token dans un cookie HTTP-only
 */
export const login = async (req, res) => {
    try {
        /**
         * 1️⃣ Récupération des identifiants depuis le body
         */
        const { email, password } = req.body;

        /**
         *  Vérification de l’existence de l’utilisateur
         */
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                message: 'Utilisateur introuvable'
            });
        }

        /**
         *  Vérification du mot de passe
         * argon2.compare le mot de passe en clair
         * avec le hash stocké en base
         */
        const isValidPassword = await argon2.verify(
            user.password,
            password
        );

        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Mot de passe incorrect'
            });
        }

        /**
         *  Création du JWT
         * Le payload contient les informations minimales
         * nécessaires à l’authentification et aux rôles
         */
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                avatar: user.avatar,
                role: user.role // 'user' | 'admin'
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        /**
         *  Stockage du token dans un cookie sécurisé
         * - httpOnly : inaccessible via JavaScript (anti-XSS)
         * - secure   : HTTPS uniquement en production
         * - sameSite : protection CSRF
         */
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jour
        });

        /**
         *   Réponse au frontend
         * Le token n’est PAS envoyé dans le JSON
         */
        res.json({
            message: 'Connexion réussie', token 
        });

    } catch (error) {
        console.error('Erreur login :', error.message);

        res.status(500).json({
            message: 'Erreur serveur lors de la connexion'
        });
    }
};
