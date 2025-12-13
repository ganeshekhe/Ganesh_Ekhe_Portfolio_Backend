

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

// import mongoose from "mongoose";

// const profileSchema = new mongoose.Schema({
//   name: String,
//   role: String,
//   about: String,
//   image: String,
//   resume: String,
//   certificates: [String],
//   github: String,
//   linkedin: String,
//   email: String,
// });

// export default mongoose.model("profile", profileSchema);
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    about: { type: String, trim: true },
    image: { type: String }, // GridFS filename
    resume: { type: String }, // GridFS filename
    certificates: [{ type: String }], // Array of GridFS filenames
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    email: { type: String, trim: true },
  },
  { timestamps: true } // CreatedAt and UpdatedAt automatically
);

export default mongoose.model("Profile", profileSchema);
