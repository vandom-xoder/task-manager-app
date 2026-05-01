const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB (use Atlas for deployment, local for testing)
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskdb")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// ✅ Routes
app.use("/auth", require("./routes/auth"));
app.use("/tasks", require("./routes/tasks"));

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "../client")));

// ✅ Catch-all route (FIXED for Express 5)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// ✅ Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});