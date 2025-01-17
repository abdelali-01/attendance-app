import mongoose from "mongoose";

// the admin is the teacher 
const adminSchema = new mongoose.Schema({
    name:{
        type : String ,
        required: true 
    },
    familyName:{
        type : String ,
        required :true
    },
    email : {
        type : String ,
        required : true ,
        unique : true
    },
    password :{
        type : String ,
        required : true
    },
    role : {
        type : String ,
    },
    isVerified : {
        type : Boolean ,
        default : false ,
    },
    verificationToken : String,
    resetPasswordToken: String,  
    resetPasswordExpires: Date, 
});

export const Admin = mongoose.model('Admin' , adminSchema);