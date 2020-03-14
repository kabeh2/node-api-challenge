const debug = require("debug")("app:dev");
const actionDb = require("../../data/helpers/actionModel");
const validateActionId = require("../../middleware/validateActionId");
const validateAction = require("../../middleware/validateAction");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const action = await actionDb.get();
    if (action) {
      res.status(200).send(action);
    } else {
      res.status(404).send({ message: "There are no actions available." });
    }
  } catch (error) {
    res.status(500).send({ message: "There was an error retrieving actions." });
  }
});

router.get("/:id", validateActionId, async (req, res) => {
  const actionId = req.params.id;

  try {
    const action = await actionDb.get(actionId);
    res.status(200).send(action);
  } catch (error) {
    res.status(500).send({
      message: "There was an error retrieving action from the server."
    });
  }
});

router.delete("/:id", validateActionId, async (req, res) => {
  const actionId = req.params.id;

  try {
    const action = await actionDb.remove(actionId);

    res.status(200).json(action);
  } catch (error) {
    res.status(500).send({
      message: "There was an error deleting the action from the server."
    });
  }
});

router.post("/", validateAction, async (req, res) => {
  const actionPost = {
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes,
    completed: req.body.completed
  };

  try {
    const newAction = await actionDb.insert(actionPost);

    if (newAction) {
      res.status(201).send(newAction);
    } else {
      res
        .status(400)
        .send({ message: "There was an error creating a new action." });
    }
  } catch (error) {
    debug("Error: ", error.message);
    res.status(500).send({
      message: "There was an error adding the new action to the server."
    });
  }
});

router.put("/:id", validateActionId, validateAction, async (req, res) => {
  const actionId = req.params.id;

  const actionPost = {
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes,
    completed: req.body.completed
  };

  try {
    const action = await actionDb.update(actionId, actionPost);
    res.status(201).send(action);
  } catch (error) {
    debug("Error:", error.message);
    res.status(500).send({
      message: "There was an error updating this post on the server."
    });
  }
});

module.exports = router;
