import express from "express";
import bcrypt from "bcryptjs";
import { Student } from "../models/Student.js";
import { Teacher } from "../models/Teacher.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import { emailSender } from "../utils/EmailSender.js";
import {
  emailVerificationTemplate,
  resetPasswordTemplate,
} from "../utils/EmailTemplates.js";
import passport from "passport";
import "../stratigies/local.js";
dotenv.config();

const authRouter = express.Router();

// Signup route for both students and teachers
authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, role, name, familyName, matricule } = req.body;

    // Check if the email already exists
    // let existUser =
    //   (await Student.findOne({ email: decoded.email })) ||
    //   (await Teacher.findOne({ email: decoded.email }));

    // if (existUser) return res.status(401).send("Email Already used !");

    // Check if the matricule already exists
    if (matricule) {
      const existingMatricule = await Student.findOne({ matricule });
      if (existingMatricule) {
        return res.status(401).send("This matricule already exists!");
      }
    }

    // Create a hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Determine the user model based on the role
    let user;
    if (role === "student") {
      user = new Student({
        email,
        password: hashedPassword,
        role,
        name,
        familyName,
        matricule,
        verificationToken,
      });
    } else {
      user = new Teacher({
        email,
        password: hashedPassword,
        role,
        name,
        familyName,
        verificationToken,
      });
    }

    // Save the new user in the database
    await user.save();

    // Create email to send it for verification
    const html = emailVerificationTemplate(verificationToken);

    // Send verification email
    try {
      await emailSender({
        email,
        subject: "Verify Your Email",
        html,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res
        .status(500)
        .json({ error: "Error sending verification email." });
    }

    // Respond to the client
    res
      .status(200)
      .json({ message: "You have been registered! Please check your email." });
  } catch (error) {
    console.error("Error during signup:", error);
    res
      .status(400)
      .json({ error: "An error occurred while processing your request." });
  }
});

// Email verification route
authRouter.get("/verify/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const emailField = decoded.email ? "email" : "username";
    const user =
      (await Student.findOne({ email: decoded[emailField] })) ||
      (await Teacher.findOne({ email: decoded[emailField] }));

    if (!user) return res.status(400).json({ error: "Invalid token" });

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).send("Email verified successfully!");
  } catch (error) {
    console.error("error during the email verification ", error);
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

// Login route for both students and teachers
authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {

    if (err) {
      return res.status(500).json({ message: "Internal server error", error: err.message });
    }

    if (!user) {
      return res.status(info?.status || 401).json({ message: info?.message || "Authentication failed" });
    }

    // Store `info` in `req.authInfo` so it can be used in other middleware
    req.authInfo = info;

    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ message: "Login failed", error: loginErr.message });
      }

      return res.status(200).json({ message: "Login successful", user, info: req.authInfo });
    });
  })(req, res, next);
});

authRouter.get("/user", async (req, res) => {
  const userId = req.session?.passport?.user;

  try {
    if (!userId) return res.status(401).send("You have To Logged in !");

    const findUser =
      (await Teacher.findById(userId)) || (await Student.findById(userId));
    if (!findUser) return res.status(404).send("User Not Found !");

    const {
      password,
      verificationToken,
      resetPasswordToken,
      resetPasswordExpires,
      ...otherData
    } = findUser._doc;

    res.status(200).send(otherData);
  } catch (error) {
    console.log("Error getting The user !", error);
    res.sendStatus(400);
  }
});

// reset password
authRouter.post("/reset-pass", async (req, res) => {
  try {
    const { email } = req.body;

    const user =
      (await Student.findOne({ email })) || (await Teacher.findOne({ email }));
    if (!user) {
      return res.status(404).send("No account found with that email address.");
    }

    // generate a reset token
    const resetToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // the reset  link
    const resetLink = `${process.env.BASE_URL}reset-pass/${resetToken}`;
    try {
      await emailSender({
        email,
        subject: "Reset Your Password",
        html: resetPasswordTemplate(resetLink),
      });
      res
        .status(200)
        .send("A password reset link has been sent to your email.");
    } catch (error) {
      return res.status(500).send("Error sending the password reset email.");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

authRouter.post("/reset-pass/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user =
      (await Teacher.findOne({ email: decoded.email })) ||
      (await Student.findOne({ email: decoded.email }));

    if (!user || !decoded) {
      return res.status(400).json({ error: "Invalid token" });
    }

    // generate new hashed password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(200).send("Your password has been reset successfully.");
  } catch (error) {
    res.status(400).send(error);
  }
});

authRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Failed to destroy session" });
      }

      res.clearCookie("connect.sid"); // Default session cookie name
      console.log('success');
      
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

export default authRouter;
