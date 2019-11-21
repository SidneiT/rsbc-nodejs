const express = require("express");

const server = express();

server.use(express.json());

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

function checkNameExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }
  return next();
}

function checkUserIndex(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exist" });
  }

  req.user = user;

  return next();
}

// Query params = req.query
// Route params = req.params
// Request body = req.body
// CRUD = Create,Read,Update,Delete

const users = ["Ronaldinho Gaucho", "Etevaldo", "Rivaldo"];

// Create
server.post("/users", checkNameExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.status(201).json(users);
});

// Read All
server.get("/users", (req, res) => {
  return res.json(users);
});

// Read One
server.get("/users/:index", checkUserIndex, (req, res) => {
  return res.json(req.user);
});

// Update
server.put("/users/:index", checkNameExists, checkUserIndex, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;
  users[index] = name;
  return res.json(users);
});

// Delete
server.delete("/users/:index", checkUserIndex, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.json(users);
});

server.listen(3000);
