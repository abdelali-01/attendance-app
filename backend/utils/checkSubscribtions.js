import { Payment } from "../models/Payments.js";
import { Teacher } from "../models/Teacher.js";
import { emailSender } from "./EmailSender.js";
import { subscriptionEndedTemplate } from "./EmailTemplates.js";

// Function to check expired plans and send emails
const checkExpiredSubscriptions = async () => {
  try {
    const currentDate = new Date();

    // Find expired plans where email was NOT sent yet
    const expiredPayments = await Payment.find({
      planEndDate: { $lte: currentDate }, // Expired plans
      emailSent: { $ne: true }, // Email not sent yet
    });

    for (const payment of expiredPayments) {
      const teacher = await Teacher.findById(payment.teacherId);
      if (!teacher) continue;

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

      // Mark email as sent
      payment.emailSent = true;
      await payment.save();
      // turn the teacher in the free plan
      teacher.plan = "free";
      await teacher.save();

      console.log(`Email sent to ${teacher.email}`);
    }
  } catch (error) {
    console.error("Error checking expired subscriptions:", error);
  }
};

export default checkExpiredSubscriptions;
