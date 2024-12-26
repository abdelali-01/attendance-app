import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    posibility: {
      type: Boolean,
      default: false,
    },
    class : {
      type : String ,
      required : true ,
      unique : true
    },
    speciality : {
      type : String ,
    },
    system : {
      type: String ,
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

export const Class = mongoose.model("Class", classSchema);
