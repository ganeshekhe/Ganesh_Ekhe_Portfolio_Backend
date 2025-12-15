
// // // import express from "express";
// // // import Project from "../models/Project.js";
// // // import auth from "../middleware/auth.js";

// // // const router = express.Router();

// // // // CREATE PROJECT (protected)
// // // router.post("/", auth, async (req, res) => {
// // //   try {
// // //     const project = await Project.create(req.body);
// // //     res.json({ success: true, project });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ error: "Failed to create project" });
// // //   }
// // // });

// // // // GET ALL
// // // router.get("/", async (req, res) => {
// // //   const projects = await Project.find().sort({ createdAt: -1 });
// // //   res.json(projects);
// // // });

// // // // GET ONE
// // // router.get("/:id", async (req, res) => {
// // //   const project = await Project.findById(req.params.id);
// // //   if (!project) return res.status(404).json({ error: "Project not found" });
// // //   res.json({ project });
// // // });

// // // // UPDATE (protected)
// // // router.put("/:id", auth, async (req, res) => {
// // //   const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // //   res.json({ success: true, updated });
// // // });

// // // // DELETE (protected)
// // // router.delete("/:id", auth, async (req, res) => {
// // //   await Project.findByIdAndDelete(req.params.id);
// // //   res.json({ success: true });
// // // });

// // // export default router;



// // import express from "express";
// // import Project from "../models/Project.js";
// // import auth from "../middleware/auth.js";
// // import upload from "../middleware/upload.js";

// // const router = express.Router();

// // // ADD PROJECT WITH IMAGE UPLOAD
// // router.post("/", auth, upload.single("image"), async (req, res) => {
// //   try {
// //     const { title, description, github, live, tech } = req.body;
// //     const imagePath = req.file ? "/uploads/projects/" + req.file.filename : "";

// //     const project = await Project.create({
// //       title,
// //       description,
// //       github,
// //       live,
// //       tech: tech ? tech.split(",") : [],
// //       image: imagePath
// //     });

// //     res.json(project);
// //   } catch (err) {
// //     res.status(500).json({ error: "Project Create Error" });
// //   }
// // });

// // // GET PROJECTS
// // router.get("/", async (req, res) => {
// //   const projects = await Project.find();
// //   res.json(projects);
// // });

// // // DELETE PROJECT
// // router.delete("/:id", auth, async (req, res) => {
// //   await Project.findByIdAndDelete(req.params.id);
// //   res.json({ success: true });
// // });

// // export default router;


// import express from "express";
// import multer from "multer";
// import Project from "../models/Project.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// // STORAGE SETUP
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/projects");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.originalname.split(".").pop();
//     cb(null, Date.now() + "." + ext);
//   },
// });

// const upload = multer({ storage });

// // CREATE PROJECT (with image upload)
// router.post("/", auth, upload.single("image"), async (req, res) => {
//   try {
//     const { title, description, github, live, tech } = req.body;

//     const project = new Project({
//       title,
//       description,
//       github,
//       live,
//       tech: tech.split(","),
//       image: req.file ? "projects/" + req.file.filename : null,
//     });

//     await project.save();
//     res.json({ success: true, project });

//   } catch (err) {
//     res.status(500).json({ error: "Error creating project" });
//   }
// });

// // GET ALL PROJECTS
// router.get("/", async (req, res) => {
//   const projects = await Project.find();
//   res.json(projects);
// });

// // DELETE
// router.delete("/:id", auth, async (req, res) => {
//   await Project.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// export default router;




import express from "express";
import multer from "multer";
import Project from "../models/Project.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* ---------------- FILE UPLOAD SETUP ---------------- */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/projects");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    cb(null, Date.now() + "." + ext);
  },
});

const upload = multer({ storage });

/* ---------------- CREATE PROJECT (UPLOAD SINGLE IMAGE) ---------------- */

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, github, live, tech } = req.body;

    const project = new Project({
      title,
      description,
      github,
      live,
      // tech: tech.split(",").map((t) => t.trim()),
      tech: tech ? tech.split(",").map(t => t.trim()) : [],

      image: req.file ? "projects/" + req.file.filename : null,
    });

    await project.save();

    res.json({ success: true, project });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating project" });
  }
});

/* ---------------- GET ALL PROJECTS ---------------- */

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

/* ---------------- DELETE PROJECT ---------------- */

router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

/* ---------------- UPDATE PROJECT (WITH IMAGE SUPPORT) ---------------- */

router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description, github, live, tech } = req.body;

    const updateData = {
      title,
      description,
      github,
      live,
      // tech: tech.split(",").map((t) => t.trim()),
      tech: tech ? tech.split(",").map(t => t.trim()) : [],

    };

    // If new image is uploaded
    if (req.file) {
      updateData.image = "projects/" + req.file.filename;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ success: true, project: updatedProject });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;
