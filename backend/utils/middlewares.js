import { Class } from "../models/Class.js";
import { Student } from "../models/Student.js";
import { Teacher } from "../models/Teacher.js";

export const checkUserRole = (authorizedRole) => {
  return (req, res, next) => {
    if (req.user?.role === authorizedRole) {
      next();
    } else {
      res.status(403).send("Access denied. Unauthorized role.");
    }
  };
};

export const checkClassLimit = async (req, res, next) => {
  try {
    const teacherId = req.session?.passport?.user || null;
    if(!teacherId) return res.status(401).send('Logged in first !');
    // Fetch teacher's subscription plan (Assuming you have a Teacher model)
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }

    // Define class limits based on the plan
    const planLimits = {
      free: 1,
      standard: 3,
      premium: Infinity, // No limit
    };

    // Get current class count for the teacher
    const classCount = await Class.countDocuments({ teacherId });

    // Check if the teacher has reached their limit
    if (classCount >= planLimits[teacher.plan]) {
      return res.status(403).send("Class limit reached for your plan");
    }

    next(); // Proceed if within limit
  } catch (error) {
    console.error("Error in class limit middleware:", error);
    res.status(500).send("Internal server error");
  }
};

export const checkStudentLimit = async (req, res, next) => {
  try {
    const { shareCode } = req.body;

    // Find the class by shareCode
    const sharedClass = await Class.findOne({ shareCode });
    if (!sharedClass) {
      return res.status(404).send("Code Invalid !");
    }

    // Fetch the teacher's subscription plan
    const teacher = await Teacher.findById(sharedClass.teacherId);
    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }

    // Define student limits based on the plan
    const planLimits = {
      free: 15,
      standard: 45,
      premium: Infinity, // No limit
    };

    // Get the current number of students in the class
    const studentCount = await Student.countDocuments({
      "classes.classId": sharedClass._id,
    });

    // Check if the class has reached the student limit
    if (studentCount >= planLimits[teacher.plan]) {
      return res
        .status(403)
        .send("Class is full based on teacher subscription plan.");
    }

    next(); // Proceed if within limit
  } catch (error) {
    console.error("Error in student limit middleware:", error);
    res.status(500).send("Internal server error");
  }
};
