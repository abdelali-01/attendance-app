import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import http from "http";
import { WebSocketServer } from "ws";
import "./cron.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
export const clients = new Map()

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Connected to database");
  server.listen(process.env.PORT, () => {
    console.log(`Server running at port: ${process.env.PORT}`);
  });
});

// WebSocket setup
wss.on("connection", (ws) => {
  console.log("A client connected");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "joinClass") {
        clients.set(ws, data.classId); // Store client with classId
      }
    } catch (error) {
      console.error("Invalid message format:", error);
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });
});

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" , credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(cookieParser());

app.set("trust proxy", 1); // Trust first proxy for rate limiting

app.use(session({
  secret: "MyHardAndLongSecretInThisWorld",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 24 * 60 * 60 * 1000, secure: process.env.NODE_ENV === "production", httpOnly: true , 
    // sameSite : "none" 
  },
  store: MongoStore.create({ client: mongoose.connection.getClient() }),
}));

app.use(passport.initialize());
app.use(passport.session());

// Importing routers
import authRouter from "./routers/auth.js";
import classRouter from "./routers/class.js";
import reportRouter from "./routers/report.js";
import userRouter from "./routers/user.js";
import paymentRouter from "./routers/payment.js";

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/class", classRouter);
app.use("/report", reportRouter);
