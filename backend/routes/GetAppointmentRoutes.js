const express = require('express');
const router = express.Router();
const Appointments = require('../models/AppointmentSchema');

router.get("/appointments", async (request, response) => {
    const { id } = request.query;

    if (!id) {
        return response.status(400).json({
            errors: { id: "User ID is required" }
        });
    }

    try {
        const appointments = await Appointments.find({ 
            selectedVetId: id,
            status: 'pending',
        });

        if (appointments.length > 0) {
            return response.status(200).json({
                message: "Appointments fetch success",
                appointments
            });
        } else {
            return response.status(404).json({ 
                errors: { message: "No appointments found for this user" }
             });
        }
        
    } catch (error) {
        response.status(500).json({
            errors: { message: "Failed to fetch appointments" }
        });
        console.error("Error occurred during fetching appointments ", error);
    }
});

module.exports = router;
