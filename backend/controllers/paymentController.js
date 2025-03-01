import { ChargilyClient } from "@chargily/chargily-pay";
import dotenv from "dotenv";
import { Payment } from "../models/Payments.js";
import { Teacher } from "../models/Teacher.js";
dotenv.config();

import { emailSender } from "../utils/EmailSender.js";
import {
  paymentSuccessTemplate,
  paymentFailedTemplate,
} from "../utils/EmailTemplates.js";

const client = new ChargilyClient({
  api_key: process.env.CHARGILY_SECRET_KEY,
  mode: "test",
});

// this is just like an overview without payment gateway
const subscribe = async (req, res) => {
  try {
    const { amount, plan, duration } = req.body;

    if (!amount || !plan || !duration) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // find the teacher by the his id in the session
    const findTeacher =
      (await Teacher.findById(req.session?.passport?.user)) || null;
    if (!findTeacher) return res.status(404).send("You have to logged In !");

    const checkout = await client.createCheckout({
      amount,
      currency: "dzd",
      success_url: "http://localhost:4620/",
      failure_url: "http://localhost:4620/faild",
      metadata: {
        teacherId: findTeacher._id,
        plan,
        duration,
        teacherEmail: findTeacher.email,
      },
    });

    if (!checkout || !checkout.checkout_url) {
      throw new Error("Invalid response from Chargily API");
    }

    res.json({ checkout_url: checkout.checkout_url });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const subscribeHook = async (req, res) => {
  try {
    const { id, data } = req.body;
    const { amount, status, metadata, created_at } = data;
    const { plan, duration, teacherId, teacherEmail } = metadata || {};

    if (status === "paid") {
      // Check if payment already exists
      const existingPayment = await Payment.findOne({ transactionId: id });

      if (!existingPayment) {
        // Create new payment document
        const payment = new Payment({
          teacherId,
          plan,
          amount,
          transactionId: id,
          paymentStatus: "paid",
          duration,
        });
        await payment.save();

        try {
          await emailSender({
            email: teacherEmail,
            subject: "Payment Successful",
            html: paymentSuccessTemplate(plan, duration),
          });
        } catch (error) {
          console.log("Error sending email");
        }
      } else {
        console.log("Payment already exists, skipping...");
      }
    } else {
      try {
        await emailSender({
          email: teacherEmail,
          subject: "Payment Failed",
          html: paymentFailedTemplate(),
        });
      } catch (error) {
        console.log("faild to send the failing email", error);
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook error:", error);
    res.sendStatus(500);
  }
};

export default { subscribe, subscribeHook };
