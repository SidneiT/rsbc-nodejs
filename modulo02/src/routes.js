import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ hellorWorld: "Hello World" });
});

module.exports = routes;
