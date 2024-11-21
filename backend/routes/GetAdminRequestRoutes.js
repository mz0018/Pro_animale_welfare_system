const express = require('express');
const router = express.Router();
const AdminRequest = require('../models/AdminSchema');

router.get("/request", async (request, response) => {
    try {
        const incomingRequest = await AdminRequest.find({ request_status: 'pending' });
        response.status(201).json({
            message: "fetch incoming request success",
            incomingRequest
        })
    } catch (error) {
        console.error("Error occured get incoming request", error);
        throw(error);
    }
});

router.get("/approved-request", async (request, response) => {
    try {
        const approvedRequest = await AdminRequest.find({ request_status: 'approved' });
        response.status(201).json({
            message: "fetch approved request success",
            approvedRequest
        })
    } catch (error) {
        console.error("Error: ", error);
        throw(error);
    }
})
module.exports = router;