import express, { Router } from 'express' ;
import bcrypt from "bcrypt";
import {Student} from '../models/Student.js';
import { Admin } from '../models/Admin.js';

const adminRouter = express.Router();

// create the signup system for the admin 
adminRouter.post("/signup" ,async (req , res)=>{
    try {
        let data = req.body ;
        // create  crypted  password of the admin
        
        let salt = await bcrypt.genSalt(10);
        let cryptedPass = await bcrypt.hash(data.password , salt);
        data.password = cryptedPass ;

        // create a new admin 
        const admin = new Admin(data);

        // save the new admin in database
        const newAdmin = await admin.save();
        res.status(200).send(newAdmin);
    } catch (error) {
        res.status(400).send(error)
    }
});

// create the login system for the admin

adminRouter.post('/login' , async (req , res)=>{
    try {
        let admin = await Admin.findOne({email : req.body.email});
        if (!admin) {
            return res.status(404).send('Your Email or password is incorrect!');
        }

        // Compare the valid password with the hashed one
        let validPass = await bcrypt.compare(req.body.password, admin.password);
        if (!validPass) {
            return res.status(404).send('Your Email or password is incorrect!');
        }
        
        res.status(200).send(admin);
    } catch (error) {
        res.status(400).send(error)
    }
})




export default adminRouter ;