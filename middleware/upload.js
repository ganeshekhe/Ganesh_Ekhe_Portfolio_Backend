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
import multer from "multer";
import path from "path";
import fs from "fs";

// DYNAMIC UPLOAD FUNCTION
const upload = (folder = "general") => {

  const dir = `uploads/${folder}`;

  // Create folder if not exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Storage Config
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, Date.now() + ext);
    },
  });

  // File Filter
  const fileFilter = (req, file, cb) => {
    const allowedExt = /jpeg|jpg|png|webp|svg/; // allowed file types
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExt.test(ext)) {
      return cb(new Error("Only image files allowed!"), false);
    }
    cb(null, true);
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  });
};

export default upload;
