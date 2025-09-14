import express from "express";
import { Report } from "../models/Report.js";
import { Teacher } from "../models/Teacher.js";
import { Student } from "../models/Student.js";
import { checkUserRole } from "../utils/middlewares.js";

const reportRouter = express.Router();

// post or share the report
reportRouter.post("/", async (req, res) => {
  const { report, classes } = req.body;
  const teacherId = req.session?.passport?.user || null;

  try {
    // find the teacher by his id
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).send("teacher not found !");
    }

    // create new report if the teacher exist / the teacherId is valid
    const savedReport = new Report({
      teacherId: teacherId,
      report,
      classes,
    });
    await savedReport.save();

    res.status(200).send("report shared successfully");
  } catch (error) {
    console.error("error during share the report", error);
    res.status(400).send(error);
  }
});

reportRouter.delete("/:id", checkUserRole("teacher") , async (req, res) => {
  try {
    const findReport = await Report.findById(req.params.id);
    if(!findReport) return res.status(404).json({success : false , message : "Report not found !"});

    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({success : true , message : "Report has been deleted succesfully"});
  } catch (error) {
    console.log("Error during deleting the report " ,error);
    res.sendStatus(500);
  }
});

// getting the user reports
reportRouter.get("/", async (req, res) => {
  const userId = req.session?.passport?.user || null;
  try {
    // check the user if exist / the userId is valid
    const user = await Teacher.findById(userId) || await Student.findById(userId);
    if (!user) {
        return res.status(404).send("user not found !");
    }

    if (user.role === "teacher") {
      // find the teacher reports based on his id
      const reports = await Report.find({ teacherId: userId }).sort({createdAt : -1});
      res.status(200).send(reports);
    } else {
      const reports = await Promise.all(
        user.classes.map(async (c) => {
          return await Report.find({ classes: { $in: [c.classId] } });
        })
      );
      const flattenedReports = reports.flat();

      // Now, for each report, find the teacher and combine them
      const reportsWithTeachers = await Promise.all(
        flattenedReports.map(async (report) => {
          // Find the teacher based on teacherId in the report
          const teacher = await Teacher.findById(report.teacherId); // assuming Teacher is the model for teacher data
          const { _id , password , role , verificationToken , isVerified , ...otherTeacherData} = teacher._doc ;
          // Combine teacher and report
          return {
            ...otherTeacherData,  // Spread teacher properties into the new object
            ...report.toObject(),
          };
        })
      );
      res.status(200).send(reportsWithTeachers);
    }
  } catch (error) {
    console.error("error during getting the reports for teacher ", error);
    res.status(400).send(error);
  }
});

export default reportRouter;
