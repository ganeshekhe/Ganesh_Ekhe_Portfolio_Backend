

// // import mongoose from "mongoose";

// // const profileSchema = new mongoose.Schema({
// //   name: String,
// //   role: String,
// //   about: String,
// //   image: String,
// //   resume: String,
// //   certificates: [String],
// //   github: String,
// //   linkedin: String,
// //   email: String,
// // });

// // export default mongoose.model("Profile", profileSchema);


// const profileSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   role: { type: String, required: true },
//   about: { type: String, required: true },
//   image: String,
//   resume: String,
//   certificates: [String],
//   github: String,
//   linkedin: String,
//   // email: { type: String, required: true }
//   email: {
//   type: String,
//   required: true,
//   match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
// }

// }, { timestamps: true });

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
