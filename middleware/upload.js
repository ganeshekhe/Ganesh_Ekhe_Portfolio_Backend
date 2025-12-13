// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/projects");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// export default upload;
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const dir = "uploads/skills";
// if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, dir),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     // accept images only
//     const allowed = /jpeg|jpg|png|svg|webp/;
//     const ext = path.extname(file.originalname).toLowerCase();
//     cb(null, allowed.test(ext));
//   },
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
// });

// export default upload;
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // DYNAMIC UPLOAD FUNCTION
// const upload = (folder = "general") => {

//   const dir = `uploads/${folder}`;

//   // Create folder if not exists
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }

//   // Storage Config
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, dir),
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname).toLowerCase();
//       cb(null, Date.now() + ext);
//     },
//   });

//   // File Filter
//   const fileFilter = (req, file, cb) => {
//     const allowedExt = /jpeg|jpg|png|webp|svg/; // allowed file types
//     const ext = path.extname(file.originalname).toLowerCase();

//     if (!allowedExt.test(ext)) {
//       return cb(new Error("Only image files allowed!"), false);
//     }
//     cb(null, true);
//   };

//   return multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   });
// };

// export default upload;
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import Grid from "gridfs-stream";

// GridFS init
const conn = mongoose.connection;
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("GridFS connected for dynamic uploads");
});

/**
 * DYNAMIC UPLOAD FUNCTION (GridFS)
 * folder = optional prefix for filename
 */
const upload = (folder = "general") => {
  // multer memory storage (required for GridFS)
  const storage = multer.memoryStorage();

  // file filter
  const fileFilter = (req, file, cb) => {
    const allowedExt = /jpeg|jpg|png|webp|svg|pdf/; // images + pdf
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExt.test(ext)) return cb(new Error("Only images/PDF allowed!"), false);
    cb(null, true);
  };

  const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB

  // multer instance
  const uploadMulter = multer({ storage, fileFilter, limits });

  // middleware to handle GridFS upload
  const middleware = (req, res, next) => {
    uploadMulter.any()(req, res, async (err) => {
      if (err) return res.status(400).json({ error: err.message });

      if (!req.files) return next();

      req.filesGridFS = [];

      try {
        for (const file of req.files) {
          const writestream = gfs.createWriteStream({
            filename: `${folder}_${Date.now()}_${file.originalname}`,
            content_type: file.mimetype,
          });
          writestream.write(file.buffer);
          writestream.end();
          req.filesGridFS.push({ fieldname: file.fieldname, filename: writestream.filename });
        }
        next();
      } catch (e) {
        console.error("GridFS Upload Error:", e);
        res.status(500).json({ error: "File upload failed" });
      }
    });
  };

  return middleware;
};

export default upload;
