const ContactsModel = require('../models/contacts.model');
const nodemailer = require('nodemailer');

const getAllContacts = async (req, res) => {
    try {
        const contacts = await ContactsModel.getAllContacts();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createContact = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const newContact = await ContactsModel.createContact(name, email, subject, message);

        // Configuration Nodemailer
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Vous pouvez changer le service (Outlook, Yahoo, etc.)
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // Le propriétaire s'envoie l'email à lui-même
                replyTo: email,
                subject: `Nouveau message sur le Portfolio : ${subject}`,
                text: `Vous avez reçu un nouveau message depuis votre Portfolio.\n\nDe : ${name} (${email})\nSujet : ${subject}\n\nMessage :\n${message}`
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Notification email envoyée au propriétaire.');
            } catch (mailError) {
                console.error('Erreur lors de l\'envoi de l\'email (Vérifiez les identifiants) :', mailError.message);
                // On ne bloque pas la réponse, on continue
            }
        }

        res.status(201).json({ message: 'Message sent successfully', contact: newContact });
    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        await ContactsModel.deleteContact(id);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllContacts, createContact, deleteContact };
