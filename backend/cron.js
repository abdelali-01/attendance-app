import cron from "node-cron";
import checkExpiredSubscriptions from "./utils/checkSubscribtions.js";

cron.schedule('* * * * *', () => {
    console.log('cron running ...');
    checkExpiredSubscriptions();
});