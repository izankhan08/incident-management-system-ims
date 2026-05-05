const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema({
  component_id: String,
  severity: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  work_item_id: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("Signal", signalSchema);