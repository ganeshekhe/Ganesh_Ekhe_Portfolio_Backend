



// // new 

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import nodemailer from "nodemailer";

// // Routes
// import adminRoutes from "./routes/adminRoutes.js";
// import projectRoutes from "./routes/projectRoutes.js";
// import skillRoutes from "./routes/skillRoutes.js";
// // import profileRoutes from "./routes/profileRoutes.js";
// import profileRoutes from "./routes/profileRoutes.js";
// dotenv.config();

// const app = express();

// // Middlewares
// // app.use(cors());
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://ganesh-ekhe-portfolio.vercel.app" // <-- तुझा actual Vercel URL
//   ],
//   credentials: true
// }));

// app.use(express.json());

// app.use("/uploads", express.static("uploads"));

// // TEST ROUTE
// app.get("/", (req, res) => {
//   res.send("Backend Working!");
// });

// // ADMIN ROUTES (register/login)
// app.use("/api/admin", adminRoutes);

// // CONTACT API
// app.post("/contact", async (req, res) => {
//   const { name, email, message } = req.body;
//   if (!name || !email || !message) {
//     return res.status(400).json({ error: "All fields are required" });
//   }
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: email,
//       to: process.env.EMAIL_USER,
//       subject: `New message from ${name}`,
//       text: `From: ${email}\n\n${message}`,
//     });

//     res.json({ success: true, message: "Email sent successfully!" });
//   } catch (err) {
//     console.error("Mail send error:", err);
//     res.status(500).json({ error: "Email sending failed" });
//   }
// });

// // API ROUTES (protected where needed)

// app.use("/api/projects", projectRoutes);
// app.use("/api/skills", skillRoutes);
// app.use("/api/profile", profileRoutes);


// // MongoDB connect and start server
// const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//     app.listen(PORT, () => console.log("Server running on port", PORT));
//   })
//   .catch((err) => {
//     console.error("DB Error:", err);
//   });








import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

// Routes
import adminRoutes from "./routes/adminRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

/* =======================
   MIDDLEWARES
======================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ganesh-ekhe-portfolio.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());

// Static files (images, resumes, icons)
app.use("/uploads", express.static("uploads"));

/* =======================
   TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("Backend Working!");
});

/* =======================
   ROUTES
======================= */

// Admin auth
app.use("/api/admin", adminRoutes);

// Projects
app.use("/api/projects", projectRoutes);

// Skills
app.use("/api/skills", skillRoutes);

// Profile
app.use("/api/profile", profileRoutes);

/* =======================
   CONTACT API
======================= */
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name}`,
      text: `From: ${email}\n\n${message}`,
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Mail send error:", err);
    res.status(500).json({ error: "Email sending failed" });
  }
});

/* =======================
   DB + SERVER START
======================= */

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });
