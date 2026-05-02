const express = require("express");
const path = require("path");

const app = express();

// test route
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

// health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// serve frontend (optional)
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

// 🚨 IMPORTANT: dynamic port
const PORT = process.env.PORT;

// 🚨 IMPORTANT: bind to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log("Running on port " + PORT);
});