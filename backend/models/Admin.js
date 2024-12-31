import mongoose from "mongoose";

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
        required : true
    },
    password :{
        type : String ,
        required : true
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