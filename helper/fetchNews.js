const axios = require("axios");
const { categories } = require("../config");

async function fetchNewsFromAPI(category = "", query = "") {
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&q=${query}&apiKey=cc9e4c0e4ede48128c2916f209551a6d`;
  const response = await axios.get(url);
  console.log(response, "axios response");
  if (category) {
    return { [category]: response.data.articles };
  } else return response.data.articles;
}

const fetchNewsFromAllSource = async () => {
  try {
    const allPromises = categories.map((category) =>
      fetchNewsFromAPI(category)
    );
    const newsResponse = await Promise.all(allPromises);
    return Object.assign({}, ...newsResponse);
  } catch (error) {
    console.log("Failed to fetch news");
    throw new Error("Failed to fetch news");
  }
};

module.exports = { fetchNewsFromAllSource, fetchNewsFromAPI };
