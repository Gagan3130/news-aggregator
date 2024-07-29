const users = [];

const newsCache = {
  data: null,
  timestamp: 0,
  ttl: 600 * 1000, // Cache TTL in milliseconds (10 minutes)
};

module.exports = { users, newsCache };
