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

// ===== DB CONNECTION =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.error(err));

// ===== SERVE FRONTEND =====
app.use(express.static(path.join(__dirname, "../client")));

// IMPORTANT: only root route (NO "*")
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// ===== PORT =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});