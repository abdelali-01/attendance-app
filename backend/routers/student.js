import express from "express";
import { Student } from "../models/Student.js";
import bcrypt from "bcryptjs";
import { Class } from "../models/Class.js";
import mongoose from "mongoose";

const studentRouter = express.Router();

// enter in some class with the shareCode
studentRouter.put("/enter/:studentId", async (req, res) => {
  try {
    const { shareCode } = req.body;

    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).send("student not found !");
    }

    // find the class by the shareCode
    const sharedClass = await Class.findOne({ shareCode });
    if (!sharedClass) {
      return res.status(404).send("Code Invalid !");
    }

    // Check if the student is already enrolled in the class by matching classId
    const existingClass = student.classes.find(
      (classItem) => classItem.classId.toString() === sharedClass._id.toString()
    );

    if (!existingClass) {
      // Push the new class object into the student's classes array
      student.classes.push({
        classId: sharedClass._id,
        module: sharedClass.module,
      });

      // Save the student document with the updated classes array
      await student.save();

      return res.status(200).send("Successfully entered the class.");
    } else {
      return res.status(400).send("You are already enrolled in this class.");
    }
  } catch (error) {
    console.error("error during enter the class", error);
    res.status(400).send(error);
  }
});

// Get the list of students by their class
studentRouter.get("/studentsList/:classId", async (req, res) => {
  try {
    // Find all students whose `classes` array contains the `classId`
    const studentsList = await Student.find({
      "classes.classId": req.params.classId,
    });
    res.status(200).send(studentsList);
  } catch (error) {
    console.error("error during get the class list", error);
    res.status(400).send(error);
  }
});

// get the list of the classes of student
studentRouter.get("/classes/:studentId", async (req, res) => {
  const { studentId } = req.params;
  
  try {
    const student = await Student.findOne({_id : studentId});
    res.status(200).send(student.classes);
  } catch (error) {
    console.error("error during get the studentClasses", error);
    res.status(400).send(error);
  }
});
// update password account from student
studentRouter.put("/updatepass/:id", async (req, res) => {
  if (req.body.studentId === req.params.id) {
    try {
      let data = req.body;

      // generate new crypted password
      let salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);

      // find the student and update his password
      await Student.findByIdAndUpdate(req.params.id, {
        password: data.password,
      });

      res.status(200).send("Password updated successfully");
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(401).send("you can update only your account");
  }
});

// Allow the students to check their attendance
studentRouter.put("/checkattendance/:id", async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send("student not found !");
    }

    const studentClass = await Class.findOne({ class: student.class });
    if (studentClass.posibility) {
      await Student.findByIdAndUpdate(req.params.id, {
        attendance: student.attendance + 1,
      });
      res.status(200).send("Marked as present successfully");
    } else {
      res.status(401).send("The class is closed. Please try again later.");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// get student with his matricule
studentRouter.get("/:matricule", async (req, res) => {
  try {
    const student = await Student.findOne({ matricule: req.params.matricule });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// reset all absences from the teacher
studentRouter.put("/reset/:class", async (req, res) => {
  try {
    await Student.updateMany(
      { class: req.params.class },
      { absences: 0, attendanceMark: 5 }
    );

    res.status(200).send("success");
  } catch (error) {
    res.status(400).send(error);
  }
});

export default studentRouter;
