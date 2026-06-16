

import { db } from '../config/db.js';

// Trouver un utilisateur par son email
export const findUserByEmail = async (email) => {
    try {
        // Exécution de la requête SQL avec placeholder pour éviter l'injection
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        // Retourne le premier utilisateur trouvé ou undefined
        return rows[0];

    } catch (error) {
        console.error(' Erreur findUserByEmail :', error.message);
        throw error; // on remonte l'erreur pour que le controller la gère
    }
};

// Création d'un nouvel utilisateur
export const createUser = async ({ email, password, avatar }) => {
    try {
        // Insertion sécurisée via placeholders
        await db.query(
            'INSERT INTO users (email, password, avatar) VALUES (?, ?, ?)',
            [email, password, avatar]
        );

    } catch (error) {
        console.error(' Erreur createUser :', error.message);
        throw error; // on remonte l'erreur pour que le controller la gère
    }
};
