const express = require("express");
const { serve, setup } = require("./swagger");

const wineRoutes = require("./src/routes/wine");
const userRoutes = require("./src/routes/user");
const imageRoutes = require("./src/routes/image");

const app = express();
const cors = require("cors");
app.use(cors());

app.use("/api-docs", serve, setup);

app.use("/api/wine", wineRoutes);
app.use("/api/wine/name", wineRoutes);

app.use("/images", imageRoutes);

app.use("/api/auth", userRoutes);

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid JSON syntax" });
  }
  next();
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
