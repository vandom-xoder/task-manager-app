const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== ROUTES =====
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));

// ===== MONGODB =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.error("DB Error:", err));

// ===== SERVE FRONTEND =====
const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Optional: handle unknown routes (avoid crash)
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});