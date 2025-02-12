import { Schema, models, model } from "mongoose";

// books schema
const booksSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// exports
export default models.Book || model("Book", booksSchema);
