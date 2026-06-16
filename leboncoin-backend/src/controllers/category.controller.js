import * as model from '../models/category.model.js'
import { categorieSchema } from '../validations/categorie.validation.js';

// Controller pour récupérer toutes les catégories
export const getCategories = async (req, res) => {
    try {
        // Appel du modèle pour récupérer toutes les catégories
        const categories = await model.getCategories();

        // Renvoi du résultat au client
        res.json(categories);

    } catch (error) {
        console.error(' Erreur getCategories :', error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des catégories' });
    }
};

// Controller pour créer une nouvelle catégorie
export const createCategory = async (req, res) => {
    try {


        // Destructuring du body pour récupérer le champ 'name'
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Le nom de la catégorie est requis' });
        }

              // Validation via Joi
        const { error } = categorieSchema.validate({name} );
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Appel du modèle pour créer la catégorie
        await model.createCategory(name);

        // Réponse succès
        res.status(201).json({ message: 'Catégorie créée' });

    } catch (error) {
        console.error(' Erreur createCategory :', error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la création de la catégorie' });
    }
};


// Controller pour récupérer une catégorie par ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await model.getCategoryById(id);

        if (!category) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }

        res.json(category);

    } catch (error) {
        console.error('Erreur getCategoryById :', error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération de la catégorie' });
    }
};

// Controller pour mettre à jour une catégorie par ID
export const updateCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Le nom de la catégorie est requis' });
        }

        // Validation Joi
        const { error } = categorieSchema.validate({ name });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const affectedRows = await model.updateCategoryById(id, name);

        if (!affectedRows) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }

        res.json({ message: 'Catégorie mise à jour avec succès' });

    } catch (error) {
        console.error('Erreur updateCategoryById :', error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la catégorie' });
    }
};

// Controller pour supprimer une catégorie par ID
export const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const affectedRows = await model.deleteCategoryById(id);

        if (!affectedRows) {
            return res.status(404).json({ message: 'Catégorie introuvable' });
        }

        res.json({ message: 'Catégorie supprimée avec succès' });

    } catch (error) {
        console.error('Erreur deleteCategoryById :', error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression de la catégorie' });
    }
};
