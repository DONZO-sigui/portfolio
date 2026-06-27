const express = require('express');
const router = express.Router();
const MediasController = require('../controllers/medias.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { upload } = require('../config/cloudinary');

router.get('/', MediasController.getAllMedias);
router.post('/', authMiddleware, upload.single('media'), MediasController.createMedia);
router.put('/:id', authMiddleware, MediasController.updateMedia);
router.delete('/:id', authMiddleware, MediasController.deleteMedia);
router.post('/:id/like', MediasController.likeMedia); // Route publique

module.exports = router;
