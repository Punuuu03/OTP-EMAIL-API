import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import otpRoutes from './routes/otpRoutes.js'; // Add `.js` extension for ES modules

dotenv.config();

const app = express();

// Enable CORS with the correct configuration
app.use(cors({
  origin: ["http://localhost:1732", "https://otp-email-client.vercel.app", "http://localhost:8082"], // Replace with your frontend URLs
  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers if needed
  credentials: true, // Enable credentials for cross-origin
}));

// Middleware to parse JSON body
app.use(express.json()); // Built-in Express middleware for JSON parsing
app.use('/api', otpRoutes); // Set up the OTP routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
