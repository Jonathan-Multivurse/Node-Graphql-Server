const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { GraphqlServer } = require("./graphql/graphql");
const expressJwt = require("express-jwt");
const bodyParser = require("body-parser");
const { format, createLogger, transports } = require("winston");
require("dotenv").config();

//Graphql configuration
GraphqlServer.applyMiddleware({ app });

//Databse configuration
const url =
  "mongodb+srv://purplic:devhuchu13@@deepy.wugfl.mongodb.net/Deepy?retryWrites=true&w=majority";

mongoose.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  function (err) {
    if (!err) {
      logger.info("MongoDB Connected!");
    } else {
      logger.info("Database Connection Error");
    }
  }
);

app.get("/", function (req, res) {
  res.send(
    "Congratulations! Your Apollo Server is Running on api.deepy.site/graphql"
  );
});

/******** Middleware ********/

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  expressJwt({
    secret: "SUPER-SECRET",
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

/// winston logger ///
const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.prettyPrint()),
  transports: [new transports.Console({ level: "info" })],
});

// If we're not in production then log to the `console` with the format:

if (!["staging", "production", "test"].includes(process.env.NODE_ENV))
  logger.add(new transports.Console({ format: format.simple() }));

logger.error = (err) => {
  if (err instanceof Error)
    logger.log({ level: "error", message: `${err.stack || err}` });
  else logger.log({ level: "error", message: err, time: new Date() });
};

app.use((req, res, next) => {
  req.logger = logger;
  next();
});

// This is the port where the application runs
const port = 5000;

// Application output
app.listen(port, () => {
  logger.info(`Server is running on ${port}`);
});
