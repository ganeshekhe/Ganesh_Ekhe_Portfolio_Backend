



// // import express from "express";
// // import Skill from "../models/Skill.js";
// // import auth from "../middleware/auth.js";

// // const router = express.Router();

// // router.post("/", auth, async (req, res) => {
// //   const skill = await Skill.create(req.body);
// //   res.json({ success: true, skill });
// // });

// // router.get("/", async (req, res) => {
// //   const skills = await Skill.find();
// //   res.json(skills);
// // });

// // router.put("/:id", auth, async (req, res) => {
// //   await Skill.findByIdAndUpdate(req.params.id, req.body);
// //   res.json({ success: true });
// // });

// // router.delete("/:id", auth, async (req, res) => {
// //   await Skill.findByIdAndDelete(req.params.id);
// //   res.json({ success: true });
// // });

// // export default router;



// import express from "express";
// import Skill from "../models/Skill.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// /* --------------------------------------
//    CREATE SKILL
// ----------------------------------------- */
// router.post("/", auth, async (req, res) => {
//   try {
//     const { name, level, difficulty, category, experience, usedInProjects, icon, order } = req.body;

//     if (!name || !level) {
//       return res.status(400).json({ error: "Name & level are required" });
//     }

//     const skill = await Skill.create({
//       name,
//       level,
//       difficulty,
//       category,
//       experience,
//       usedInProjects,
//       icon,
//       order,
//     });

//     res.json({ success: true, skill });
//   } catch (err) {
//     console.log("Create Skill Error:", err);
//     res.status(500).json({ error: "Failed to create skill" });
//   }
// });

// /* --------------------------------------
//    GET ALL SKILLS
// ----------------------------------------- */
// router.get("/", async (req, res) => {
//   try {
//     const skills = await Skill.find().sort({ order: 1, level: -1 });
//     res.json(skills);
//   } catch (err) {
//     console.log("Get Skills Error:", err);
//     res.status(500).json({ error: "Failed to fetch skills" });
//   }
// });

// /* --------------------------------------
//    UPDATE SKILL
// ----------------------------------------- */
// router.put("/:id", auth, async (req, res) => {
//   try {
//     const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });

//     if (!skill) return res.status(404).json({ error: "Skill not found" });

//     res.json({ success: true, skill });
//   } catch (err) {
//     console.log("Update Skill Error:", err);
//     res.status(500).json({ error: "Failed to update skill" });
//   }
// });

// /* --------------------------------------
//    DELETE SKILL
// ----------------------------------------- */
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const skill = await Skill.findByIdAndDelete(req.params.id);

//     if (!skill) return res.status(404).json({ error: "Skill not found" });

//     res.json({ success: true, message: "Skill deleted" });
//   } catch (err) {
//     console.log("Delete Skill Error:", err);
//     res.status(500).json({ error: "Failed to delete skill" });
//   }
// });

// export default router;


// import express from "express";
// import Skill from "../models/Skill.js";
// import auth from "../middleware/auth.js";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// /* CREATE SKILL (accepts optional "icon" file) */
// router.post("/", auth, upload.single("icon"), async (req, res) => {
//   try {
//     // parse form fields (req.body values are strings)
//     const {
//       name,
//       level,
//       difficulty,
//       category,
//       experience,
//       usedInProjects,
//       order,
//       iconName, // optional lucide icon name if user wants
//     } = req.body;

//     if (!name || (level === undefined || level === "")) {
//       return res.status(400).json({ error: "Name & level are required" });
//     }

//     const skillData = {
//       name: name.trim(),
//       level: Number(level) || 0,
//       difficulty: Number(difficulty) || 1,
//       category: category || "General",
//       experience: experience ? String(experience) : "0 months",
//       usedInProjects: Number(usedInProjects) || 0,
//       order: Number(order) || 0,
//       // if file uploaded use that path, else use iconName or default
//       icon: req.file ? `skills/${req.file.filename}` : (iconName || "Code2"),
//     };

