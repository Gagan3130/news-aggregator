const express = require("express");
const { authorizeUser } = require("../middleware/user.middleware");
const {
  getAllNews,
  getSearchedNews,
  markNewsAsRead,
  markNewsAsFavourite,
  getReadArticles,
  getFavouriteArticles,
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
router.route('/:newsId/read').post(authorizeUser,markNewsAsRead) 
router.route('/:newsId/favourite').post(authorizeUser,markNewsAsFavourite)
router.route('/read').get(authorizeUser, getReadArticles)
router.route('/favourites').get(authorizeUser, getFavouriteArticles)    

module.exports = router;
