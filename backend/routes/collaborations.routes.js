const express = require('express');
const router = express.Router();
const CollaborationsController = require('../controllers/collaborations.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { upload } = require('../config/cloudinary');

router.get('/', CollaborationsController.getAllCollaborations);
router.post('/', authMiddleware, upload.single('logo'), CollaborationsController.createCollaboration);
router.put('/:id', authMiddleware, CollaborationsController.updateCollaboration);
router.delete('/:id', authMiddleware, CollaborationsController.deleteCollaboration);

module.exports = router;
