const express = require("express");
const path = require("path");

const app = express();

// ===== BASIC TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

// ===== HEALTH CHECK =====
app.get("/health", (req, res) => {
  res.send("OK");
});

// ===== SERVE FRONTEND (optional) =====
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

app.get("/app", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ===== 🚨 IMPORTANT: NO HARDCODED PORT =====
const PORT = process.env.PORT;

// ===== START SERVER =====
app.listen(PORT, "0.0.0.0", () => {
  console.log("Running on port " + PORT);
});