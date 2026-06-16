import { db } from '../config/db.js';

// Récupérer toutes les annonces
export const getAnnonces = async () => {
    try {
        // Exécution de la requête SQL pour récupérer toutes les annonces
        const [rows] = await db.query('SELECT * FROM annonces');

        // Retourne le tableau d'annonces
        return rows;

    } catch (error) {
        console.error(' Erreur getAnnonces :', error.message);
        throw error; // Laisser le controller gérer l'erreur et renvoyer un code HTTP
    }
};

// Créer une nouvelle annonce
export const createAnnonce = async (data) => {
    try {
        // Insertion sécurisée des données via placeholders
        await db.query(
            `INSERT INTO annonces 
            (title, price, city, image, user_id, category_id, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, NOW())`,
            [
                data.title,
                data.price,
                data.city,
                data.image,
                data.user_id,
                data.category_id
            ]
        );

    } catch (error) {
        console.error(' Erreur createAnnonce :', error.message);
        throw error; // Laisser le controller gérer l'erreur
    }
};


/**
 * Récupérer une annonce par ID
 */
export const getAnnonceById = async (id) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM annonces WHERE id = ?',
            [id]
        );

        return rows[0] || null;

    } catch (error) {
        console.error('Erreur getAnnonceById :', error.message);
        throw error;
    }
};

/**
 * Mettre à jour une annonce par ID
 * Champs non modifiables : id, user_id, created_at
 */
export const updateAnnonceById = async (id, data) => {
    try {
        await db.query(
            `UPDATE annonces 
             SET title = ?, price = ?, city = ?, image = ?, category_id = ?
             WHERE id = ?`,
            [
                data.title,
                data.price,
                data.city,
                data.image,
                data.category_id,
                id
            ]
        );

    } catch (error) {
        console.error('Erreur updateAnnonceById :', error.message);
        throw error;
    }
};

/**
 * Supprimer une annonce par ID
 */
export const deleteAnnonceById = async (id) => {
    try {
        const [result] = await db.query(
            'DELETE FROM annonces WHERE id = ?',
            [id]
        );

        return result.affectedRows > 0;

    } catch (error) {
        console.error('Erreur deleteAnnonceById :', error.message);
        throw error;
    }
};