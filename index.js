const debug = require("debug")("app:dev");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const projects = require("./routes/projects");
const actions = require("./routes/actions");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(helmet());

// Middleware
if (app.get("env") === "development") {
  debug("Morgan Logging enabled...");
  app.use(logger);
}

// Routes
app.use("/api/projects/", projects);
app.use("/api/actions/", actions);

const port = process.env.PORT || 3001;
app.listen(port, () => debug(`Listening on port ${port}...`));
