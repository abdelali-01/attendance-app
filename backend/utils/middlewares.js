import { Class } from "../models/Class.js";
import { Student } from "../models/Student.js";
import { Teacher } from "../models/Teacher.js";
import { Payment } from "../models/Payments.js";
import { emailSender } from "./EmailSender.js";
import { subscriptionEndedTemplate } from "./EmailTemplates.js";

export const checkUserRole = (authorizedRole) => {
  return (req, res, next) => {
    if (req.user?.role === authorizedRole) {
      next();
    } else {
      console.log(req?.user);
      res.status(403).send("Access denied. Unauthorized role.");
    }
  };
};

export const checkClassLimit = async (req, res, next) => {
  try {
    const teacherId = req.session?.passport?.user || null;
    if (!teacherId) return res.status(401).send("Logged in first !");
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
      return res.status(403).json({
        reason: "plan",
        message: "Class limit reached for your plan",
      });
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
      return res.status(403).json({
        reason: "plan",
        messgae: "Class is full based on teacher subscription plan.",
      });
    }

    next(); // Proceed if within limit
  } catch (error) {
    console.error("Error in student limit middleware:", error);
    res.status(500).send("Internal server error");
  }
};

export const checkPlanDate = async (req, res, next) => {
  const teacherId = req.session?.passport?.user || null;
  if (!teacherId) return res.status(401).send("Logged in First!");

  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).send("Teacher not found!");

    if (teacher.plan === "free") return next(); // Free plan users continue

    // Find the latest valid payment for the teacher
    const findPayment = await Payment.findOne({
      teacherId,
      status: "paid", // Only successful payments
    }).sort({ createdAt: -1 }); // Get the latest payment

    if (!findPayment) return res.status(200).send("You are on the free plan");

    // Check if the plan is still valid
    const currentDate = new Date();
    const planExpiryDate = new Date(findPayment.planEndDate); // Ensure you store expiry date in the Payment model

    if (currentDate > planExpiryDate) {
      teacher.plan = "free";
      await teacher.save();

      // Send Email Notification
      try {
        await emailSender({
          email: teacher.email,
          subject: "Renew your subscription",
          html: subscriptionEndedTemplate(),
        });
      } catch (error) {
        console.log("Error during Sendig the ended subscription email", error);
      }

      return res.status(403).json({
        reason: "plan",
        message: "Your plan has expired. Please renew.",
      });
    }

    next(); // Payment is valid, continue to the next middleware
  } catch (error) {
    console.log("Error in checkPlanDate middleware", error);
    res.status(500).send("Internal server error");
  }
};
