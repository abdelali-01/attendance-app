import express from "express";
import { Class } from "../models/Class.js";

const classRouter = express.Router();


// create new class 
classRouter.post("/newclass" ,async (req, res)=>{
  try {
    const data = req.body ;
    const exist = await Class.findOne({class : req.body.class});

    if(!exist){
      const newclass = new Class(data) ;
      const savedClass = await newclass.save();
      res.status(200).send(savedClass)
    }else{
      res.status(401).send("The class name is already used , please choose another name ");
    }

  } catch (error) {
    res.status(400).send(error);
  }
})
// get all classes
classRouter.get("/all" ,async (req,res)=>{
  try {
    const all = await Class.find();

    res.status(200).send(all);
  } catch (error) {
    res.status(400).send(error)
  }
});


// get the posibility status
classRouter.get("/getclass/:class", async (req, res) => {
  try {
    const classData = await Class.findOne({class : req.params.class});
    res.status(200).send(classData);
  } catch (error) {
    res.status(400).send(error);
  }
});

// create the system of open and close posibility of checking
classRouter.put("/changePosibility/:class", async (req, res) => {
  try {
    const {date , attendanceCount , absenceCount} = req.body ;
    const classDoc = await Class.findOne({ class: req.params.class });
    if (!classDoc) {
      return res.status(404).send({ error: "Class not found" });
    }
    if( date === new Date().toISOString().split('T')[0] ||!date || attendanceCount === undefined || absenceCount === undefined){
        const updatedPosibility = await Class.findOneAndUpdate(
        { class: req.params.class },
        { posibility: !classDoc.posibility ,},
        { new: true }
      );
    
      return   res.status(200).send(updatedPosibility);
    }
    const updatedPosibility = await Class.findOneAndUpdate(
      { class: req.params.class },
      { posibility: !classDoc.posibility ,
        $push :{
          absences : {date , count : absenceCount} ,
          attendances : {date , count : attendanceCount}
        }
      },
      { new: true }
    );
  
      res.status(200).send(updatedPosibility);
  } catch (error) {
    res.status(400).send(error);
  }
});

// delete the class if needed
classRouter.delete('/:class' ,async (req ,res)=>{
  try {
    await Class.findOneAndDelete({class : req.params.class});
  } catch (error) {
    res.status(400).send(error);
  }
});

export default classRouter;
