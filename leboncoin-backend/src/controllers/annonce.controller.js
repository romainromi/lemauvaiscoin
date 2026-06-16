import * as model from '../models/annonce.model.js';
import { annonceSchema } from '../validations/annonce.validation.js';

// Controller pour récupérer toutes les annonces
export const getAnnonces = async (req, res) => {
    try {
        // Appel du modèle pour récupérer toutes les annonces
        const annonces = await model.getAnnonces();

        // Envoi des annonces au client
        res.json(annonces);

    } catch (error) {
        console.error(' Erreur getAnnonces :', error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des annonces' });
    }
};

// Controller pour créer une nouvelle annonce
export const createAnnonce = async (req, res) => {
    try {
        // Destructuring du body
        const { title, price, city, category_id } = req.body;
        const image = req.file ? req.file.filename : null;
        const user_id = req.user.id;

        // Validation via Joi
        const { error } = annonceSchema.validate({ title, price, city, category_id });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Appel du modèle pour créer l'annonce
        await model.createAnnonce({ title, price, city, image, user_id, category_id });

        // Réponse succès
        res.status(201).json({ message: 'Annonce créée' });

    } catch (error) {
        console.error(' Erreur createAnnonce :', error.message);
        res.status(500).json({ message: 'Erreur serveur lors de la création de l\'annonce' });
    }
};



/**
 * Récupérer une annonce par ID
 */
export const getAnnonceById = async (req, res) => {
    try {
        const { id } = req.params;

        const annonce = await model.getAnnonceById(id);

        if (!annonce) {
            return res.status(404).json({ message: 'Annonce introuvable' });
        }

        res.json(annonce);

    } catch (error) {
        console.error('Erreur getAnnonceById :', error.message);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

/**
 * Mettre à jour une annonce par ID
 */
export const updateAnnonceById = async (req, res) => {
    try {
        const { id } = req.params;
        const image = req.file ? req.file.filename : undefined;

        const existingAnnonce = await model.getAnnonceById(id);

        if (!existingAnnonce) {
            return res.status(404).json({ message: 'Annonce introuvable' });
        }

        // Champs updatables uniquement
        const updatedData = {
            title: req.body.title ?? existingAnnonce.title,
            price: req.body.price ?? existingAnnonce.price,
            city: req.body.city ?? existingAnnonce.city,
            category_id: req.body.category_id ?? existingAnnonce.category_id,
            image: image ?? existingAnnonce.image
        };

        // Validation Joi
        const { error } = annonceSchema.validate(updatedData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        await model.updateAnnonceById(id, updatedData);

        res.json({ message: 'Annonce mise à jour' });

    } catch (error) {
        console.error('Erreur updateAnnonceById :', error.message);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

/**
 * Supprimer une annonce par ID
 */
export const deleteAnnonceById = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await model.deleteAnnonceById(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Annonce introuvable' });
        }

        res.json({ message: 'Annonce supprimée' });

    } catch (error) {
        console.error('Erreur deleteAnnonceById :', error.message);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};