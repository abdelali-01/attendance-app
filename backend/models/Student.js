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
        required :true
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
    attendance : {
        type : Number ,
        default : 0
    },
    absences : {
        type : Number ,
        default : 0 
    },
    class : {
        type : String ,
        required : true
    }
},{timestamps : true});

export const Student = mongoose.model('Student' , studentSchema);