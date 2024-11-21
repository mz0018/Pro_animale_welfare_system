const express = require('express');
const router = express.Router();
const Image = require('../models/ImageSchema');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
});

router.post("/uploads/:id", upload.single("image"), async (request, response) => {
    try {
        const { id } = request.params;
        const { prod_name, prod_price, prod_category, prod_quantity } = request.body;

        if (!request.file) {
            return response.status(400).json({
                errors: { no_image: "No file uploaded" }
            });
        }

        if (!prod_name) {
            return response.status(400).json({
                errors: { prod_name: "Product name is required."}
            });
        }

        if (!prod_price) {
            return response.status(400).json({
                errors: { prod_price: "Product price is required." }
            });
        } else if (prod_price < 0) {
            return response.status(400).json({
                errors: { prod_price_value: "Product price must be greater than zero." }
            });
        }

        if (!prod_category) {
            return response.status(400).json({
                errors: { prod_category: "Product category is required."}
            });
        }

        if (!prod_quantity && prod_quantity !== 0) {
            return response.status(400).json({
                errors: { prod_quantity: "Product quantity is required." }
            });
        } else if (prod_quantity < 0) {
            return response.status(400).json({
                errors: { prod_quantity_value: "Product quantity cannot be negative." }
            });
        }

        const newImage = new Image({
            vet_id: id,
            image: request.file.buffer,
            contentType: request.file.mimetype,
            prod_name,
            prod_price,
            prod_category,
            prod_quantity
        });

        await newImage.save();
        return response.status(200).json({ message: "Product uploaded successfully" });
    } catch (error) {
        console.error("Error ", error);
        return response.status(500).json({ message: "Server error", error});
    }
});

router.get("/image/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const images = await Image.find({ vet_id: id });

        if (images.length === 0) {
            return response.status(400).json({
                errors: { image: "Images not found" }
            });
        }

        // Convert each image to base64 format and include product details
        const imageData = images.map((img) => ({
            image: `data:${img.contentType};base64,${img.image.toString('base64')}`,
            prod_name: img.prod_name,
            prod_price: img.prod_price,
            prod_category: img.prod_category,
            prod_quantity: img.prod_quantity
        }));

        return response.status(200).json(imageData);
    } catch (error) {
        console.error("Backend Error ", error);
        return response.status(500).json({ message: "Server error ", error });
    }
});



module.exports = router;
