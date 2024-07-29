const express = require("express");
const cron = require("node-cron");
const userRoute = require("./routes/user.routes");
const newsRoute = require("./routes/news.routes");
const dotenv = require("dotenv");
const {
  ValidationError,
  UnAuthorisedError,
  NotFoundError,
} = require("./utils/custom-error");
const errorCodes = require("./utils/error-codes");
const { cacheUpdater } = require("./helper/cacheUpdater");
const app = express();
const port = 8080;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cron.schedule("*/60 * * * *", cacheUpdater);

app.use("/api/users", userRoute);
app.use("/api/news", newsRoute);

app.use((err, req, res, next) => {
  console.log(err, "error", err.stack);
  if (err instanceof ValidationError) {
    res.status(400).json({ error: err.message, code: err.code });
  } else if (err instanceof UnAuthorisedError) {
    res.status(401).json({ error: err.message, code: err.code });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message, code: err.code });
  } else {
    res.status(500).json({
      error: "Internal Server Error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
});
app.use("*", function (req, res) {
  res
    .status(404)
    .json({ error: "Route does not Exist", code: errorCodes.ROUTE_NOT_FOUND });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
