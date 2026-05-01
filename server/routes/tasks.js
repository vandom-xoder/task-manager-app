const router = require("express").Router();
const Task = require("../models/Task");

// ✅ Create Task
router.post("/", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      assignedTo: req.body.assignedTo,
      status: req.body.status || "Pending",
      dueDate: req.body.dueDate || null
    });

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Task (title, assignedTo, dueDate)
router.put("/:id", async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.send("Task updated");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Status (Pending → Completed)
router.put("/status/:id", async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });
    res.send("Status updated");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete Task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Task deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;