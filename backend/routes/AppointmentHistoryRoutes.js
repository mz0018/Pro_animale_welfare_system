const express = require('express');
const router = express.Router();
const Appointments = require('../models/AppointmentSchema');

router.get("/history/:id", async (request, response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                errors: { no_user: "No user found." }
            });
        }

        const approvedAppointments = await Appointments.find({
            selectedVetId: id,
            status: 'approved'
        });

        const rejectedAppointments = await Appointments.find({
            selectedVetId: id,
            status: 'rejected'
        });

        return response.status(200).json({
            message: "Fetched success",
            approvedAppointments,
            rejectedAppointments
        })

    } catch (error) {
        return response.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;