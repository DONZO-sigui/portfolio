const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', TestimonialsController.getAllTestimonials);
router.post('/public', TestimonialsController.createTestimonial);
router.post('/', authMiddleware, TestimonialsController.createTestimonial);
router.put('/:id', authMiddleware, TestimonialsController.updateTestimonial);
router.delete('/:id', authMiddleware, TestimonialsController.deleteTestimonial);
router.post('/:id/reply', authMiddleware, TestimonialsController.replyTestimonial);

module.exports = router;
