import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    posibility: {
      type: Boolean,
      default: false,
    },
    class : {
      type : String ,
      required : true
    },
    updatedDate: {
      type: String, // Store the date as a string in the format YYYY-MM-DD
    },
  },
  { timestamps: true }
);

// Middleware to update `updatedDate` when the document is modified
classSchema.pre("save", function (next) {
  const updatedDate = new Date().toISOString().split("T")[0];
  this.updatedDate = updatedDate;
  next();
});

classSchema.pre("findOneAndUpdate", function (next) {
  const updatedDate = new Date().toISOString().split("T")[0];
  this._update.updatedDate = updatedDate;
  next();
});

export const Class = mongoose.model("Class", classSchema);
