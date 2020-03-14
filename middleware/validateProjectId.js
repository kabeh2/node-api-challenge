const projectDb = require("../data/helpers/projectModel");

const validateProjectId = async (req, res, next) => {
  const projectId = req.params.id;

  const project = await projectDb.get(projectId);

  if (project) {
    next();
  } else {
    res.status(404).send({
      message: "This project does not exist!"
    });
  }
};

module.exports = validateProjectId;
