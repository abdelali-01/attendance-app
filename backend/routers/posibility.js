import express from "express";
import { Posibility } from "../models/Posibility.js";

const posibilityRouter = express.Router();

// get the posibility status
posibilityRouter.get("/posibilityStatus/:class", async (req, res) => {
  try {
    const posibility = await Posibility.findOne({class : req.params.class});
    res.send(posibility.posibility);
  } catch (error) {
    res.status(400).send(error);
  }
});

// create the system of open and close posibility of checking
posibilityRouter.put("/changePosibility/:class", async (req, res) => {
  try {
    const posibilityDoc = await Posibility.findOne({ class: req.params.class });
    if (!posibilityDoc) {
      return res.status(404).send({ error: "Class not found" });
    }
    const updatedPosibility = await Posibility.findOneAndUpdate(
      { class: req.params.class },
      { posibility: !posibilityDoc.posibility },
      { new: true }
    );
  
      res.status(200).send(updatedPosibility.posibility);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default posibilityRouter;
