import express from "express";
import User from "../models/User.js";
import Note from "../models/Note.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchUser from "../middlewares/fetchuser.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env.local or .env

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
      .withMessage("Password must be at least 6 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain a special character"),
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

// Route 2: Authenticate a User using POST "/api/auth/login" - No login required
router.post(
  "/login",
  [
    // Validate login credentials
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").exists().withMessage("Password cannot be empty"),
  ],
  async (req, res) => {
    let success = false;
    try {
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
      res.status(201).json({
        success,
        message: "Logged in successfully!",
        authToken,
        name: user.name,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success, message: "Internal Server Error!", error });
    }
  }
);

// Route 3: Get logged in User details using GET "/api/auth/getuser" - Login required
router.get("/getuser", fetchUser, async (req, res) => {
  let success = false;
  try {
    // Retrieve user ID from the JWT (set by fetchUser middleware)
    const userId = req.user.id;

    // Find user by ID and exclude the password field from the response
    const user = await User.findById(userId).select("-password");

    // Send the user details as a response
    res.status(201).json({ success, user });
  } catch (error) {
    res.status(400).json({ success, message: "Internal Server Error!", error });
  }
});

// Route 4: Verify email for reseting the password using POST "/api/auth/account/verify-email" - No login required
router.post(
  "/account/verify-email",
  [body("email").isEmail().withMessage("Invalid email address")],
  async (req, res) => {
    let success = false;
    try {
      const result = validationResult(req);

      // Check for validation errors and return if any
      if (!result.isEmpty()) {
        return res.status(400).json({ success, errors: result.array() });
      }

      const { email } = req.body;

      // Check if user exists with the provided email
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          message: "Email doesn't exits!",
        });
      }

      // Send a success response with the token
      success = true;
      res.status(201).json({
        success,
        message: "Email Verified!",
        name: user.name,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success, message: "Internal Server Error!", error });
    }
  }
);

// Route 5: Reseting the password using POST "/api/auth/account/reset-password" - No login required
router.post(
  "/account/reset-password",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain a special character"),
  ],
  async (req, res) => {
    let success = false;
    try {
      const result = validationResult(req);

      // Check for validation errors and return if any
      if (!result.isEmpty()) {
        return res.status(400).json({ success, errors: result.array() });
      }

      const { email, password } = req.body;

      // Get the user with the verified email
      let user = await User.findOne({ email });

      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);

      // Save the new user password in the database
      user.password = securedPass;
      user.save();

      // Create JWT token after successful login
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret);

      // Send a success response with the token
      success = true;
      res.status(201).json({
        success,
        message: "Password Changed successfully!",
        authToken,
      });
    } catch (error) {
      res
        .status(400)
        .json({ success, message: "Internal Server Error!", error });
    }
  }
);

// Route 6: Edit user details using POST "/api/auth/account/edit" - login required
router.post(
  "/account/edit",
  [
    // Validate user input
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/\d/)
      .withMessage("Password must contain a number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain a special character"),
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
      let user = await User.findOne({ email: req.body.oldEmail });

      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);

      // Save the new user detials in the database
      user.name = req.body.name;
      user.email = req.body.email;
      user.password = securedPass;
      user.save();

      // Send a success response with the token
      success = true;
      res.status(201).json({ success, message: "Changes saved successfully!" });
    } catch (error) {
      res
        .status(400)
        .json({ success, message: "Internal Server Error!", error });
    }
  }
);

// Route 7: Delete an existing user using DELETE "/api/auth/deleteuser/:id" - No Login required
router.delete("/deleteuser/:id", async (req, res) => {
  let success = false;
  try {
    // Delete all notes associated with the user
    await Note.deleteMany({ user: req.params.id });

    // Delete the user account
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // Send a success response with the deleted note data
    success = true;
    res
      .status(201)
      .json({ success, message: "Account deleted successfully!", deletedUser });
  } catch (error) {
    res.status(400).json({ success, message: "Internal Server Error!", error });
  }
});

router.get("/ping", async (req, res) => {
  try {
    res.status(200).json({
      message:
        "Keeping the server awake by preventing it from going inactive using UptimeRobot!",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!", error });
  }
});

export default router;
