const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    response.send("API is running...");
});

module.exports = router;