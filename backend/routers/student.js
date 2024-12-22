import express from 'express'
import { Student } from '../models/Student.js';
import { Posibility } from '../models/Posibility.js';
import bcrypt from 'bcrypt'

const studentRouter = express.Router();

// create login system for the student
studentRouter.post('/login' ,async (req ,res)=>{
    try {
        let student = await Student.findOne({matricule : req.body.matricule});
        if(!student){
            return res.status(401).send('Your email or password is incorrect !');
        }

        // compare the valid password with the crypted 
        let validPass = await bcrypt.compare(req.body.password , student.password)
        if(!validPass){
            return res.status(401).send('Your email or password is incorrect !');
        }
        
        res.status(200).send(student);
    } catch (error) {
        res.status(400).send(error)
    }
});

// update password account from student 
studentRouter.put('/updatepass/:id' ,async (req ,res)=>{
    if(req.body.studentId === req.params.id){
        try {
            let data = req.body ;

            // generate new crypted password
            let salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password , salt);

            // find the student and update his password 
            await Student.findByIdAndUpdate(req.params.id ,
                {password : data.password}
            );

            res.status(200).send("Password updated successfully");
        } catch (error) {
            res.status(400).send(error);
        }
    }else{
        res.status(401).send("you can update only your account");
    }
});

// Allow the student to check their attendance
studentRouter.put("/checkattendance/:id" ,async (req,res)=>{
    try {
        let student = await Student.findById(req.params.id)
        await Student.findByIdAndUpdate(req.params.id ,
            {attendance : student.attendance +1}
        ); 

        res.status(200).send("Marked as present successfully")
    } catch (error) {
        res.status(400).send(error)
    }
})



export default studentRouter ;