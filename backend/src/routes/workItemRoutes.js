const express = require("express");
const router = express.Router();
const WorkItem = require("../models/WorkItem");


// ✅ GET ALL INCIDENTS
router.get("/", async (req, res) => {
  try {
    const items = await WorkItem.find().sort({ created_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET SINGLE INCIDENT
router.get("/:id", async (req, res) => {
  try {
    const item = await WorkItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "WorkItem not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ CLOSE INCIDENT
router.patch("/:id/close", async (req, res) => {
  try {
    const { rca } = req.body;

    if (!rca) {
      return res.status(400).json({
        error: "RCA is required before closing incident"
      });
    }

    const workItem = await WorkItem.findById(req.params.id);

    if (!workItem) {
      return res.status(404).json({ error: "WorkItem not found" });
    }

    workItem.status = "CLOSED";
    workItem.rca = rca;
    workItem.closed_at = new Date();

    await workItem.save();

    res.json({
      message: "Incident closed successfully",
      data: workItem
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;