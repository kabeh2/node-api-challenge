const yup = require("yup");
const debug = require("debug")("app:dev");

const validateProject = async (req, res, next) => {
  const validation = await validateProjectSchema(req.body);
  debug("Validation: ", validation);

  if (!validation) {
    res
      .status(400)
      .send({ message: "Please ensure the fields are filled out correctly." });
  } else {
    next();
  }
};

const validateProjectSchema = async project => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    completed: yup.boolean()
  });

  try {
    const response = await schema.isValid(project);
    return response;
  } catch (error) {
    debug("Error: ", error.message);
  }
};

module.exports = validateProject;
