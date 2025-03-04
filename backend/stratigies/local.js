import passport from "passport";
import { Strategy } from "passport-local";
import { Teacher } from "../models/Teacher.js";
import { Student } from "../models/Student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { emailVerificationTemplate } from "../utils/EmailTemplates.js";
import { emailSender } from "../utils/EmailSender.js";

import "./config.js";

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (username, password, done) => {
      try {
        const findUser =
          (await Teacher.findOne({ email: username })) ||
          (await Student.findOne({ email: username }));

        if (!findUser) {
          return done(null, false, {
            status: 401,
            message: "Invalid Credentials!",
          });
        }

        const compare = await bcrypt.compare(password, findUser.password);
        if (!compare) {
          return done(null, false, {
            status: 401,
            message: "Invalid Credentials!",
          });
        }

        if (!findUser.isVerified) {
          // generate new token
          const verificationToken = jwt.sign(
            { username },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          findUser.verificationToken = verificationToken;
          await findUser.save();

          const html = emailVerificationTemplate(verificationToken);
          try {
            await emailSender({
              email: findUser.email,
              subject: "Verify Your Email",
              html,
            });
            return done(null, findUser, {
              isVerified : false ,
              status: 200,
              message:
                "Login Success , Verify Your email to complete the process !",
            });
          } catch (error) {
            console.log("Error during Sendig Email verification !");
            return done(error, null, {
              status: 400,
              message: "Try Login Later !",
            });
          }
        }

        done(null, findUser);
      } catch (error) {
        console.log("Error during Login in Local strategy", Error);
        done(error, null, {
          status: 400,
          message: error,
        });
      }
    }
  )
);

export default passport;
