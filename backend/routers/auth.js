import express from "express";
import bcrypt from "bcryptjs";
import { Student } from "../models/Student.js";
import { Admin } from "../models/Admin.js";
import { Auth } from "../models/Auth.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const authRouter = express.Router();
authRouter.use(cookieParser());

// email setup nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify if the transporter works without errors
transporter.verify((error, success) => {
  if (error) {
    console.log({ error });
  } else {
    console.log(success);
  }
});

// Signup route for both students and teachers
authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, role, name, familyName, matricule } = req.body;

    // Check if the email already exists
    const existingEmail = await Auth.findOne({ email });
    if (existingEmail) {
      return res.status(401).send("This email already exists!");
    }
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

    // save the user in the auths collection
    const auth = new Auth({
      email,
      password: hashedPassword,
      role,
    });
    await auth.save();
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
      user = new Admin({
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
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<h1>Please verify your email to complete your signup.</h1>
               <button>Click <a href="${process.env.BASE_URL}/verification/${verificationToken}">here</a> to verify your account.</button>`,
    };

    // Send verification email
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res
        .status(500)
        .json({ error: "Error sending verification email." });
    }

    // Respond to the client
    res
      .status(200)
      .json({ message: "You have been registered! Please verify your email." });
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
    const user =
      (await Student.findOne({ email: decoded.email })) ||
      (await Admin.findOne({ email: decoded.email }));

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
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    let user;
    user = await Admin.findOne({ email });
    if (!user) {
      user = await Student.findOne({ email });
      if (!user) {
        return res.status(404).send("Your email or password is incorrect!");
      }
    }

    // Check if the user's email is verified
    // if (!user.isVerified) {
    //   const verificationToken = jwt.sign(
    //     { email: user.email },
    //     process.env.JWT_SECRET,
    //     { expiresIn: "1h" }
    //   );
    //   user.verificationToken = verificationToken;
    //   await user.save();

    //   const mailOptions = {
    //     from: process.env.EMAIL,
    //     to: user.email,
    //     subject: "Verify Your Email",
    //     html: `<h1>Verify Your Email</h1>
    //              <a href="${process.env.BASE_URL}/verification/${verificationToken}"><button>Verify My Account</button></a>`,
    //   };

    //   try {
    //     await transporter.sendMail(mailOptions);
    //     return res
    //       .status(401)
    //       .send(
    //         "Your email is not verified. A verification email has been sent."
    //       );
    //   } catch (emailError) {
    //     console.error("Error sending verification email:", emailError);
    //     return res
    //       .status(500)
    //       .json({ error: "Error sending verification email." });
    //   }
    // }

    // generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
      path: "/",
    });

    // Compare the valid password with the hashed one
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(404).send("Your email or password is incorrect!");
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("error durring the login", error);
    res.status(400).send(error);
  }
});

authRouter.get("/user", async (req, res) => {
  // Get the token from the cookie
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find the user for send the data
    let userData;
    if (decoded.role === "teacher") {
      userData = await Admin.findOne({ _id: decoded.userId });
    } else {
      userData = await Student.findOne({ _id: decoded.userId });
    }

    // check if there is user or not
    if (!userData) {
      return res.status(404).send("User not found !");
    }

    // remove the sensitive data from the userData object
    const { password, _id, verificationToken, ...otherData } = userData._doc;

    // Send the user data back in the response
    res.json({
      userId: decoded.userId,
      role: decoded.role,
      userData: otherData,
    });
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid token");
  }
});

// reset password
authRouter.post("/reset-pass", async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    let student;
    if (!admin) {
      student = await Student.findOne({ email });
      if (!student) {
        return res
          .status(404)
          .send("No account found with that email address.");
      }
    }

    // generate a reset token
    const resetToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // the reset  link
    const resetLink = `${process.env.BASE_URL}/reset-pass/${resetToken}`;

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `
            <h1>Password Reset Request</h1>
            <p>You requested a password reset. Please click the link below to reset your password:</p>
            <a href="${resetLink}"><button>Reset Your Password</button></a>
            <p>If you did not request a password reset, please ignore this email.</p>
          `,
    };

    try {
      await transporter.sendMail(mailOptions);
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
    const auth = await Auth.findOne({ email: decoded.email });
    let user;

    if (!auth && !decoded) {
      return res.status(400).json({ error: "Invalid token" });
    }
    if (auth.role === "teacher") {
      user = await Admin.findOne({ email: decoded.email });
    } else {
      user = await Student.findOne({ email: decoded.email });
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

authRouter.post("/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  res.status(200).send("Logged out successfully!");
});

// update the account
authRouter.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { role } = req.query;
  const data = req.body;
  try {
    // generate new password if exist in the data
    if (data.password !== "" && data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }else{
      delete data.password ;
    }
    // find the user based on his id
    let user;
    // check the user role to know from where we bring the user
    if (role === "teacher") {
      user = await Admin.findByIdAndUpdate(id, { $set: data });
    } else {
      user = await Student.findByIdAndUpdate(id, { $set: data });
    }

    if(!user){
      return res.status(404).send("user not found !");
    }

    res.status(200).send("account updated successfully");
  } catch (error) {
    console.error("error during updating the account", error);
    res.status(400).send(error);
  }
});

export default authRouter;
