require("dotenv").config();

const { Worker } = require("bullmq");
const redis = require("../config/redis");
const connectMongo = require("../config/mongo");
const Signal = require("../models/Signal");
const WorkItem = require("../models/WorkItem");

connectMongo();

const worker = new Worker(
  "signalQueue",
  async (job) => {

    // ✅ MOVE VALIDATION HERE
    if (!job.data || !job.data.component_id) {
      console.log("⚠️ Invalid job data skipped:", job.data);
      return;
    }

    const { component_id, severity, message } = job.data;

    console.log("Processing signal:", job.data);

    const tenSecondsAgo = new Date(Date.now() - 10000);

    let workItem = await WorkItem.findOne({
      component_id,
      created_at: { $gte: tenSecondsAgo }
    });

    if (!workItem) {
      workItem = new WorkItem({ component_id });
      await workItem.save();
      console.log("✅ New WorkItem created:", workItem._id);
    } else {
      console.log("♻️ Using existing WorkItem:", workItem._id);
    }

    const signal = new Signal({
      component_id,
      severity,
      message,
      work_item_id: workItem._id
    });

    await signal.save();
  },
  { connection: redis }
);

worker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`Job failed: ${job.id}`, err);
});