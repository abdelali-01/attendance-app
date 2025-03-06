import { Class, generateCode } from "../models/Class.js";
import { Student } from "../models/Student.js";
import { Teacher } from "../models/Teacher.js";

const addNewClass = async (req, res) => {
  try {
    const data = req.body;
    const teacherId = req.session?.passport?.user || null;
    if (!teacherId) return res.sendStatus(401);
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
};

const getClasses = async (req, res) => {
  try {
    const userId = req.session?.passport?.user || null;
    if (!userId) return res.sendStatus(401);

    // find the user for role checking
    const findUser =
      (await Teacher.findById(userId)) || (await Student.findById(userId));
    if (!findUser) return res.status(404).send("User not found !");

    let allClasses;
    if (findUser.role === "teacher")
      allClasses = await Class.find({ teacherId: userId });
    else
      allClasses = await Promise.all(
        findUser.classes.map(async (classe) => {
          return await Class.findById(classe.classId);
        })
      );

    res.status(200).send(allClasses);
  } catch (error) {
    console.error("error durring get classes ", error);
    res.status(400).send(error);
  }
};

const getClassStatus = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.classId);
    res.status(200).send(classData);
  } catch (error) {
    res.status(400).send(error);
  }
};

const generateClassCode = async (req, res) => {
  const { classId } = req.params;
  try {
    const classe = await Class.findByIdAndUpdate(classId, {
      shareCode: generateCode(),
    });
    res.status(200).json({
      message: "success with update the code",
      shareCode: classe.shareCode,
    });
  } catch (error) {
    console.error("error during generate the class code", error);
    res.status(400).send(error);
  }
};

const changeClassStatus = async (req, res) => {
  try {
    const { date, attendanceCount, absenceCount } = req.body;
    const classDoc = await Class.findById(req.params.classId);
    if (!classDoc) {
      return res.status(404).send({ error: "Class not found" });
    }
    if (!date || attendanceCount === undefined || absenceCount === undefined) {
      const updatedPosibility = await Class.findOneAndUpdate(
        { _id: req.params.classId },
        { posibility: !classDoc.posibility },
        { new: true }
      );
      return res.status(200).send(updatedPosibility);
    }
    const updatedPosibility = await Class.findOneAndUpdate(
      { _id: req.params.classId },
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
};

const updateClass = async (req, res) => {
  const { details, controls, classId } = req.body;

  try {
    // Extracting fields that actually exist in the schema
    const updateData = {};

    if (details) {
      updateData.class = details.class;
      updateData.speciality = details.speciality;
      updateData.system = details.system;
      updateData.module = details.module;
      updateData.deleugate = details.deleugate;
      updateData.d_AttendanceMark = Number(details.d_AttendanceMark);
      updateData.minusWithAbsence = Number(details.minusWithAbsence);
    }

    if (controls) {
      updateData.reminder = {
        active: controls.active,
        reminderDays: controls.reminderDays,
        reminderTime: controls.reminderTime,
      };
    }

    await Class.findByIdAndUpdate(classId, { $set: updateData });

    res.status(200).json({ message: "Class updated successfully" });
  } catch (error) {
    console.error("error during updating the class", error);
  }
};

const deleteClass = async (req, res) => {
  const { classId } = req.params;
  try {
    await Class.findOneAndDelete({ _id: classId });

    const studentsOnThisClass = await Student.find({
      "classes.classId": classId,
    });

    studentsOnThisClass.forEach(async (student) => {
      student.classes.pull({ classId });

      await student.save();
    });

    res.status(200).send("class deleted Successfully");
  } catch (error) {
    console.error("error durring delete the class", error);
    res.status(400).send(error);
  }
};

export default {
  addNewClass,
  getClasses,
  getClassStatus,
  generateClassCode,
  changeClassStatus,
  deleteClass,
  updateClass,
};
