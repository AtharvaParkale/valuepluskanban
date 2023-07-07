import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title !"],
    maxLength: [30, "Name cannot exceed 30 chars !"],
  },
  tasks: [
    {
      description: {
        type: String,
      },
      tags: { type: Array },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", cardSchema);
export default Card;
