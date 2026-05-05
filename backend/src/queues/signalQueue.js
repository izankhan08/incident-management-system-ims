const { Queue } = require("bullmq");
const redis = require("../config/redis");

const signalQueue = new Queue("signalQueue", {
  connection: redis
});

module.exports = signalQueue;