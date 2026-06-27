const TestimonialsModel = require('../models/testimonials.model');

const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await TestimonialsModel.getAllTestimonials();
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createTestimonial = async (req, res) => {
    const { author_name, author_role, content, rating } = req.body;
    try {
        const newTestimonial = await TestimonialsModel.createTestimonial(author_name, author_role, content, rating);
        res.status(201).json(newTestimonial);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const { author_name, author_role, content, rating } = req.body;
    try {
        const updatedTestimonial = await TestimonialsModel.updateTestimonial(id, author_name, author_role, content, rating);
        if (!updatedTestimonial) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(updatedTestimonial);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTestimonial = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await TestimonialsModel.deleteTestimonial(id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const replyTestimonial = async (req, res) => {
    const { id } = req.params;
    const { replyText } = req.body;
    try {
        const updatedTestimonial = await TestimonialsModel.replyToTestimonial(id, replyText);
        res.status(200).json({ message: 'Reply sent successfully', testimonial: updatedTestimonial });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, replyTestimonial };
