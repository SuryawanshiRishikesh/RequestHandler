const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
const PORT = 4000;

const servers = [
  { name: "Server 1", port: 5001 },
  { name: "Server 2", port: 5002 },
  { name: "Server 3", port: 5003 },
  { name: "Server 4", port: 5004 }
];

app.use(express.json());

app.get("/status", (req, res) => {
  const statusPromises = servers.map(server =>
    new Promise(resolve => {
      exec(`lsof -i :${server.port}`, (error, stdout) => {
        resolve({
          name: server.name,
          port: server.port,
          status: stdout.includes("LISTEN") ? "Running" : "Stopped"
        });
      });
    })
  );

  Promise.all(statusPromises).then(results => res.json(results));
});

app.post("/start/:port", (req, res) => {
  const server = servers.find(s => s.port == req.params.port);
  if (!server) return res.status(400).json({ error: "Invalid server port" });

  exec(`node server.js ${server.port} &`, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `${server.name} started on port ${server.port}` });
  });
});

app.post("/stop/:port", (req, res) => {
  exec(`lsof -ti :${req.params.port} | xargs kill`, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Server on port ${req.params.port} stopped` });
  });
});

app.post("/restart/:port", (req, res) => {
  exec(`lsof -ti :${req.params.port} | xargs kill`, (err) => {
    exec(`node server.js ${req.params.port} &`, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: `Server on port ${req.params.port} restarted` });
    });
  });
});

app.listen(PORT, () => console.log(`Admin API running on port ${PORT}`));