const express = require('express');
const router = express.Router();
const User = require('../models/$model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

router.post("/insert", async (request, response) => {

    try {
        const { logEmail, logPassword} = request.body;

        const hashed$pw = await argon2.hash(logPassword);
        const newUser = new User({
            email: logEmail,  
            password: hashed$pw 
        });

        await newUser.save();

        response.status(201).send("User inserted successfully!");
    } catch (error) {
        console.error("Error inserting hardcoded data:", error);
        response.status(500).send("Error inserting data");
    }
});

router.post("/try", async (request, response) => {
    try {
        const { tryEmail, tryPassword } = request.body;

        const user = await User.findOne({ email: tryEmail });

        if (!user) {
            return response.status(401).json({
                message: "Invalid credentials"
            });
        }

        const verPassword = await argon2.verify(user.password, tryPassword);

        if (!verPassword) {
            return response.status(401).json({
                message: "Invalid credentials"
            });
        }

        const secret_key = process.env.JWT_SECRET;
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, secret_key, { expiresIn: '1h' });

        response.status(200).json({ 
            message: "Login successful",    
            token
        });

    } catch (error) {
        console.error("Error during login:", error);
        response.status(500).send("Error logging in");
    }
});

module.exports = router;
