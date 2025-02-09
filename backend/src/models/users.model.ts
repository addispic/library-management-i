import { Schema, models, model } from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcryptjs";

// users schema
const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email address required"],
      validate: [isEmail, "Invalid email address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minlength: [3, "Password is too short"],
    },
  },
  {
    timestamps: true,
  }
);

// hashing password
usersSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

// exports
export default models.User || model("User", usersSchema);
