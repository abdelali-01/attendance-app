import express from "express";
import {
  checkClassLimit,
  checkPlanDate,
  checkUserRole,
} from "../utils/middlewares.js";
import classController from "../controllers/classController.js";

const classRouter = express.Router();

classRouter
  .route("/")
  .post(
    checkPlanDate,
    checkClassLimit,
    checkUserRole("teacher"),
    classController.addNewClass
  )
  .get(classController.getClasses)
  .put(checkUserRole('teacher') ,classController.updateClass)

classRouter
  .route("/:classId")
  .get(classController.getClassStatus)
  .patch(checkUserRole("teacher"), classController.generateClassCode)
  .put(checkUserRole("teacher"), classController.changeClassStatus)
  .delete(checkUserRole("teacher"), classController.deleteClass);

export default classRouter;
