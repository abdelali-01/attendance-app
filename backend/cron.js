import cron from "node-cron";
import checkExpiredSubscriptions from "./utils/checkSubscribtions.js";

cron.schedule('0 0 * * *', () => {
    console.log('cron running ...');
    checkExpiredSubscriptions();
});