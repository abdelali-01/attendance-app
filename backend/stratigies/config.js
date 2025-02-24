import passport from "passport";
import { Teacher } from "../models/Teacher.js";
import { Student } from "../models/Student.js";



passport.serializeUser((user , done)=>{
    done(null , user._id);
});

passport.deserializeUser(async (id , done)=>{
    try {
        const findUser = await Teacher.findById(id) || await Student.findById(id);
        if(!findUser) throw new Error("User Not Found !");

        done(null , findUser);
    } catch (error) {
        done(error , null);
        console.log('Error during deserialize the User' , Error);
    }
});


export default passport ;