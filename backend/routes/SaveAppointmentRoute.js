const express = require('express');
const router = express.Router();
const Appointment = require('../models/AppointmentSchema');

router.post("/sendAppointment", async (request, response) => {
    try {
        const { selectedVetId, name, contact, date, time, reason, status } = request.body;

        if (!selectedVetId) {
            return response.status(400).json({ errors: { selectedVetId: 'Please select a veterinarian.' }});
        }
        if (!name) {
            return response.status(400).json({ errors: { name: 'Please enter your name here.' }});
        }
        if (!contact) {
            return response.status(400).json({ errors: { contact: 'Contact number is required.'}});
        }
        if (!date) {
            return response.status(400).json({ errors: { date: 'Please enter the date (MM/DD/YYYY).' }})
        }
        if (!time) {
            return response.status(400).json({ errors: { time: 'Please select a time (HH:MM AM/PM)' }})
        }
        if (!reason) {
            return response.status(400).json({ errors: { reason: 'Please provide a brief description of your appointment purpose.'}})
        }
        
        const appointment = new Appointment({
            selectedVetId: selectedVetId,
            name: name,
            contact_number: contact,
            date: date,
            time: time,
            reason: reason,
            status: status
        });

        await appointment.save();
        response.status(200).json({ message: "Appointment saved." });
    } catch (error) {
        console.error("Error occured during sending appointment ", error);
        response.status(500).json({ message: "Server error"});
    }
});

module.exports = router;