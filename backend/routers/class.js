import express from "express";
import { checkClassLimit, checkUserRole } from "../utils/middlewares.js";
import classController from "../controllers/classController.js";

const classRouter = express.Router();

classRouter
  .route("/")
  .post(checkClassLimit, checkUserRole("teacher"), classController.addNewClass)
  .get(checkUserRole("teacher"), classController.getTeacherClasses);

classRouter
  .route("/:classId")
  .get(classController.getClassStatus)
  .patch(checkUserRole("teacher") , classController.generateClassCode)
  .put(checkUserRole('teacher') , classController.changeClassStatus)
  .delete(checkUserRole('teacher'), classController.deleteClass);


export default classRouter;
