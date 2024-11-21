const express = require('express');
const router = express.Router();
const Appointment = require('../models/AppointmentSchema');
const twilio = require('twilio');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const twilio_number = process.env.TWILIO_PHONENUMBER;

router.patch("/approveStatus/:id", async (request, response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                errors: { no_user: "No user found." }
            });
        }
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return response.status(400).json({
                errors: { no_appointment: "No Appointment found." }
            });
        }

        await Appointment.findByIdAndUpdate(
            id,
            { 
                status: 'approved',
                status_update_time: new Date()
            }
        );

        const readableDate = new Date(appointment.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });
          const readableTime = new Date(`1970-01-01T${appointment.time}`).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
          });

        const message = `${appointment.name}, ${readableDate} ${readableTime} Appointment Approved`;

        await client.messages.create({
            body: message,
            from: twilio_number,
            to: appointment.contact_number,
        });

        return response.status(200).json({ message: "Appointment Approved" });
    } catch (error) {
        return response.status(500).json({ message: "Server error", error });
    }
});

router.patch("/rejectStatus/:id", async (request, response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                errors: { no_user: "No user found." }
            });
        }
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return response.status(400).json({
                errors: { no_appointment: "No Appointment found." }
            });
        }

        await Appointment.findByIdAndUpdate(
            id,
            { 
                status: 'rejected',
                status_update_time: new Date()
            }
        );

        return response.status(200).json({ message: "Appointment Rejected"});
    } catch (error) {
        return response.status(500).json({ message: "Server error", error});
    }
});

module.exports = router;