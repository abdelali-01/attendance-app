import mongoose from "mongoose";
import crypto from "crypto";

export const generateCode = () => {
  return crypto.randomBytes(3).toString("hex");
};

const classSchema = new mongoose.Schema(
  {
    teacherId: {
      type: String,
      required: true,
    },
    module: {
      type: String,
      required: true,
    },
    posibility: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
    },
    system: {
      type: String,
    },
    shareCode: {
      type: String,
      unique: true,
    },
    deleugate: {
      type: String,
    },
    d_AttendanceMark: {
      type: Number,
      required: true,
    },
    minusWithAbsence: {
      type: Number,
      required: true,
    },
    absences: [
      {
        date: { type: String }, // Format: YYYY-MM-DD
        count: { type: Number },
      },
    ],
    attendances: [
      {
        date: { type: String }, // Format: YYYY-MM-DD
        count: { type: Number },
      },
    ],
    reminder: {
      active: { type: Boolean, default: false },
      reminderDays: { type: Array },
      reminderTime: { type: String },
    },
  },
  { timestamps: true }
);

// create a code before saving the document
classSchema.pre("save", function (next) {
  if (!this.shareCode) {
    this.shareCode = generateCode();
  }
  next();
});

classSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  const query = this.getQuery();

  if (update.$push && (update.$push.absences || update.$push.attendances)) {
    this.model
      .findOne(query)
      .then((doc) => {
        if (!doc) return next();

        update.$set = update.$set || {}; // Ensure $set exists

        // Process absences
        if (update.$push.absences) {
          const newAbsences = [
            ...doc.absences.slice(-7),
            update.$push.absences,
          ];
          update.$set.absences = newAbsences;
          delete update.$push.absences;
        }

        // Process attendances
        if (update.$push.attendances) {
          const newAttendances = [
            ...doc.attendances.slice(-7),
            update.$push.attendances,
          ];
          update.$set.attendances = newAttendances;
          delete update.$push.attendances;
        }

        next();
      })
      .catch(next);
  } else {
    next();
  }
});

export const Class = mongoose.model("Class", classSchema);
