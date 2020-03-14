const yup = require("yup");
const debug = require("debug")("app:dev");

const validateAction = async (req, res, next) => {
  const validate = await validateActionSchema(req.body);
  debug("Validate Action: ", validate);

  if (!validate) {
    res.status(400).send({
      message: "Please fill all fields correctly."
    });
  } else {
    next();
  }
};

const validateActionSchema = async action => {
  const schema = yup.object().shape({
    project_id: yup
      .number()
      .integer()
      .required(),
    description: yup
      .string()
      .max(128, "Max 128 characters.")
      .required(),
    notes: yup.string().required(),
    completed: yup.boolean()
  });

  try {
    const response = await schema.isValid(action);
    return response;
  } catch (error) {
    debug("Error: ", error.message);
  }
};

module.exports = validateAction;
