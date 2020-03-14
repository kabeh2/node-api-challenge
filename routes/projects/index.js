const debug = require("debug")("app:dev");
const projectsDb = require("../../data/helpers/projectModel");
const validateProjectId = require("../../middleware/validateProjectId");
const validateProject = require("../../middleware/validateProject");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await projectsDb.get();
    res.status(200).send(projects);
    debug("Project: ", projects);
  } catch (error) {
    debug("Error: ", error);
    res.status(500).send({
      message: "There was an error retrieving projects from the server."
    });
  }
});

router.get("/:id", validateProjectId, async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await projectsDb.get(projectId);
    res.status(200).send(project);
  } catch (error) {
    debug("Error: ", error.message);
    res.status(500).send({
      message: "There was an error retrieving this project from the server."
    });
  }
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
  const projectId = req.params.id;

  try {
    const actions = await projectsDb.getProjectActions(projectId);

    if (actions) {
      res.status(200).send(actions);
    } else {
      res
        .status(404)
        .send({ message: "There are no actions for this project" });
    }
  } catch (error) {
    debug("Error: ", error.message);
    res.status(500).send({
      message: "There was an error retrieving the actions from the server."
    });
  }
});

router.post("/", validateProject, async (req, res) => {
  const projectPost = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  };

  try {
    const project = await projectsDb.insert(projectPost);

    res.status(201).send(project);
  } catch (error) {
    debug("Error: ", error.message);
    res
      .status(500)
      .send({ message: "There was an error adding project to server." });
  }
});

router.put("/:id", validateProjectId, validateProject, async (req, res) => {
  const projectId = req.params.id;

  const projectPost = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  };

  try {
    const project = await projectsDb.update(projectId, projectPost);

    res.status(201).send(project);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "There was an error updating this projet in the server."
      });
  }
});

router.delete("/:id", validateProjectId, async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await projectsDb.remove(projectId);
    debug("Project deleted...");
    res.status(200).json(project);
  } catch (error) {
    debug("Error: ", error);
    res.status(500).send({
      message: "There was an error deleting this project on the server."
    });
  }
});

module.exports = router;
