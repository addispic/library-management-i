import { Schema, models, model } from "mongoose";

// borrow slice
const borrowSlice = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

// exports
export default models.Borrow || model("Borrow", borrowSlice);
