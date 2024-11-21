const express = require('express');
const router = express.Router();
const Admin = require('../models/AdminSchema');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

router.post("/profilePicture/:id", upload.single("picture"), async (request, response) => {
    try {
        const { id } = request.params;

        if (!request.file) {
            return response.status(400).json({
                errors: { no_image: "No image uploaded" }
            });
        }

        const admin = await Admin.findById(id);
        if (!admin) {
            return response.status(400).json({
                errors: { no_admin: "No user found" }
            });
        }

        admin.admin_info.profile_picture = request.file.buffer;
        await admin.save();

        return response.status(200).json({ message: "Profile Uploaded Successfully" });
    } catch (error) {
        return response.status(500).json({ message: "Server Error ", error});
    }
});

router.get("/fetchPicture/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const admin = await Admin.findById(id);

        if (!admin || !admin.admin_info || !admin.admin_info.profile_picture) {
            return response.status(400).json({
                errors: { not_found: "No image found." }
            });
        }

        const base64Pic = admin.admin_info.profile_picture.toString('base64');
        return response.status(200).json({ profile_pic_url: `data:image/jpeg;base64,${base64Pic}` });
    } catch (error) {
        console.error("Error occurred: ", error);
        return response.status(500).json({ message: "Server error", error });
    }
});


module.exports = router;