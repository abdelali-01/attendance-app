import express from "express";
import bcrypt from "bcryptjs";
import { Student } from "../models/Student.js";
import { Teacher } from "../models/Teacher.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// the admin is the teacher

// create update profile for the admin
// >> this code work just with the first document in admins collection
router.put("/updateprofile", async (req, res) => {
  try {
    // create new crypted password if exist in the request
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    // set all the changes on the admin profile
    await Teacher.findOneAndUpdate({}, { $set: req.body });
    res.status(200).send("profile updated ");
  } catch (error) {
    res.status(400).send(error);
  }
});

// update the student account if needed
router.put("/updateStudentMark/:id", async (req, res) => {
  const { classId , absences} = req.body;
  try {
    const student = await Student.findById(req.params.id);
    
    const currentClass = student.classes.find(c => c.classId === classId);
    currentClass.absences = absences ;

    student.save();
    res.status(200).send("student mark updated");
  } catch (error) {
    res.status(200).send(error);
  }
});


// Set the absence for student
router.put("/absence/:id", async (req, res) => {
  const { classId } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }

    const currentClass = student.classes.find((c) => c.classId === classId);
    currentClass.absences += 1;

    student.save();
    res.status(200).send("Marked as absent successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
