const NewsService = require("../services/news.service");
const AuthUserService = require("../services/user.services");
const { NotFoundError } = require("../utils/custom-error");
const errorCodes = require("../utils/error-codes");
const asyncHandler = require("express-async-handler");

const getAllNews = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = AuthUserService.findUserById(id);
  if (!user) {
    next(
      new NotFoundError({
        code: errorCodes.USER_NOT_FOUND,
        message: "User not found",
      })
    );
  }
  const preferences = user.preferences;
  const getNews = await NewsService.getNewsByUserPreferences(preferences);
  res.status(200).json(getNews);
});

const getSearchedNews = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { query } = req.params;
  const user = AuthUserService.findUserById(id);
  if (!user) {
    next(
      new NotFoundError({
        code: errorCodes.USER_NOT_FOUND,
        message: "User not found",
      })
    );
  }
  const response = await NewsService.getNewsByQuery(query);
  res.status(200).json(response);
});

module.exports = { getAllNews, getSearchedNews };
