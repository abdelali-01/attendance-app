import mongoose from "mongoose";

// the admin is the teacher 
const TeacherSchema = new mongoose.Schema({
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
        // unique : true
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

    // for payment details
    plan: {
        type: String,
        enum: ["free", "standard", "premium"],
        default: "free",
    },
});

export const Teacher = mongoose.model('Teacher' , TeacherSchema);