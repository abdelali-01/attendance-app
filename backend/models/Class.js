import mongoose from "mongoose";
import crypto from 'crypto';
import { type } from "os";

const generateCode = ()=>{
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
      required : true
    },
    shareCode : {
      type : String ,
      unique : true 
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
