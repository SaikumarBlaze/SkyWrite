import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchUser from "../middlewares/fetchuser.js";
import dotenv from "dotenv";
// import crypto from "crypto";
// import nodemailer from "nodemailer";
// import Otp from "../models/Otp.js";

dotenv.config();
// Load environment variables from .env.local or .env

const router = express.Router();
const secret = process.env.JWT_SECRET;

// Route 1: Create a User using POST "/api/auth/createuser" - No login required
router.post(
  "/createuser",
  [
    // Validate user input
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    let success = false;
    try {
      const result = validationResult(req);

      // Check for validation errors and return if any
      if (!result.isEmpty()) {
        return res.status(400).json({ success, errors: result.array() });
      }

      // Check if user with the same email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, message: "Email already exists!" });
      }

      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);

      // Create and save the new user in the database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });

      // Create a JWT token for the user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret);

      // Send a success response with the token
      success = true;
      res
        .status(201)
        .json({ success, message: "User created successfully!", authToken });
    } catch (error) {
      res
        .status(400)
        .json({ success, message: "Internal Server Error!", error });
    }
  }
);

/*
// Route: Generate Otp using POST "/api/auth/sentotp" - No login required
router.post('/sendotp', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email is already registered in users collection
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email already exists!' });
    }

    // Generate a random 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Create a new OTP document with a 5-minute expiration time
    const otpEntry = new Otp({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Expires in 5 minutes
    });

    await otpEntry.save(); // Save OTP in the database

    // Send the OTP to the user's email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// Route 3: Verify Otp using POST "/api/auth/verifyotp" - No login required
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the OTP document by email and check if it matches and hasn't expired
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid OTP!' });
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < Date.now()) {
      return res.status(400).json({ success: false, message: 'OTP has expired!' });
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    res.status(200).json({ success: true, message: 'OTP verified successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});
*/

// Route 4: Authenticate a User using POST "/api/auth/login" - No login required
router.post(
  "/login",
  [
    // Validate login credentials
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").exists().withMessage("Password cannot be empty"),
  ],
  async (req, res) => {
    try {
      let success = false;
      const result = validationResult(req);

      // Check for validation errors and return if any
      if (!result.isEmpty()) {
        return res.status(400).json({ success, errors: result.array() });
      }

      const { email, password } = req.body;

      // Check if user exists with the provided email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          message: "Try to log in again with correct credentials!",
        });
      }

      // Compare provided password with the stored hashed password
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(400).json({
          success,
          message: "Try signing in again with correct credentials!",
        });
      }

      // Create JWT token after successful login
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret);

      // Send a success response with the token
      success = true;
      res
        .status(201)
        .json({ success, message: "Logged in successfully!", authToken });
    } catch (error) {
      res
        .status(400)
        .json({ success, message: "Internal Server Error!", error });
    }
  }
);

// Route 5: Get logged in User details using GET "/api/auth/getuser" - Login required
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    // Retrieve user ID from the JWT (set by fetchUser middleware)
    const userId = req.user.id;

    // Find user by ID and exclude the password field from the response
    const user = await User.findById(userId).select("-password");

    // Send the user details as a response
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error!", error });
  }
});

export default router;
