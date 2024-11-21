const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const Admin = require('../models/AdminSchema');
const jwt = require('jsonwebtoken');

router.post('/signinAdmin', async (request, response) => {
    try {
        const { admin_username, admin_password } = request.body;

        if (!admin_username || !admin_password) {
            return response.status(400).json({
                errors: { empty_fields: 'All fields are required' }
            });
        }

        const admin = await Admin.findOne({ 
            admin_user: admin_username,
            request_status: 'approved'
        });

        if (!admin) {
            return response.status(400).json({ 
                errors: { invalid: 'Invalid username or password' }
             });
        }

        const verifyPassword = await argon2.verify(admin.admin_pwd, admin_password);
        
        if (!verifyPassword) {
            return response.status(400).json({ 
                errors: { invalid: 'Invalid username or password' }
             });
        }

        const secret_key = process.env.JWT_SECRET;
        
        const token = jwt.sign({
            id: admin._id,
            username: admin.admin_user
        }, secret_key, { expiresIn: '1h' });

        response.status(200).json({ 
            message: 'Login successful',
            token
        });

    } catch (error) {
        console.error("Error occurred during admin signin: ", error);
        response.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
