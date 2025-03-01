import express from "express";
import { checkUserRole } from "../utils/middlewares.js";
import paymentController from "../controllers/paymentController.js";
const router = express.Router();

router.route("/").post(checkUserRole("teacher"), paymentController.subscribe);

router
  .route("/hook")
  .post(paymentController.subscribeHook);

export default router;
