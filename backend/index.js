import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import csurf from "csurf";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import './cron.js';

const app = express();

// connect with MongoDB database and run the server
const port = process.env.PORT;
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("connected to database");
  app.listen(port, () => {
    console.log("server running at port :" + port);
  });
});

app.use(
  cors({
    origin: ["http://localhost:3000", "*"], // Allow frontend + any origin
    methods: ["POST"], // Allow all methods
    credentials: true,
  })
);
dotenv.config();
app.use(express.json());
app.use(helmet());
// limit the requests for the user 
app.use(rateLimit({
  windowMs : 10 * 60 * 1000 , // 10 min
  max : 100 // Limit each IP to 100 requests per window
}));
// Prevents NoSQL injection by sanitizing user input.
app.use(mongoSanitize());
//Protects against cross-site scripting (XSS) attacks by sanitizing input.
app.use(xss());

// Middleware to capture raw body as Buffer
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

// set up the cookies and session and passport 
app.use(cookieParser());
app.use(session({
  secret : "MyHardAndLongSecretInThisWorld",
  resave : false ,
  saveUninitialized : false ,
  cookie : {
    maxAge : 10 * 24 * 60 * 60 * 1000 , // 10days
    secure : process.env.NODE_ENV === 'production' ,
    httpOnly : true ,
    sameSite : "none"
  },
  store : MongoStore.create({
    client : mongoose.connection.getClient()
  })
}));
// Protects against CSRF attacks.
// app.use(csurf({cookie : true}))

app.use(passport.initialize());
app.use(passport.session());

// importing routers
import authRouter from "./routers/auth.js";
import classRouter from "./routers/class.js";
import reportRouter from "./routers/report.js";
import userRouter from './routers/user.js';
import paymentRouter from './routers/payment.js';

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/class", classRouter);
app.use("/report" , reportRouter);


