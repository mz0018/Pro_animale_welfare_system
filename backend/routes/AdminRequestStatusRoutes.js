const express = require('express');
const router = express.Router();
const Admin = require('../models/AdminSchema');
const twilio = require('twilio');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
const twilio_number = process.env.TWILIO_PHONENUMBER;

router.patch("/approve-request/:id", async (request, response) => {
    try {

        const admin = await Admin.findById(request.params.id);

        await Admin.findByIdAndUpdate(
            request.params.id,
            { request_status: 'approved' }
        );

        const name = admin.admin_name.toUpperCase();

        const message = `${name}, your account for the PAWS Pro Welfare Animal System has been approved.`;

        await client.messages.create({
            body: message,
            from: twilio_number,
            to: admin.contact_number,
        });

        response.status(201).json({ message: "Request Approved."});
    } catch (error) {
        console.error("Error: ", error);
        throw(error);
    }
}); 

router.patch("/reject-request/:id", async (request, response) => {
    try {
        await Admin.findByIdAndUpdate(
            request.params.id,
            { request_status: 'rejected'}
        );

        response.status(201).json({ message: "Request Rejected."});
    } catch (error) {
        console.error("Error: ", error);
        throw(error);
    }
});

module.exports = router;