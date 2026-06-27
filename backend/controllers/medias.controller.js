const MediasModel = require('../models/medias.model');
const { cloudinary } = require('../config/cloudinary');

const getAllMedias = async (req, res) => {
    try {
        const medias = await MediasModel.getAllMedias();
        res.status(200).json(medias);
    } catch (error) {
        console.error('Error fetching medias:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file provided' });
        }
        
        const { title } = req.body;
        const url = req.file.path;
        const public_id = req.file.filename;
        const isVideo = req.file.mimetype.includes('video');
        const type = isVideo ? 'video' : 'image';

        const newMedia = await MediasModel.createMedia(title || 'Untitled', url, type, public_id);
        res.status(201).json(newMedia);
    } catch (error) {
        console.error('Error creating media:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateMedia = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const updatedMedia = await MediasModel.updateMedia(id, title);
        if (!updatedMedia) {
            return res.status(404).json({ message: 'Media not found' });
        }
        res.status(200).json(updatedMedia);
    } catch (error) {
        console.error('Error updating media:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteMedia = async (req, res) => {
    const { id } = req.params;
    try {
        const media = await MediasModel.getMediaById(id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        // Delete from Cloudinary
        if (media.public_id) {
            await cloudinary.uploader.destroy(media.public_id, { resource_type: media.type === 'video' ? 'video' : 'image' });
        }

        await MediasModel.deleteMedia(id);
        res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const likeMedia = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedMedia = await MediasModel.likeMedia(id);
        if (!updatedMedia) {
            return res.status(404).json({ message: 'Media not found' });
        }
        res.status(200).json(updatedMedia);
    } catch (error) {
        console.error('Error liking media:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllMedias, createMedia, updateMedia, deleteMedia, likeMedia };
