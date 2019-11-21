const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.count("Req");
  return next();
});

const checkProjectExists = function(req, res, next) {
  req.project = projects.find(item => item.id == req.params.id);

  return !req.project
    ? res.status(400).json({ error: "Project does not exists" })
    : next();
};

const checkTitleExists = function(req, res, next) {
  return !req.body.title
    ? res.status(400).json({ error: "Title is required" })
    : next();
};

const checkIdExists = function(req, res, next) {
  return !req.body.id
    ? res.status(400).json({ error: "ID is required" })
    : next();
};

const projects = [];

// Create
app.post("/projects", checkTitleExists, checkIdExists, (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.status(201).json(projects);
});

// Get All
app.get("/projects", (req, res) => {
  return res.json(projects);
});

// Edit
app.put("/projects/:id", checkProjectExists, checkTitleExists, (req, res) => {
  req.project.title = req.body.title;

  return res.json(projects);
});

// Delete
app.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  projects.splice(
    projects.findIndex(item => item.id == id),
    1
  );

  return res.json(projects);
});

// Create task
app.post(
  "/projects/:id/tasks",
  checkProjectExists,
  checkTitleExists,
  (req, res) => {
    req.project.tasks.push(req.body.title);

    return res.status(201).json(projects);
  }
);

app.listen(3000);
