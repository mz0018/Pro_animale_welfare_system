const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const Admin = require('../models/AdminSchema');

router.post('/signupAdmin', async (request, response) => {
    try {
        const { admin_name, admin_username, admin_password, contact, license_certificate } = request.body;
    
        if (!admin_name) {
            return response.status(400).json({
                errors: { admin_name: 'Admin name is required' }
            });
        }
        if (!admin_username) {
            return response.status(400).json({
                errors: { admin_username: 'Admin username is required' }
            });
        }
        if (!admin_password) {
            return response.status(400).json({
                errors: { admin_password: 'Admin password is required' }
            });
        }
        if (!contact) {
            return response.status(400).json({
                errors: { contact: 'contact is required' }
            });
        }

        if (!contact.startsWith('+639')) {
            return response.status(400).json({
                errors: { number_not_valid: 'The phone number must start with +639.' }
            });
        }        

        if (!license_certificate) {
            return response.status(400).json({
                errors: { license_certificate: 'License certificate is required' }
            });
        }        

        if (admin_username.length < 5) {
            return response.status(400).json({ 
                errors: { username_length: 'Username must be at least 5 characters long.' }
             });
        }

        if (admin_password.length < 8 || admin_password.length > 12) {
            return response.status(400).json({ 
                errors: { password_length: 'Password must be between 8 and 20 characters long.' }
            });
        }

        const isUsernameTaken = await Admin.findOne({ admin_user: admin_username });

        if (isUsernameTaken) {
            return response.status(400).json({ 
                errors: { username_taken: 'Username is already taken.' }
            });
        }

        const hashed_password = await argon2.hash(admin_password);

        const credentials = new Admin({
            admin_name: admin_name,
            admin_user: admin_username,
            admin_pwd: hashed_password,
            contact_number: contact,
            license_certificate: license_certificate
        });

        await credentials.save();
        response.status(200).json({ message: 'Request sucesfully sent for approval' });
    } catch (error) {
        console.error("Error occured signup admin: ", error);
        response.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
