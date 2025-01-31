const express = require("express");
const cors = require("cors");
const authRoutes = require("./auth");
const todoRoutes = require("./todos");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
