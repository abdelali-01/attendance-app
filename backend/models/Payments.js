import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
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
    planDuration: {
      type: String,
      default: 0, // number of months
    },
    planStartDate: {
      type: Date,
      default: Date.now,
    },
    planEndDate: {
      type: Date,
      required : true
    },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
