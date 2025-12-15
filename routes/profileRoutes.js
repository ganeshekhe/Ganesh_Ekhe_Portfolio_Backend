

// import express from "express";
// import multer from "multer";
// import Profile from "../models/Profile.js";

// const router = express.Router();

// // MULTER STORAGE
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // GET PROFILE
// router.get("/", async (req, res) => {
//   const profile = await Profile.findOne();
//   res.json(profile);
// });

// // UPDATE PROFILE (with file uploads)
// router.put(
//   "/",
//   upload.fields([
//     { name: "image", maxCount: 1 },
//     { name: "resume", maxCount: 1 },
//     { name: "certificates", maxCount: 10 },
//   ]),
//   async (req, res) => {
//     try {
//       const data = req.body;

//       if (req.files.image)
//         data.image = req.files.image[0].filename;

//       if (req.files.resume)
//         data.resume = req.files.resume[0].filename;

//       if (req.files.certificates)
//         data.certificates = req.files.certificates.map(f => f.filename);

//       const updated = await Profile.findOneAndUpdate({}, data, { new: true, upsert: true });

//       res.json(updated);
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ error: "Update failed" });
//     }
//   }
// );

// export default router;


import express from "express";
import multer from "multer";
import Profile from "../models/profile.js";
import auth from "../middleware/auth.js";

import fs from "fs";

["uploads/profile/images", "uploads/profile/resume", "uploads/profile/certificates"]
  .forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

const router = express.Router();

/* --------------------------------------------
   MULTER STORAGE (Proper folder structure)
--------------------------------------------- */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // dynamic folder
    if (file.fieldname === "image") cb(null, "uploads/profile/images/");
    else if (file.fieldname === "resume") cb(null, "uploads/profile/resume/");
    else if (file.fieldname === "certificates") cb(null, "uploads/profile/certificates/");
    else cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, Date.now() + "-" + file.fieldname + "." + ext);
  },
});

const upload = multer({ storage });

/* --------------------------------------------
   GET PROFILE 
--------------------------------------------- */

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

/* --------------------------------------------
   UPDATE PROFILE (WITH FILE UPLOADS)
--------------------------------------------- */

router.put(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "certificates", maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      const data = req.body;

      // Convert empty fields safely
      if (typeof data.github === "undefined") data.github = "";
      if (typeof data.linkedin === "undefined") data.linkedin = "";
      if (typeof data.email === "undefined") data.email = "";

      /* --- Image Upload --- */
      if (req.files.image) {
        data.image = "profile/images/" + req.files.image[0].filename;
      }

      /* --- Resume Upload --- */
      if (req.files.resume) {
        data.resume = "profile/resume/" + req.files.resume[0].filename;
      }

      /* --- Certificates Upload --- */
      if (req.files.certificates) {
        data.certificates = req.files.certificates.map(
          (f) => "profile/certificates/" + f.filename
        );
      }

      // Update or create (upsert)
      const updated = await Profile.findOneAndUpdate({}, data, {
        new: true,
        upsert: true,
      });

      res.json({ success: true, profile: updated });

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Update failed" });
    }
  }
);

export default router;
