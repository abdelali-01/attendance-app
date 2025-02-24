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
      // unique: true,
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
        classId: { type: String },
        module: { type: String },
        attendanceMark: { type: Number },
        absences: { type: Number, default: 0 },
        attendances: { type: Number, default: 0 },
        d_AttendanceMark: { type: Number },
        minusWithAbsence: { type: Number },
      },
    ],
    TotalAttendance: { type: Number, default: 0 },
    TotalAbsence: { type: Number, default: 0 },
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

function updateAttendanceMark(classItem) {
  const valueForCalculate = classItem.absences * classItem.minusWithAbsence;
  classItem.attendanceMark = classItem.d_AttendanceMark - valueForCalculate;
}

// Calculate total attendance and absences before saving the student
studentSchema.pre("save", function (next) {
  // Recalculate total attendance and absences
  let totalAttendance = 0;
  let totalAbsence = 0;

  this.classes.forEach((c) => {
    updateAttendanceMark(c);
    totalAttendance += c.attendances || 0;
    totalAbsence += c.absences || 0;
  });

  this.TotalAttendance = totalAttendance;
  this.TotalAbsence = totalAbsence;

  next();
});

// Recalculate when a class is updated directly
studentSchema.pre("updateOne", function (next) {
  const updatedFields = this.getUpdate();
  const modifiedClasses = updatedFields.$set?.classes;

  // If there are any changes to the classes array, recalculate attendanceMark
  if (modifiedClasses) {
    modifiedClasses.forEach((classItem) => {
      updateAttendanceMark(classItem);
    });
  }

  next();
});

export const Student = mongoose.model("Student", studentSchema);
