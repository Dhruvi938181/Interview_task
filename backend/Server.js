const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

module.exports = app;
