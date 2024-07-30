const { checkNewsCache } = require("../helper/cacheUpdater");
const { fetchNewsFromAPI } = require("../helper/fetchNews");

class NewsServices {
  async getNewsByUserPreferences(preferences) {
    const response = await checkNewsCache();
    // console.log(response,"service response")
    const arr = [];
    preferences.map((category) => {
      arr.push(...response[`${category}`]);
    });
    return arr;
  }

  async getNewsByQuery(query) {
    const response = await fetchNewsFromAPI("", query);
    return response;
  }

  markNewsArticleAsRead(user, newsId) {
    if (!user.readArticles.includes(newsId)) user.readArticles.push(newsId);
    return;
  }
  markNewsArticleAsFavourite(user, newsId) {
    if (!user.favouriteArticles.includes(newsId))
      user.favouriteArticles.push(newsId);
    return;
  }

  async getArticlesListByIds(articlesIdList) {
    const response = await checkNewsCache();
    const readArticles = Object.values(response)
      .flat()
      .filter((article) => articlesIdList.includes(article.uuid));
    //article_id
    return readArticles;
  }
}

const NewsService = new NewsServices();

module.exports = NewsService;
