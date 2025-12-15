


import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tech: [String],
  github: String,
  live: String,
  image: String
}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);
