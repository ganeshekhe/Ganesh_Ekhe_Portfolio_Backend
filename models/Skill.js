

import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },

  // Percentage for progress bars (0 - 100)
  level: { type: Number, required: true, default: 60 },

  // Difficulty rating (1-10)
  difficulty: { type: Number, default: 1 },

  // Category → Frontend, Backend, Database, Tools, DevOps etc.
  category: { type: String, default: "General" },

  // Experience text (e.g. "12 months" or "1 year")
  experience: { type: String, default: "0 months" },

  // How many projects used this skill
  usedInProjects: { type: Number, default: 0 },

  // Icon can be an uploaded image path (e.g. "skills/1678.png") OR a lucide name like "Code2"
  icon: { type: String, default: "Code2" },

  // Sorting Purpose
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Skill", SkillSchema);
