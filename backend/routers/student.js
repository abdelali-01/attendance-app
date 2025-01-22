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
        d_AttendanceMark: sharedClass.d_AttendanceMark,
        attendanceMark: sharedClass.d_AttendanceMark,
        minusWithAbsence: sharedClass.minusWithAbsence,
      });

      // Save the student document with the updated classes array
      await student.save();

      return res.status(200).send("Successfully entered the class.");
    } else {
      return res.status(401).send("You are already enrolled in this class.");
    }
  } catch (error) {
    console.error("error during enter the class", error);
    res.status(400).send(error);
  }
});

// unenroll class
studentRouter.put("/unenroll/:studentId", async (req, res) => {
  try {
    const { classId } = req.body;

    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).send("student not found !");
    }

    // find the class by the shareCode
    const sharedClass = await Class.findOne({ _id: classId });
    if (!sharedClass) {
      return res.status(404).send("Class not found !");
    }

    // rmove the class object from the student's classes array
    student.classes.pull({ classId });

    // Save the student document with the updated classes array
    await student.save();

    return res.status(200).send("Successfully unenroll the class.");
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

// get the classes list of the student
studentRouter.get("/classes/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findOne({ _id: studentId });
    const studentClasses = await Promise.all(
      student.classes.map(async (classe) => {
        return await Class.findById(classe.classId);
      })
    );

    res.status(200).send(studentClasses);
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
  const { classId } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }

    const currentClass = student.classes.find((c) => c.classId === classId);
    currentClass.attendances += 1;

    student.save();
    res.status(200).send("Marked as absent successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

// get student with his id
studentRouter.get("/:id", async (req, res) => {
  const { classId } = req.query;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    const currentClass = student.classes.find((c) => c.classId === classId);
    res.status(200).json({student , currentClass});
  } catch (error) {
    res.status(400).send(error);
  }
});

// reset all absences from the teacher
studentRouter.put("/reset/:classId", async (req, res) => {
  try {
    const currentClass = await Class.findById(req.params.classId);
    if (!currentClass) {
      return res.status(404).send("class not found !");
    }

    const students = await Student.find({
      "classes.classId": req.params.classId,
    });
    
    students.forEach(async (student) => {
      // Loop through the student's classes and reset absences for the class with matching classId
      student.classes.forEach((classItem) => {
        if (classItem.classId === req.params.classId) {
          classItem.absences = 0;  // Reset the absences to 0
        }
      });
    
      // Save the updated student document
      await student.save();  // You need to `await` save to ensure it's done before moving to the next student
    });

    res.status(200).send("success");
  } catch (error) {
    res.status(400).send(error);
  }
});

export default studentRouter;