//     const skill = await Skill.create(skillData);
//     res.json({ success: true, skill });
//   } catch (err) {
//     console.log("Create Skill Error:", err);
//     res.status(500).json({ error: "Failed to create skill" });
//   }
// });

// /* GET ALL SKILLS */
// router.get("/", async (req, res) => {
//   try {
//     const skills = await Skill.find().sort({ order: 1, level: -1 });
//     res.json(skills);
//   } catch (err) {
//     console.log("Get Skills Error:", err);
//     res.status(500).json({ error: "Failed to fetch skills" });
//   }
// });

// /* UPDATE SKILL (accepts optional icon file) */
// router.put("/:id", auth, upload.single("icon"), async (req, res) => {
//   try {
//     const {
//       name,
//       level,
//       difficulty,
//       category,
//       experience,
//       usedInProjects,
//       order,
//       iconName,
//     } = req.body;

//     const updateData = {
//       ...(name && { name: name.trim() }),
//       ...(level !== undefined && { level: Number(level) || 0 }),
//       ...(difficulty !== undefined && { difficulty: Number(difficulty) || 1 }),
//       ...(category && { category }),
//       ...(experience !== undefined && { experience: String(experience) }),
//       ...(usedInProjects !== undefined && { usedInProjects: Number(usedInProjects) || 0 }),
//       ...(order !== undefined && { order: Number(order) || 0 }),
//     };

//     if (req.file) updateData.icon = `skills/${req.file.filename}`;
//     else if (iconName) updateData.icon = iconName;

//     const skill = await Skill.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     if (!skill) return res.status(404).json({ error: "Skill not found" });

//     res.json({ success: true, skill });
//   } catch (err) {
//     console.log("Update Skill Error:", err);
//     res.status(500).json({ error: "Failed to update skill" });
//   }
// });

// /* DELETE SKILL */
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const skill = await Skill.findByIdAndDelete(req.params.id);
//     if (!skill) return res.status(404).json({ error: "Skill not found" });
//     res.json({ success: true, message: "Skill deleted" });
//   } catch (err) {
//     console.log("Delete Skill Error:", err);
//     res.status(500).json({ error: "Failed to delete skill" });
//   }
// });

// export default router;
// import express from "express";
// import Skill from "../models/Skill.js";
// import auth from "../middleware/auth.js";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// /* --------------------------------------
//    CREATE SKILL (supports icon upload)
// ----------------------------------------- */
// router.post("/", auth, upload("skills").single("icon"), async (req, res) => {
//   try {
//     const {
//       name,
//       level,
//       difficulty,
//       category,
//       experience,
//       usedInProjects,
//       order,
//       iconName,
//     } = req.body;

//     if (!name || !level) {
//       return res.status(400).json({ error: "Name & Level are required" });
//     }

//     const skill = await Skill.create({
//       name: name.trim(),
//       level: Number(level),
//       difficulty: Number(difficulty) || 1,
//       category: category || "General",
//       experience: experience ? String(experience) : "0 months",
//       usedInProjects: Number(usedInProjects) || 0,
//       order: Number(order) || 0,
//       icon: req.file ? `skills/${req.file.filename}` : (iconName || "Code2"),
//     });

//     res.json({ success: true, skill });

//   } catch (err) {
//     console.log("Create Skill Error:", err);
//     res.status(500).json({ error: "Failed to create skill" });
//   }
// });

// /* --------------------------------------
//    GET ALL SKILLS
// ----------------------------------------- */
// router.get("/", async (req, res) => {
//   try {
//     const skills = await Skill.find().sort({ order: 1, level: -1 });
//     res.json(skills);
//   } catch (err) {
//     console.log("Get Skills Error:", err);
//     res.status(500).json({ error: "Failed to fetch skills" });
//   }
// });

// /* --------------------------------------
//    UPDATE SKILL (supports new icon upload)
// ----------------------------------------- */
// router.put("/:id", auth, upload("skills").single("icon"), async (req, res) => {
//   try {
//     const {
//       name,
//       level,
//       difficulty,
//       category,
//       experience,
//       usedInProjects,
//       order,
//       iconName,
//     } = req.body;

