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
