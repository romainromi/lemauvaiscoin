import { db } from '../config/db.js';

// Récupérer toutes les catégories
export const getCategories = async () => {
    try {
        // Exécution de la requête SQL
        const [rows] = await db.query('SELECT * FROM categories');

        // Retourne le tableau de catégories
        return rows;

    } catch (error) {
        console.error(' Erreur getCategories :', error.message);
        throw error; // Laisser le controller gérer l'erreur
    }
};

// Créer une nouvelle catégorie
export const createCategory = async (name) => {
    try {
        // Insertion sécurisée via placeholder
        await db.query(
            'INSERT INTO categories (name) VALUES (?)',
            [name]
        );

    } catch (error) {
        console.error(' Erreur createCategory :', error.message);
        throw error; // Laisser le controller gérer l'erreur
    }
};


/**
 * Récupérer une catégorie par ID
 */
export const getCategoryById = async (id) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM categories WHERE id = ?',
            [id]
        );

        return rows[0]; // une seule catégorie
    } catch (error) {
        console.error('Erreur getCategoryById :', error.message);
        throw error;
    }
};




/**
 * Mettre à jour une catégorie par ID
 */
export const updateCategoryById = async (id, name) => {
    try {
        const [result] = await db.query(
            'UPDATE categories SET name = ? WHERE id = ?',
            [name, id]
        );

        return result.affectedRows; // permet de vérifier si l’ID existe
    } catch (error) {
        console.error('Erreur updateCategoryById :', error.message);
        throw error;
    }
};

/**
 * Supprimer une catégorie par ID
 */
export const deleteCategoryById = async (id) => {
    try {
        const [result] = await db.query(
            'DELETE FROM categories WHERE id = ?',
            [id]
        );

        return result.affectedRows;
    } catch (error) {
        console.error('Erreur deleteCategoryById :', error.message);
        throw error;
    }
};
