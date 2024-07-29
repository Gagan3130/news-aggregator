const express = require("express");
const { authorizeUser } = require("../middleware/user.middleware");
const {
  getAllNews,
  getSearchedNews,
} = require("../controllers/news.controller");
const { NewsQueryValidator } = require("../validators/news.validator");
const {
  validateRequestSchema,
} = require("../validators/ValidateRequestSchema");

const router = express.Router();

router.route("/").get(authorizeUser, getAllNews);
router
  .route("/search/:query")
  .get(
    authorizeUser,
    NewsQueryValidator,
    validateRequestSchema,
    getSearchedNews
  );

module.exports = router;
