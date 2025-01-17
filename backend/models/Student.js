import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String ,
        required : true 
    },
    familyName : {
        type : String ,
        required : true
    },
    matricule :{
        type : String ,
        required :true ,
        unique : true 
    },
    email : {
        type : String ,
    },
    password :{
        type : String ,
        required : true
    },
    phone : {
        type : String ,
    },
    birth : {
        type : Date ,
    },
    attendanceMark : {
        type : Number ,
        default : 5
    },
    role : {
        type : String ,
    },
    attendance : {
        type : Number ,
        default : 0
    },
    absences : {
        type : Number ,
        default : 0 
    },

    isVerified : {
        type : Boolean ,
        default : false ,
    },
    verificationToken : String,
    resetPasswordToken: String,  
    resetPasswordExpires: Date, 
},{timestamps : true});

export const Student = mongoose.model('Student' , studentSchema);