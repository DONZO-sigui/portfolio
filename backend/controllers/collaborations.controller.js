const CollaborationsModel = require('../models/collaborations.model');
const { cloudinary } = require('../config/cloudinary');

const getAllCollaborations = async (req, res) => {
    try {
        const collabs = await CollaborationsModel.getAllCollaborations();
        res.status(200).json(collabs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createCollaboration = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Brand logo is required' });
        }
        
        const { brand_name, description, link } = req.body;
        const brand_logo = req.file.path;
        const public_id = req.file.filename;

        const newCollab = await CollaborationsModel.createCollaboration(brand_name, brand_logo, description, link, public_id);
        res.status(201).json(newCollab);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCollaboration = async (req, res) => {
    const { id } = req.params;
    const { brand_name, description, link } = req.body;
    try {
        const updatedCollab = await CollaborationsModel.updateCollaboration(id, brand_name, description, link);
        if (!updatedCollab) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(updatedCollab);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCollaboration = async (req, res) => {
    const { id } = req.params;
    try {
        const collab = await CollaborationsModel.getCollaborationById(id);
        if (!collab) return res.status(404).json({ message: 'Not found' });

        if (collab.public_id) {
            await cloudinary.uploader.destroy(collab.public_id);
        }

        await CollaborationsModel.deleteCollaboration(id);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllCollaborations, createCollaboration, updateCollaboration, deleteCollaboration };
