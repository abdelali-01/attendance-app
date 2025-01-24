import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    teacherId : {type : String , required : true} ,
    report : {type : String , required : true} ,
    classes : {type : Array , default : []} ,
},{timestamps : true});

export const Report = mongoose.model("Report" , reportSchema);