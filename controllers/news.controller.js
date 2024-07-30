const NewsService = require("../services/news.service");
const AuthUserService = require("../services/user.services");
const { NotFoundError } = require("../utils/custom-error");
const errorCodes = require("../utils/error-codes");
const asyncHandler = require("express-async-handler");

const getAllNews = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = AuthUserService.findUserById(id);
  if (!user) {
    throw new NotFoundError({
      code: errorCodes.USER_NOT_FOUND,
      message: "User not found",
    });
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
    throw new NotFoundError({
      code: errorCodes.USER_NOT_FOUND,
      message: "User not found",
    });
  }
  const response = await NewsService.getNewsByQuery(query);
  res.status(200).json(response);
});

const markNewsAsRead = (req, res) => {
  const { id } = req.user;
  const { newsId } = req.params;
  const user = AuthUserService.findUserById(id);
  if (!user) {
    throw new NotFoundError({
      code: errorCodes.USER_NOT_FOUND,
      message: "User not found",
    });
  }
  NewsService.markNewsArticleAsRead(user, newsId);
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    preferences: user.preferences,
    readArticles: user.readArticles,
    favouriteArticles: user.favouriteArticles,
    createdAt: user.createdAt,
  });
};

const markNewsAsFavourite = (req, res) => {
  const { id } = req.user;
  const { newsId } = req.params;
  const user = AuthUserService.findUserById(id);
  if (!user) {
    throw new NotFoundError({
      code: errorCodes.USER_NOT_FOUND,
      message: "User not found",
    });
  }
  NewsService.markNewsArticleAsFavourite(user, newsId);
  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    preferences: user.preferences,
    readArticles: user.readArticles,
    favouriteArticles: user.favouriteArticles,
    createdAt: user.createdAt,
  });
};

const getReadArticles = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = AuthUserService.findUserById(id);
  if (!user) {
    throw new NotFoundError({
      code: errorCodes.USER_NOT_FOUND,
      message: "User not found",
    });
  }
  const articles = await NewsService.getArticlesListByIds(user.readArticles);
  res.status(200).json(articles)
});

const getFavouriteArticles = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = AuthUserService.findUserById(id);
  if (!user) {
    throw new NotFoundError({
      code: errorCodes.USER_NOT_FOUND,
      message: "User not found",
    });
  }
  const articles = await NewsService.getArticlesListByIds(user.favouriteArticles);
  res.status(200).json(articles)
});

module.exports = {
  getAllNews,
  getSearchedNews,
  markNewsAsRead,
  markNewsAsFavourite,
  getReadArticles,
  getFavouriteArticles
};
