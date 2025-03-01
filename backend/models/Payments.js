import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher", // Reference to the Teacher model
      required: true,
    },
    plan: {
      type: String,
      enum: ["standard", "premium"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    duration: {
      type: Number,
      default: 0, // number of months
    },
    planStartDate: {
      type: Date,
      default: Date.now,
    },
    planEndDate: {
      type: Date,
    },
    emailSent: {
      type: Boolean,
      default: false, // Track if email was sent
    },
  },
  { timestamps: true }
);

// Pre-save middleware to calculate planEndDate
paymentSchema.pre("save", function (next) {
  if (this.planStartDate && this.duration > 0) {
    this.planEndDate = new Date(this.planStartDate);
    this.planEndDate.setMonth(this.planEndDate.getMonth() + this.duration);
  }
  next();
});

export const Payment = mongoose.model("Payment", paymentSchema);
