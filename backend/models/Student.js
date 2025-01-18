import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    matricule: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    birth: {
      type: Date,
    },
    role: {
      type: String,
    },
    classes: [
      {
        classId : String ,
        module : String ,
        attendanceMark : Number ,
        absences : {
          type : Number ,
          default : 0
        },
        attendances : {
          type : Number ,
          default : 0
        }
      }
    ],
    TotalAttendance: {
      type: Number,
      default: 0,
    },
    TotalAbsence: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
