const morgan = require("morgan");

const logger = (req, res, next) => {
  try {
    const morganLogger = morgan("tiny");
    morganLogger(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = logger;
