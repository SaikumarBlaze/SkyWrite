import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Create an OTP schema
const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: false, // Email can have multiple OTPs (e.g., if requested multiple times)
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 300, // TTL of 5 minutes (300 seconds) for automatic deletion
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// Create an OTP model
export default mongoose.model('Otp', otpSchema);
