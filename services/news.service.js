const { checkNewsCache } = require("../helper/cacheUpdater");
const { fetchNewsFromAPI } = require("../helper/fetchNews");

class NewsServices {
  async getNewsByUserPreferences(preferences) {
    const response = await checkNewsCache();
    const arr = [];
    // console.log(response, "newsCache");
    preferences.map((category) => {
      arr.push(...response[`${category}`]);
    });
    // console.log(arr, "arr");
    return arr;
  }

  async getNewsByQuery(query) {
    const response = await fetchNewsFromAPI("", query);
    return response;
  }
}

const NewsService = new NewsServices();

module.exports = NewsService;
