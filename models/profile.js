

import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: String,
  role: String,
  about: String,
  image: String,
  resume: String,
  certificates: [String],
  github: String,
  linkedin: String,
  email: String,
});

export default mongoose.model("profile", profileSchema);
