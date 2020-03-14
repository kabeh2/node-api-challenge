const actionDb = require("../data/helpers/actionModel");

const validateActionId = async (req, res, next) => {
  const actionId = req.params.id;

  try {
    const action = await actionDb.get(actionId);

    if (!action) {
      res.status(404).send({ message: "This action does not exist." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = validateActionId;
