import mongoose from "mongoose";
import crypto from 'crypto';

export const generateCode = ()=>{
  return crypto.randomBytes(3).toString('hex');
}

const classSchema = new mongoose.Schema(
  {
    teacherId : {
      type : String ,
      required : true
    },
    module : {
      type : String ,
      required : true
    },
    posibility: {
      type: Boolean,
      default: false,
    },
    class : {
      type : String ,
      required : true ,
    },
    speciality : {
      type : String ,
    },
    system : {
      type: String ,
    },
    shareCode : {
      type : String ,
      unique : true 
    },
    deleugate : {
      type : String
    } ,
    d_AttendanceMark: {
      type : Number ,
      required : true
    },
    minusWithAbsence: {
      type : Number ,
      required : true
    },
    absences: [
      {
        date: { type: String }, // Format: YYYY-MM-DD
        count: { type: Number },
      },
    ],
    attendances: [
      {
        date: { type: String}, // Format: YYYY-MM-DD
        count: { type: Number},
      },
    ],
  },
  { timestamps: true }
);


// create a code before saving the document
classSchema.pre('save' ,function (next){
  if(!this.shareCode){
    this.shareCode = generateCode();
  }
  next()
});

export const Class = mongoose.model("Class", classSchema);
