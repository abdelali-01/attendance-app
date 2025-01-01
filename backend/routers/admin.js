import express, { Router } from "express";
import bcrypt from "bcryptjs";
import { Class } from "../models/Class.js";
import { Student } from "../models/Student.js";
import { Admin } from "../models/Admin.js";
import nodemailer from 'nodemailer';
import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

const adminRouter = express.Router();


// email setup
const transporter = nodemailer.createTransport({
  service : "gmail",
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASS, 
  },
});

// verify if the transporter work without errors
transporter.verify((error , success)=>{
  if(error){
    console.log( {"error" : error});
  }else{
    console.log(success);
  }
})

// create the signup system for the admin 
adminRouter.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    // check if the email exist 
    const exist = await Admin.findOne({email : data.email});
    // Validate input (e.g., check if email and password are provided)
    if (!data.email || !data.password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }else if(exist){
      return res.status(401).send("This email already exist !")
    }

    // Create a hashed password
    const salt = await bcrypt.genSalt(10)
    data.password = await bcrypt.hash(data.password, salt);

    // Generate verification token
    const verificationToken = jwt.sign({ email: data.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    data.verificationToken = verificationToken;

    // Create a new admin
    const admin = new Admin(data);

    // Save the new admin in the database
    await admin.save();

    // Create email to send it for verification
    const mailOption = {
      from: process.env.EMAIL,
      to: data.email,
      subject: 'Verify Your Email',
      html: `<h1>Please verify your email to complete your signup.</h1>
             <button>Click <a href="${process.env.BASE_URL}/admin/verify/${verificationToken}">here</a> to verify your account.</button>`,
    };

    // Send verification email
    try {
      await transporter.sendMail(mailOption);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return res.status(500).json({ error: 'Error sending verification email.' });
    }

    // Respond to the client
    res.status(200).json({ message: 'You have been registered! Please verify your email.' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(400).json({ error: 'An error occurred while processing your request.' });
  }
});


// email verification 
adminRouter.get('/verify/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({ email: decoded.email });

    if (!admin) return res.status(400).json({ error: 'Invalid token' });

    admin.isVerified = true;
    admin.verificationToken = null;
    await admin.save();

    res.status(200).send('Email verified successfully!');
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

// create the login system for the admin
adminRouter.post("/login", async (req, res) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(404).send("Your Email or password is incorrect!");
    }else if(!admin.isVerified){
      // generate a new verification token
      const verificationToken = jwt.sign({email : admin.email} , process.env.JWT_SECRET , {expiresIn : "1h"});
      admin.verificationToken = verificationToken ;

      await admin.save();

         // Create email options
        const mailOptions = {
          from: process.env.EMAIL,
          to: admin.email,
          subject: 'Verify Your Email',
          html: `<h1>Verify Your Email</h1>
                <a href="${process.env.BASE_URL}/admin/verify/${verificationToken}"><button className="btn btn-primary">Verify My Account</button></a>`,
        };

        try {
          await transporter.sendMail(mailOptions);
          return res.status(401).send("Your email is not verified. A verification email has been sent.");
        } catch (emailError) {
          console.error('Error sending verification email:', emailError);
          return res.status(500).json({ error: 'Error sending verification email.' });
        }
    }

    // Compare the valid password with the hashed one
    let validPass = await bcrypt.compare(req.body.password, admin.password);
    if (!validPass) {
      return res.status(404).send("Your Email or password is incorrect!");
    }

    res.status(200).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
});

// reset password 
adminRouter.post('/reset-pass' ,async (req , res)=>{
  try {
    const {email} = req.body ;

    const admin = await Admin.findOne({email : email});
    if(!admin){
      return res.status(404).send("No account found with that email address.")
    }

    // generate a reset token 
    const resetToken = jwt.sign(
      {email : admin.email} ,
      process.env.JWT_SECRET ,
      {expiresIn : "1h"} 
    );

    // the reset  link 
    const resetLink = `${process.env.BASE_URL}/admin/reset-pass/${resetToken}`

        // Create email content
    const mailOptions = {
          from: process.env.EMAIL,
          to: admin.email,
          subject: 'Password Reset Request',
          html: `
            <h1>Password Reset Request</h1>
            <p>You requested a password reset. Please click the link below to reset your password:</p>
            <a href="${resetLink}"><button>Reset Your Password</button></a>
            <p>If you did not request a password reset, please ignore this email.</p>
          `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("A password reset link has been sent to your email.");
    } catch (error) {
      return res.status(500).send("Error sending the password reset email.");
    }

  } catch (error) {
    res.status(400).send(error)
  }
});

adminRouter.post("/reset-pass/:token" , async (req ,res) => {
  try {
    const {token} = req.params ;
    const {password} = req.body ;

    // verify the token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({email : decoded.email});

    if(!admin && !decoded){
      return res.status(400).json({ error: 'Invalid token' });
    }

    // generate new hashed password 
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password , salt);

    await admin.save();

    res.status(200).send("Your password has been reset successfully.");
  } catch (error) {
    res.status(400).send(error);
  }
})

// create update profile for the admin
// >> this code work just with the first document in admins collection
adminRouter.put("/updateprofile", async (req, res) => {
  try {
    // create new crypted password if exist in the request
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // set all the changes on the admin profile
    await Admin.findOneAndUpdate({}, { $set: req.body });
    res.status(200).send("profile updated ");
  } catch (error) {
    res.status(400).send(error);
  }
});

// create the system of creating students accounts
adminRouter.post("/createStudentAccount", async (req, res) => {
  try {
    let data = req.body;

    // check if the matricule is already in use or not
    const existMatricule = await Student.findOne({matricule : data.matricule});
    if(!existMatricule){
      
    // create crypted password
    let salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    // create new student account
    const student = new Student(data);

    // save the student account in database
    const newStudent = await student.save();
    res.status(200).send(newStudent);
  }
    else{
      res.status(401).send("Matricule already in use , please choose another one")
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// update the student account if needed
adminRouter.put("/updateStudentAccount/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });

    res.status(200).send("student account updated");
  } catch (error) {
    res.status(200).send(error);
  }
});

// delete student account
adminRouter.delete("/deleteStudentAccount/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).send("student account deleted");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Set the absence for student
adminRouter.put("/absence/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    await Student.findByIdAndUpdate(req.params.id, { 
      absences: student.absences + 1 ,
      // And when the student is absent, the attendance mark is automatically reduced 
      attendanceMark : student.attendanceMark - 0.25 
    });

    res.status(200).send("Marked as absent successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

export default adminRouter;
