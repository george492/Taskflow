require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

app.use(express.json());

app.use(
    cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    })
);

mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true    useNewUrlParser & useUnifiedTopology have no effect since Node.js Driver version 4.0.0
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("API running"));


app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);  // Protected


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// connectDB();