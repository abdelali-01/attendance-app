import express from "express";
import { Student } from "../models/Student.js";
import { Teacher } from "../models/Teacher.js";
import dotenv from "dotenv";
import {
  checkClassLimit,
  checkStudentLimit,
  checkUserRole,
} from "../utils/middlewares.js";
import { Class } from "../models/Class.js";
dotenv.config();

const router = express.Router();

// GET methods >>>

// Get the list of students by their class
router.get(
  "/studentsList/:classId",
  checkUserRole("teacher"),
  async (req, res) => {
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
  }
);

// get the classes list of the student
router.get("/classes/:studentId", async (req, res) => {
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

// get student with his id
router.get("/:id", async (req, res) => {
  const { classId } = req.query;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    const currentClass = student.classes.find((c) => c.classId === classId);
    res.status(200).json({ student, currentClass });
  } catch (error) {
    res.status(400).send(error);
  }
});

// PUT methods >>>

// Allow the students to check their attendance
router.put("/checkattendance/:id", async (req, res) => {
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

// update the student mark if needed
router.put(
  "/updateStudentMark/:id",
  checkUserRole("teacher"),
  async (req, res) => {
    const { classId, absences } = req.body;
    try {
      const student = await Student.findById(req.params.id);

      const currentClass = student.classes.find((c) => c.classId === classId);
      currentClass.absences = absences;

      student.save();
      res.status(200).send("student mark updated");
    } catch (error) {
      res.status(200).send(error);
    }
  }
);

// Set the absence for student
router.put("/absence/:id", checkUserRole("teacher"), async (req, res) => {
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

// enter in some class with the shareCode
router.put(
  "/enter/:studentId",
  checkUserRole("student"),
  checkStudentLimit,
  async (req, res) => {
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
        (classItem) =>
          classItem.classId.toString() === sharedClass._id.toString()
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
  }
);

// unenroll class
router.put(
  "/unenroll/:studentId",
  checkUserRole("student"),
  async (req, res) => {
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
      console.error("error during unroll the class", error);
      res.status(400).send(error);
    }
  }
);

// reset all absences from the teacher
router.put("/reset/:classId", checkUserRole("teacher"), async (req, res) => {
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
          classItem.absences = 0; // Reset the absences to 0
        }
      });

      // Save the updated student document
      await student.save(); // You need to `await` save to ensure it's done before moving to the next student
    });

    res.status(200).send("success");
  } catch (error) {
    res.status(400).send(error);
  }
});

// update the account
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { role } = req.query;
  const data = req.body;
  try {
    // generate new password if exist in the data
    if (data.password !== "" && data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    } else {
      delete data.password;
    }
    // find the user based on his id
    let user;
    // check the user role to know from where we bring the user
    if (role === "teacher") {
      user = await Teacher.findByIdAndUpdate(id, { $set: data });
    } else {
      user = await Student.findByIdAndUpdate(id, { $set: data });
    }

    if (!user) {
      return res.status(404).send("user not found !");
    }

    res.status(200).send("account updated successfully");
  } catch (error) {
    console.error("error during updating the account", error);
    res.status(400).send(error);
  }
});

export default router;
