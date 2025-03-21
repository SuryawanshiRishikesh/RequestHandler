const express = require("express");
const promClient = require("prom-client");

const app = express();
const port = process.argv[2] || process.env.PORT || 5000; // Accept dynamic port

const register = promClient.register;

const httpRequestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  registers: [register],
});

app.use((req, res, next) => {
  httpRequestCounter.inc();
  next();
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.get("/", (req, res) => {
  res.send(`Response from server on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});