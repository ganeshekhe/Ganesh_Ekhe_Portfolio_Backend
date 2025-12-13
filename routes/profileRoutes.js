

// // import express from "express";
// // import multer from "multer";
// // import Profile from "../models/Profile.js";

// // const router = express.Router();

// // // MULTER STORAGE
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, "uploads/");
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + "-" + file.originalname);
// //   },
// // });

// // const upload = multer({ storage });

// // // GET PROFILE
// // router.get("/", async (req, res) => {
// //   const profile = await Profile.findOne();
// //   res.json(profile);
// // });

// // // UPDATE PROFILE (with file uploads)
// // router.put(
// //   "/",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "resume", maxCount: 1 },
// //     { name: "certificates", maxCount: 10 },
// //   ]),
// //   async (req, res) => {
// //     try {
// //       const data = req.body;

// //       if (req.files.image)
// //         data.image = req.files.image[0].filename;

// //       if (req.files.resume)
// //         data.resume = req.files.resume[0].filename;

// //       if (req.files.certificates)
// //         data.certificates = req.files.certificates.map(f => f.filename);

// //       const updated = await Profile.findOneAndUpdate({}, data, { new: true, upsert: true });

// //       res.json(updated);
// //     } catch (err) {
// //       console.log(err);
// //       res.status(500).json({ error: "Update failed" });
// //     }
// //   }
// // );

// // export default router;


// // import express from "express";
// // import multer from "multer";
// // import Profile from "../models/profile.js";

// // const router = express.Router();

// // /* --------------------------------------------
// //    MULTER STORAGE (Proper folder structure)
// // --------------------------------------------- */

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     // dynamic folder
// //     if (file.fieldname === "image") cb(null, "uploads/profile/images/");
// //     else if (file.fieldname === "resume") cb(null, "uploads/profile/resume/");
// //     else if (file.fieldname === "certificates") cb(null, "uploads/profile/certificates/");
// //     else cb(null, "uploads/");
// //   },
// //   filename: (req, file, cb) => {
// //     const ext = file.originalname.split(".").pop();
// //     cb(null, Date.now() + "-" + file.fieldname + "." + ext);
// //   },
// // });

// // const upload = multer({ storage });

// // /* --------------------------------------------
// //    GET PROFILE 
// // --------------------------------------------- */

// // router.get("/", async (req, res) => {
// //   try {
// //     const profile = await Profile.findOne();
// //     res.json(profile);
// //   } catch (err) {
// //     res.status(500).json({ error: "Failed to fetch profile" });
// //   }
// // });

// // /* --------------------------------------------
// //    UPDATE PROFILE (WITH FILE UPLOADS)
// // --------------------------------------------- */

// // router.put(
// //   "/",
// //   upload.fields([
// //     { name: "image", maxCount: 1 },
// //     { name: "resume", maxCount: 1 },
// //     { name: "certificates", maxCount: 20 },
// //   ]),
// //   async (req, res) => {
// //     try {
// //       const data = req.body;

// //       // Convert empty fields safely
// //       if (typeof data.github === "undefined") data.github = "";
// //       if (typeof data.linkedin === "undefined") data.linkedin = "";
// //       if (typeof data.email === "undefined") data.email = "";

// //       /* --- Image Upload --- */
// //       if (req.files.image) {
// //         data.image = "profile/images/" + req.files.image[0].filename;
// //       }

// //       /* --- Resume Upload --- */
// //       if (req.files.resume) {
// //         data.resume = "profile/resume/" + req.files.resume[0].filename;
// //       }

// //       /* --- Certificates Upload --- */
// //       if (req.files.certificates) {
// //         data.certificates = req.files.certificates.map(
// //           (f) => "profile/certificates/" + f.filename
// //         );
// //       }

// //       // Update or create (upsert)
// //       const updated = await Profile.findOneAndUpdate({}, data, {
// //         new: true,
// //         upsert: true,
// //       });

// //       res.json({ success: true, profile: updated });

// //     } catch (err) {
// //       console.log(err);
// //       res.status(500).json({ error: "Update failed" });
// //     }
// //   }
// // );

// // export default router;
// import express from "express";
// import multer from "multer";
// import mongoose from "mongoose";
// import Grid from "gridfs-stream";
// import Profile from "../models/profile.js";

// const router = express.Router();

// // MongoDB connection (for GridFS)
// const conn = mongoose.connection;
// let gfs;
// conn.once("open", () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("profile_files");
//   console.log("GridFS Connected for Profile");
// });

// /* ---------------- MULTER SETUP (memoryStorage) ---------------- */
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// /* ---------------- GET PROFILE ---------------- */
// router.get("/", async (req, res) => {
//   try {
//     const profile = await Profile.findOne();
//     res.json(profile);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch profile" });
//   }
// });

