const ArticlesModel = require('../models/articles.model');

const getAllArticles = async (req, res) => {
    try {
        const articles = await ArticlesModel.getAllArticles();
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error in getAllArticles:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getArticleById = async (req, res) => {
    try {
        const article = await ArticlesModel.getArticleById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json(article);
    } catch (error) {
        console.error('Error in getArticleById:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        let imageUrl = null;

        if (req.file) {
            // multer-storage-cloudinary a DÉJÀ uploadé le fichier, l'URL est dans req.file.path
            imageUrl = req.file.path;
        }

        const newArticle = await ArticlesModel.createArticle(title, content, imageUrl);
        res.status(201).json(newArticle);
    } catch (error) {
        console.error('Error in createArticle:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateArticle = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedArticle = await ArticlesModel.updateArticle(req.params.id, title, content);
        res.status(200).json(updatedArticle);
    } catch (error) {
        console.error('Error in updateArticle:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteArticle = async (req, res) => {
    try {
        await ArticlesModel.deleteArticle(req.params.id);
        res.status(200).json({ message: 'Article deleted' });
    } catch (error) {
        console.error('Error in deleteArticle:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
};
