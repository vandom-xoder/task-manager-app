const express = require("express");
const path = require("path");

const app = express();

// ===== BASIC ROUTES =====
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

// ===== SERVE FRONTEND (optional) =====
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

app.get("/app", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ===== IMPORTANT: USE RAILWAY PORT =====
const PORT = process.env.PORT;

// bind to all interfaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Running on port ${PORT}`);
});