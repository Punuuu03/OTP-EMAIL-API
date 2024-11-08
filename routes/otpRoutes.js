const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');

// Route to send OTP
router.post('/send-otp', otpController.sendOtp);

module.exports = router;
