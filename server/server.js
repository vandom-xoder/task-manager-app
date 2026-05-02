const express = require("express");
const path = require("path");

const app = express();

// ===== BASIC ROUTE (to verify server is working) =====
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

// ===== OPTIONAL: health check =====
app.get("/health", (req, res) => {
  res.send("OK");
});

// ===== SERVE FRONTEND (if exists) =====
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

app.get("/app", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ===== IMPORTANT: Railway PORT =====
const PORT = process.env.PORT || 5000;

// MUST bind to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});