import express, { Router } from "express";
import bcrypt from "bcrypt";
import { Class } from "../models/Class.js";
import { Student } from "../models/Student.js";
import { Admin } from "../models/Admin.js";

const adminRouter = express.Router();

// create the signup system for the admin < just for create the admin account and crypted password>
adminRouter.post("/signup", async (req, res) => {
  try {
    let data = req.body;

    // create  crypted  password of the admin
    let salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    // create a new admin
    const admin = new Admin(data);

    // save the new admin in database
    const newAdmin = await admin.save();
    res.status(200).send(newAdmin);
  } catch (error) {
    res.status(400).send(error);
  }
});

// create the login system for the admin
adminRouter.post("/login", async (req, res) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(404).send("Your Email or password is incorrect!");
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

    // create crypted password
    let salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    // create new student account
    const student = new Student(data);

    // save the student account in database
    const newStudent = await student.save();
    res.status(200).send(newStudent);
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
