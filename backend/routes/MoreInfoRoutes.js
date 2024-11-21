const express = require('express');
const router = express.Router();
const Admin = require('../models/AdminSchema')

router.get("/info/:id", async (request, response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                errors: { no_user: "No user found." }
            });
        }

        const admin = await Admin.findById(id);
        if (!admin) {
            return response.status(400).json({
                errors: { no_info: "No info found." }
            });
        }

        return response.status(200).json({
            message: "Fetched",
            admin
        });
    } catch (error) {
        return response.status(500).json({ message: "Server error" });
    }
});

router.patch("/info/:id", async (request, response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                errrors: { no_user: "No user found" }
            });
        }

        const admin = await Admin.findById(id);
        if (!admin) {
            return response.status(400).json({
                errors: { no_info: "No info found" }
            });
        }

        const updatedData = request.body;
        Object.assign(admin, updatedData);

        await admin.save();

        return response.status(200).json({
            message: "Update success",
            admin
        });


    } catch (error) {
        return response.status(500).json({ message: "Server Error." });
    }
});

module.exports = router;