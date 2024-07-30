const axios = require("axios");
const { categories } = require("../config");

async function fetchNewsFromAPI(category = "", query = "") {
  let apiUrl = `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEWS_API_KEY}&language=en`
  if (query) apiUrl = apiUrl + `&search=${query}`
  if (category) apiUrl = apiUrl + `&categories=${category}`
  const response = await axios.get(apiUrl);
  if (category) {
    return { [category]: response.data.data }
  } else return response.data.data;
}

const fetchNewsFromAllSource = async () => {
  try {
    const allPromises = categories.map((category) =>
      fetchNewsFromAPI(category)
    );
    const newsResponse = await Promise.all(allPromises);
    return Object.assign({}, ...newsResponse);
  } catch (error) {
    console.log(error, "Failed to fetch news");
    throw new Error("Failed to fetch news");
  }
};

module.exports = { fetchNewsFromAllSource, fetchNewsFromAPI };
