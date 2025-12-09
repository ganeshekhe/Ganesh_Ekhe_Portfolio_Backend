// import express from "express";
// import Admin from "../models/Admin.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// // REGISTER ADMIN (use only once)
// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;

//   const hashed = await bcrypt.hash(password, 10);

//   const admin = await Admin.create({ email, password: hashed });

//   res.json({ success: true, admin });
// });
// // LOGIN ADMIN
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const admin = await Admin.findOne({ email });

//   if (!admin) return res.status(400).json({ error: "Admin not found" });

//   const isMatch = await bcrypt.compare(password, admin.password);

//   if (!isMatch) return res.status(400).json({ error: "Invalid password" });

//   const token = jwt.sign(
//     { id: admin._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   res.json({ success: true, token });
// });
// export default router;



import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER ADMIN (one-time)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Provide email & password" });

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ error: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hashed });

    res.json({ success: true, admin: { email: admin.email, _id: admin._id } });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Register failed" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
