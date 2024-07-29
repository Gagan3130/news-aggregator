const { newsCache } = require("../data");
const { fetchNewsFromAllSource } = require("./fetchNews");

const cacheUpdater = async () => {
  try {
    const res = await fetchNewsFromAllSource();
    // console.log(res, "cron job response");
    // Update the cache
    newsCache.data = res;
    newsCache.timestamp = Date.now();
    console.log("Cache updated via cron job");
    return newsCache.data;
  } catch (error) {
    console.log("cache updater failed");
    throw new Error("failed to fetch news", error);
  }
};

const checkNewsCache = async () => {
  const now = Date.now();
  if (newsCache.data && now - newsCache.timestamp < newsCache.ttl) {
    console.log(newsCache.data);
    return newsCache.data;
  } else {
    const res = await cacheUpdater();
    return res;
  }
};

module.exports = { cacheUpdater, checkNewsCache };
