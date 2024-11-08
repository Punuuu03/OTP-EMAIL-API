import express from 'express';
import { sendOtp } from '../controllers/otpController.js'; // Import the sendOtp function

const router = express.Router();

// Route to send OTP
router.post('/send-otp', sendOtp);

export default router; // Use export default to export the router
