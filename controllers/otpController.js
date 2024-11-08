import dotenv from 'dotenv';
import Otp from '../models/Otp.js'; // Update the path if necessary
import nodemailer from 'nodemailer';
import crypto from 'crypto';

dotenv.config();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Controller function to send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send({ message: 'Email is required' });

  try {
    // Generate a 4-digit OTP
    const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpires = new Date(Date.now() + 60 * 1000); // 1-minute expiration

    // Save or update OTP
    await Otp.findOneAndUpdate(
      { email },
      { otp, otpExpires },
      { upsert: true, new: true }
    );

    // Send the OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It will expire in 1 minute.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to send OTP' });
  }
};