//     const updateData = {};

//     if (name) updateData.name = name.trim();
//     if (level) updateData.level = Number(level);
//     if (difficulty) updateData.difficulty = Number(difficulty);
//     if (category) updateData.category = category;
//     if (experience) updateData.experience = String(experience);
//     if (usedInProjects) updateData.usedInProjects = Number(usedInProjects);
//     if (order) updateData.order = Number(order);

//     if (req.file) updateData.icon = `skills/${req.file.filename}`;
//     else if (iconName) updateData.icon = iconName;

//     const skill = await Skill.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     if (!skill) return res.status(404).json({ error: "Skill not found" });

//     res.json({ success: true, skill });

//   } catch (err) {
//     console.log("Update Skill Error:", err);
//     res.status(500).json({ error: "Failed to update skill" });
//   }
// });

// /* --------------------------------------
//    DELETE SKILL
// ----------------------------------------- */
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const skill = await Skill.findByIdAndDelete(req.params.id);
//     if (!skill) return res.status(404).json({ error: "Skill not found" });

//     res.json({ success: true, message: "Skill deleted" });

//   } catch (err) {
//     console.log("Delete Skill Error:", err);
//     res.status(500).json({ error: "Failed to delete skill" });
//   }
// });

// export default router;


import express from "express";
import Skill from "../models/Skill.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* --------------------------------------
   CREATE SKILL (supports icon upload)
----------------------------------------- */
router.post("/", auth, upload("skills").single("icon"), async (req, res) => {
  try {
    const {
      name,
      level,
      difficulty,
      category,
      experience,
      usedInProjects,
      order,
      iconName,
    } = req.body;

    if (!name || !level) {
      return res.status(400).json({ error: "Name & Level are required" });
    }

    const skill = await Skill.create({
      name: name.trim(),
      level: Number(level),
      difficulty: Number(difficulty) || 1,
      category: category || "General",
      experience: experience ? String(experience) : "0 months",
      usedInProjects: Number(usedInProjects) || 0,
      order: Number(order) || 0,
      icon: req.file ? `skills/${req.file.filename}` : (iconName || "Code2"),
    });

    res.json({ success: true, skill });

  } catch (err) {
    console.log("Create Skill Error:", err);
    res.status(500).json({ error: "Failed to create skill" });
  }
});

/* --------------------------------------
   GET ALL SKILLS
----------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, level: -1 });
    res.json(skills);
  } catch (err) {
    console.log("Get Skills Error:", err);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

/* --------------------------------------
   UPDATE SKILL (supports new icon upload)
----------------------------------------- */
router.put("/:id", auth, upload("skills").single("icon"), async (req, res) => {
  try {
    const {
      name,
      level,
      difficulty,
      category,
      experience,
      usedInProjects,
      order,
      iconName,
    } = req.body;

    const updateData = {};

    if (name) updateData.name = name.trim();
    if (level) updateData.level = Number(level);
    if (difficulty) updateData.difficulty = Number(difficulty);
    if (category) updateData.category = category;
    if (experience) updateData.experience = String(experience);
    if (usedInProjects) updateData.usedInProjects = Number(usedInProjects);
    if (order) updateData.order = Number(order);

    if (req.file) updateData.icon = `skills/${req.file.filename}`;
    else if (iconName) updateData.icon = iconName;

    const skill = await Skill.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!skill) return res.status(404).json({ error: "Skill not found" });

    res.json({ success: true, skill });

  } catch (err) {
    console.log("Update Skill Error:", err);
    res.status(500).json({ error: "Failed to update skill" });
  }
});

/* --------------------------------------
   DELETE SKILL
----------------------------------------- */
router.delete("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });

    res.json({ success: true, message: "Skill deleted" });

  } catch (err) {
    console.log("Delete Skill Error:", err);
    res.status(500).json({ error: "Failed to delete skill" });
  }
});

export default router;
