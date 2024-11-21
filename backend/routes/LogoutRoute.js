const express = require('express')
const router = express.Router();

router.post("/logout", (request, response) => {
    try {
        response.clearCookie('refreshToken');
        response.status(200).send('Logged out');
    } catch (error) {
        console.error("An error occured on api logout: ", error);
    }
});

module.exports = router;