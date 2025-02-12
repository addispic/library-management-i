import { Schema, models, model } from "mongoose";

// profiles schema
const profilesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  flag: {
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
});

// exports
export default models.Profile || model("Profile", profilesSchema);
