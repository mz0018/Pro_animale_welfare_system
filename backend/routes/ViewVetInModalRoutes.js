const express = require('express');
const router = express.Router();
const Admin = require('../models/AdminSchema');
const Product = require('../models/ImageSchema');

router.get("/info/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const admin = await Admin.findById(id);
        if (!admin) {
            return response.status(400).json({
                errors: { admin: "No info found" }
            });
        }
     
        return response.status(200).json({ admin });
    } catch (error) {
        return response.status(500).json({ message: "Server error", error});
    }
});

module.exports = router;