const express = require("express");
const path = require("path");

const app = express();

// simple health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// serve frontend
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// IMPORTANT: bind to Railway port
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server started on port " + PORT);
});