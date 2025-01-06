const express = require('express');
const router = express.Router();
const Appointment = require('../models/AppointmentSchema');
const Admin = require('../models/AdminSchema');

router.post("/sendAppointment", async (request, response) => {
    try {
        const { selectedVetId, name, contact, date, time, reason, status } = request.body;

        if (!selectedVetId) {
            return response.status(400).json({ errors: { selectedVetId: 'Please select a veterinarian.' } });
        }
        if (!name) {
            return response.status(400).json({ errors: { name: 'Please enter your name here.' } });
        }
        if (!contact) {
            return response.status(400).json({ errors: { contact: 'Contact number is required.' } });
        }
        if (!date) {
            return response.status(400).json({ errors: { date: 'Please enter the date (MM/DD/YYYY).' } });
        }
        if (!time) {
            return response.status(400).json({ errors: { time: 'Please select a time (HH:MM AM/PM)' } });
        }
        if (!reason) {
            return response.status(400).json({ errors: { reason: 'Please provide a brief description of your appointment purpose.' } });
        }

        const today = new Date();
        const selectedDate = new Date(date);

        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return response.status(400).json({
                errors: { date: 'The selected date is in the past. Please choose a future date.' }
            });
        }

        const admin = await Admin.findById(selectedVetId);
        if (!admin) {
            return response.status(404).json({ errors: { selectedVetId: 'Veterinarian not found.' } });
        }

        const conflict = await Appointment.findOne({
            selectedVetId,
            date,
            time,
            status: "approved"
        });

        if (conflict) {
            return response.status(400).json({
                errors: { conflict: 'This time slot is already taken by another approved appointment.' }
            });
        }

        const appointment = new Appointment({
            selectedVetId,
            name,
            contact_number: contact,
            date,
            time,
            reason,
            status
        });

        await appointment.save();
        response.status(200).json({ message: "Appointment saved." });
    } catch (error) {
        console.error("Error occurred during sending appointment:", error);
        response.status(500).json({ message: "Server error" });
    }
});


module.exports = router;