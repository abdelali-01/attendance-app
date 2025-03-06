import cron from "node-cron";
import checkExpiredSubscriptions from "./utils/checkSubscribtions.js";
import sendReminderEmails from "./utils/reminder.js";

cron.schedule('* * * * *', () => {
    console.log('cron running ...');
    checkExpiredSubscriptions();
    sendReminderEmails();
});