import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "senderModel",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReceiverModel",
      required: true,
    },
    snderModel: { type: String, required: true, enum: ["Teacher", "Student"] },
    receiverModel: {
      type: String,
      required: true,
      enum: ["Teacher", "Student"],
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);
