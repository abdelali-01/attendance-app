import express from "express";
import { Class, generateCode } from "../models/Class.js";
import { Student } from "../models/Student.js";

const classRouter = express.Router();

// create new class
classRouter.post("/newclass/:teacherId", async (req, res) => {
  try {
    const data = req.body;
    const { teacherId } = req.params;
    const exist = await Class.findOne({ class: req.body.class, teacherId });

    if (!exist) {
      const newclass = new Class({ ...data, teacherId });
      const savedClass = await newclass.save();
      res.status(200).send(savedClass);
    } else {
      res
        .status(401)
        .send("The class name is already used , please choose another name");
    }
  } catch (error) {
    console.error("error durring creating the class ", error);
    res.status(400).send(error);
  }
});

// get the classes for the teacher , based on teacher Id
classRouter.get("/all/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const all = await Class.find({ teacherId });

    res.status(200).send(all);
  } catch (error) {
    console.error('error durring get classes ' , error)
    res.status(400).send(error);
  }
});

// get the class for look the psobility status
classRouter.get("/getclass/:classId", async (req, res) => {
  try {
    const classData = await Class.findById(req.params.classId);
    res.status(200).send(classData);
  } catch (error) {
    res.status(400).send(error);
  }
});

// generate new shareCode for the class
classRouter.put("/code/:classId" , async (req , res) => {
  const {classId} = req.params ;
  try {
    const classe = await Class.findByIdAndUpdate(classId , {
      shareCode : generateCode()
    });
    res.status(200).json({
      message : "success with update the code" ,
      shareCode : classe.shareCode
    });
  } catch (error) {
    console.error("error during generate the class code" , error);
    res.status(400).send(error)
  }
})

// create the system of open and close posibility of checking
classRouter.put("/changePosibility/:classId", async (req, res) => {
  try {
    const { date, attendanceCount, absenceCount } = req.body;
    const classDoc = await Class.findById(req.params.classId);
    if (!classDoc) {
      return res.status(404).send({ error: "Class not found" });
    }
    if (!date || attendanceCount === undefined || absenceCount === undefined) {
      const updatedPosibility = await Class.findOneAndUpdate(
        { _id : req.params.classId },
        { posibility: !classDoc.posibility },
        { new: true }
    );
      return res.status(200).send(updatedPosibility);
    }
    const updatedPosibility = await Class.findOneAndUpdate(
      { _id : req.params.classId },
      {
        posibility: !classDoc.posibility,
        $push: {
          absences: { date, count: absenceCount },
          attendances: { date, count: attendanceCount },
        },
      },
      { new: true }
    );

    res.status(200).send(updatedPosibility);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete the class if needed
classRouter.delete("/:classId", async (req, res) => {
  const { classId } = req.params
  try {
    await Class.findOneAndDelete({ _id: classId });

    const studentsOnThisClass = await Student.find({"classes.classId" : classId});

    studentsOnThisClass.forEach( async (student) => {
      student.classes.pull({classId});

      await student.save();
    })

    res.status(200).send("class deleted Successfully");
  } catch (error) {
    console.error("error durring delete the class" , error)
    res.status(400).send(error);
  }
});

export default classRouter;
