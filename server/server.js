const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err));

// ===== FIXED FRONTEND PATH =====
const clientPath = path.resolve(__dirname, "../client");

app.use(express.static(clientPath));

// ROOT
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// OPTIONAL: handle unknown routes safely
app.use((req, res) => {
  res.status(404).send("Route not found");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});