const mongoose = require("mongoose");

const workItemSchema = new mongoose.Schema({
  component_id: String,
  status: {
    type: String,
    default: "OPEN"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  closed_at: Date,
  rca: String
});

module.exports = mongoose.model("WorkItem", workItemSchema);