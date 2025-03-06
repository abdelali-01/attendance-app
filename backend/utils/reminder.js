import { Class } from "../models/Class.js";
import { Teacher } from "../models/Teacher.js";
import { emailSender } from "./EmailSender.js";
import { reminderEmailTemplate } from "./EmailTemplates.js";

const sendReminderEmails = async () => {
  try {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" }); // Example: "Monday"
    const currentTime = currentDate.toTimeString().slice(0, 5); // Format: "HH:MM"

    // Find classes with active reminders
    const classes = await Class.find({ "reminder.active": true });

    for (const cls of classes) {
      const { reminder, teacherId, module, class: className } = cls;
      const teacher = await Teacher.findById(teacherId);
      
      if (
        reminder.reminderDays.includes(currentDay) &&
        reminder.reminderTime === currentTime
      ) {
        console.log(`Sending reminder for class ${className} (${module})`);

        // Send email
        const html = reminderEmailTemplate(
          className,
          module,
          reminder.reminderTime
        );
        try {
          await emailSender({
            email: teacher.email,
            subject: "Class Reminder",
            html,
          });
        } catch (error) {
          console.log("faild to sent reminder email ", error);
        }

        console.log(`Reminder sent to teacher ${teacherId}`);
      }
    }
  } catch (error) {
    console.error("Error sending reminder emails:", error);
  }
};

export default sendReminderEmails;
