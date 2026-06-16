import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategoryById, deleteCategoryById } from '../controllers/category.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
 

const router = express.Router();

router.post('/',authMiddleware, createCategory)
router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.put('/:id', updateCategoryById)
router.delete('/:id', deleteCategoryById)

export default router;
