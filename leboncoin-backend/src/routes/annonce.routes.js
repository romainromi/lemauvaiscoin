

import express from 'express';
import { getAnnonces, createAnnonce, updateAnnonceById, getAnnonceById, deleteAnnonceById } from '../controllers/annonce.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/', getAnnonces);
router.get('/:id', getAnnonceById);
router.post('/', authMiddleware, upload.single('image'), createAnnonce);
router.put('/:id', authMiddleware, upload.single('image'), updateAnnonceById);
router.delete('/:id', authMiddleware, deleteAnnonceById);

export default router;
