const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Routes =====
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));

// ===== Optional DB (won't crash if missing) =====
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log("DB Connected"))
    .catch(err => console.error("DB Error:", err.message));
} else {
  console.log("No MONGO_URI provided (running without DB)");
}

// ===== Serve Frontend =====
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Health check (helps Railway)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});