// // // // import mongoose from "mongoose";

// // // // const SkillSchema = new mongoose.Schema({
// // // //   name: String,
// // // //   level: String,
// // // // });

// // // // export default mongoose.model("Skill", SkillSchema);
// // // import mongoose from "mongoose";

// // // const SkillSchema = new mongoose.Schema({
// // //   name: String,
// // //   level: String,
// // // });

// // // export default mongoose.model("Skill", SkillSchema);









// // import mongoose from "mongoose";

// // const SkillSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   level: { type: String, default: "Beginner" }
// // });

// // export default mongoose.model("Skill", SkillSchema);

// // import mongoose from "mongoose";

// // const SkillSchema = new mongoose.Schema({
// //   name: { type: String, required: true },

// //   // Level in percentage — Useful for progress bar
// //   level: { type: Number, required: true, min: 1, max: 100 },

// //   // Beginner, Intermediate, Advanced
// //   difficulty: { type: String, default: "Intermediate" },

// //   // Skill Category
// //   category: {
// //     type: String,
// //     enum: ["Frontend", "Backend", "Database", "Tools", "Other"],
// //     default: "Other"
// //   },

// //   // How long you have been using it
// //   experience: { type: String, default: "0 Months" },

// //   // How many times used in projects
// //   usedInProjects: { type: Number, default: 0 },

// //   // Custom icon (optional)
// //   icon: { type: String, default: "" },

// //   // Sorting control
// //   order: { type: Number, default: 0 }
// // });

// // export default mongoose.model("Skill", SkillSchema);


// import mongoose from "mongoose";

// const SkillSchema = new mongoose.Schema({
//   name: { type: String, required: true },

//   // Level → Beginner / Intermediate / Advanced
//   level: { type: String, default: "Beginner" },

//   // Difficulty rating (1-5 Stars)
//   difficulty: { type: Number, default: 1 },

//   // Category → Frontend, Backend, Database, Tools, DevOps etc.
//   category: { type: String, default: "General" },

//   // Experience in months/years
//   experience: { type: String, default: "0 years" },

//   // How many projects used this skill
//   usedInProjects: { type: Number, default: 0 },

//   // LUCIDE ICON NAME (VERY IMPORTANT)
//   icon: { type: String, default: "Code2" },

//   // Sorting Purpose
//   order: { type: Number, default: 0 },
// }, { timestamps: true });

// export default mongoose.model("Skill", SkillSchema);

// import mongoose from "mongoose";

// const SkillSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   level: { type: String, default: "Beginner" },
//   difficulty: { type: Number, default: 1 },
//   category: { type: String, default: "General" },
//   experience: { type: String, default: "0 years" },
//   usedInProjects: { type: Number, default: 0 },
//   icon: { type: String, default: "Code2" },
//   order: { type: Number, default: 0 },
// }, { timestamps: true });

// export default mongoose.model("Skill", SkillSchema);

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
