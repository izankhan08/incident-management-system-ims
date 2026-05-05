const express = require("express");
const router = express.Router();
const signalQueue = require("../queues/signalQueue");

// ✅ POST signal
router.post("/", async (req, res) => {
  try {
    const { component_id, severity, message } = req.body;

    await signalQueue.add("signal", {
      component_id,
      severity,
      message
    }, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000
      }
    });

    res.json({
      message: "Signal added to queue"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ GET signals
router.get("/", async (req, res) => {
  try {
    const Signal = require("../models/Signal");
    const signals = await Signal.find().sort({ timestamp: -1 });
    res.json(signals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router; // ✅ always LAST