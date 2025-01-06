const express = require('express');
const router = express.Router();
const Admin = require('../models/AdminSchema');
const Appointment = require('../models/AppointmentSchema');
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

        const opening = admin.clinic_schedule.opening_time;
        const closing = admin.clinic_schedule.closing_time;

        const base64Pic = admin.admin_info.profile_picture.toString('base64');
        return response.status(200).json({ 
            profile_pic_url: `data:image/jpeg;base64,${base64Pic}`,
            opening,
            closing
        });
    } catch (error) {
        console.error("Error occurred: ", error);
        return response.status(500).json({ message: "Server error", error });
    }
});

router.get("/clinicSched/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const admin = await Admin.findById(id);

        if (!admin) {
            return response.status(404).json({ message: "Admin not found." });
        }

        const openingTime = admin.clinic_schedule.opening_time;
        const closingTime = admin.clinic_schedule.closing_time;

        const opening = new Date(`1970-01-01T${openingTime}:00`);
        const closing = new Date(`1970-01-01T${closingTime}:00`);

        if (closing <= opening) {
            return response.status(400).json({ message: "Closing time must be after opening time." });
        }

        const appointments = await Appointment.find({
            selectedVetId: id,
            date: { $gte: new Date().toISOString().split("T")[0] }, 
            status: "approved",
        });

        const formatTime = (date) => {
            const hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const period = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            return `${formattedHours}:${minutes} ${period}`;
        };

        const takenSlots = appointments.map((appt) => formatTime(new Date(`1970-01-01T${appt.time}:00`)));

        const intervals = [];
        let current = new Date(opening);

        while (current < closing) {
            const next = new Date(current);
            next.setHours(current.getHours() + 1);

            if (next > closing) break;

            const timeSlot = `${formatTime(current)} - ${formatTime(next)}`;
            const isTaken = takenSlots.includes(formatTime(current));

            intervals.push({ timeSlot, isTaken });

            current = next;
        }

        return response.status(200).json(intervals);
    } catch (error) {
        console.error("Server Error:", error);
        return response.status(500).json({ message: "Server Error", error });
    }
});


module.exports = router;