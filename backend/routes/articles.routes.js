const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { upload } = require('../config/cloudinary');

router.get('/', articlesController.getAllArticles);
router.get('/:id', articlesController.getArticleById);
router.post('/', authMiddleware, upload.single('image'), articlesController.createArticle);
router.put('/:id', authMiddleware, articlesController.updateArticle);
router.delete('/:id', authMiddleware, articlesController.deleteArticle);

module.exports = router;
