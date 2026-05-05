const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongo = require("./config/mongo");

// Routes
const signalRoutes = require("./routes/signalRoutes");
const workItemRoutes = require("./routes/workItemRoutes");

dotenv.config();

const app = express(); // ✅ FIRST create app

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/signals", signalRoutes);
app.use("/api/workitems", workItemRoutes); // ✅ NOW correct

// Test route
app.get("/", (req, res) => {
  res.send("IMS Backend Running 🚀");
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "System healthy"
  });
});

// Start server
const PORT = process.env.PORT || 5000;

connectMongo(); // connect DB

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});