// /* ---------------- UPDATE PROFILE (WITH GRIDFS FILES) ---------------- */
// router.put(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "resume", maxCount: 1 },
//     { name: "certificates", maxCount: 20 },
//   ]),
//   async (req, res) => {
//     try {
//       const data = req.body;

//       // Convert empty fields safely
//       if (!data.github) data.github = "";
//       if (!data.linkedin) data.linkedin = "";
//       if (!data.email) data.email = "";

//       /* --- Image Upload --- */
//       if (req.files.image) {
//         const imgFile = req.files.image[0];
//         const writestream = gfs.createWriteStream({
//           filename: "profile_image_" + Date.now() + "_" + imgFile.originalname,
//           content_type: imgFile.mimetype,
//         });
//         writestream.write(imgFile.buffer);
//         writestream.end();
//         data.image = writestream.filename;
//       }

//       /* --- Resume Upload --- */
//       if (req.files.resume) {
//         const resumeFile = req.files.resume[0];
//         const writestream = gfs.createWriteStream({
//           filename: "profile_resume_" + Date.now() + "_" + resumeFile.originalname,
//           content_type: resumeFile.mimetype,
//         });
//         writestream.write(resumeFile.buffer);
//         writestream.end();
//         data.resume = writestream.filename;
//       }

//       /* --- Certificates Upload --- */
//       if (req.files.certificates) {
//         data.certificates = [];
//         for (const certFile of req.files.certificates) {
//           const writestream = gfs.createWriteStream({
//             filename: "profile_cert_" + Date.now() + "_" + certFile.originalname,
//             content_type: certFile.mimetype,
//           });
//           writestream.write(certFile.buffer);
//           writestream.end();
//           data.certificates.push(writestream.filename);
//         }
//       }

//       // Update or create (upsert)
//       const updated = await Profile.findOneAndUpdate({}, data, {
//         new: true,
//         upsert: true,
//       });

//       res.json({ success: true, profile: updated });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ error: "Update failed" });
//     }
//   }
// );

// /* ---------------- FETCH FILES FROM GRIDFS ---------------- */
// router.get("/file/:filename", (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     if (!file || file.length === 0) return res.status(404).json({ error: "File not found" });
//     const readstream = gfs.createReadStream(file.filename);
//     res.set("Content-Type", file.contentType);
//     readstream.pipe(res);
//   });
// });

// export default router;
import express from "express";
import mongoose from "mongoose";
import Profile from "../models/Profile.js";
import auth from "../middleware/auth.js";
// import upload from "../utils/upload.js";
import upload from "../middleware/upload.js";
import Grid from "gridfs-stream";

const router = express.Router();

/* ---------------- MONGODB CONNECTION ---------------- */
const mongoURI = process.env.MONGO_URI;
const conn = mongoose.createConnection(mongoURI);
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("profiles");
  console.log("GridFS Connected for Profile");
});

/* ---------------- CREATE PROFILE ---------------- */
router.post("/", auth, upload("profiles"), async (req, res) => {
  try {
    const { name, bio, skills } = req.body;

    const profilePicFile = req.filesGridFS?.find(f => f.fieldname === "profilePic");

    const profile = new Profile({
      name,
      bio,
      skills: skills ? skills.split(",").map(s => s.trim()) : [],
      profilePic: profilePicFile ? profilePicFile.filename : null,
    });

    await profile.save();
    res.json({ success: true, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating profile" });
  }
});

/* ---------------- GET ALL PROFILES ---------------- */
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

/* ---------------- UPDATE PROFILE ---------------- */
router.put("/:id", auth, upload("profiles"), async (req, res) => {
  try {
    const { name, bio, skills } = req.body;

    const updateData = {
      name,
      bio,
      skills: skills ? skills.split(",").map(s => s.trim()) : [],
    };

    const profilePicFile = req.filesGridFS?.find(f => f.fieldname === "profilePic");
    if (profilePicFile) {
      const oldProfile = await Profile.findById(req.params.id);
      if (oldProfile?.profilePic) {
        gfs.remove({ filename: oldProfile.profilePic, root: "profiles" }, (err) => {
          if (err) console.log("GridFS old profilePic delete error:", err);
        });
      }
      updateData.profilePic = profilePicFile.filename;
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, profile: updatedProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});

/* ---------------- DELETE PROFILE ---------------- */
router.delete("/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (profile?.profilePic) {
      gfs.remove({ filename: profile.profilePic, root: "profiles" }, (err) => {
        if (err) console.log("GridFS delete error:", err);
      });
    }

    await Profile.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

/* ---------------- SERVE PROFILE PICS ---------------- */
router.get("/uploads/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) return res.status(404).json({ error: "File not found" });

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  });
});

export default router;
