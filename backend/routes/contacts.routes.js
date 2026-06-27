const express = require('express');
const router = express.Router();
const ContactsController = require('../controllers/contacts.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, ContactsController.getAllContacts); // Protected (admin reading messages)
router.post('/', ContactsController.createContact); // Public (users sending messages)
router.delete('/:id', authMiddleware, ContactsController.deleteContact);

module.exports = router;
