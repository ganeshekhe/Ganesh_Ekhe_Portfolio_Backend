// // // import mongoose from "mongoose";

// // // const ProjectSchema = new mongoose.Schema({
// // //   title: String,
// // //   description: String,
// // //   tech: [String],
// // //   github: String,
// // //   live: String,
// // //   image: String,
// // // });

// // // export default mongoose.model("Project", ProjectSchema);
// // import mongoose from "mongoose";

// // const ProjectSchema = new mongoose.Schema({
// //   title: String,
// //   description: String,
// //   tech: [String],
// //   github: String,
// //   live: String,
// //   image: String,
// // });

// // export default mongoose.model("Project", ProjectSchema);
// import mongoose from "mongoose";

// const projectSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   tags: [String],
//   image: String,
//   github: String,
//   demo: String,
// }, { timestamps: true });

// export default mongoose.model("Project", projectSchema);




// import mongoose from "mongoose";

// const ProjectSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   tech: [String],
//   github: String,
//   live: String,
//   image: String
// }, { timestamps: true });

// export default mongoose.model("Project", ProjectSchema);


import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tech: [{ type: String, trim: true }], // Array of technologies
    github: { type: String, trim: true },
    live: { type: String, trim: true },
    image: { type: String }, // GridFS filename
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model("Project", ProjectSchema);
