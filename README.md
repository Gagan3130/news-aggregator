Brief This project involves building a RESTful API for a simple news aggragator application with user authentication using Node.js, Express.js, and NPM packages.

Project Description: **The API enables users to retrieve news based on user preferences and caches the API results, revalidate the cache and update the cache periodically**. The project includes setting up a basic Node.js environment with Express.js and other necessary NPM packages. The API supports input validation, error handling, and is tested using Postman or Curl.

API Endpoints ->

POST /api/users/signup: Create a user with name, email, password, and preferences.

POST /api/users/login: Authenticate a user and return jwt token

GET /api/users/preference: Retrieve user preferences after authorising the user

PUT /api/users/preference:  Update the user preferences after authorising the user

GET /api/news: Retrieve all news from external news API based on user prefernce.

GET /api/news/serach/:query: Retrive the news based on query keyword

POST /api/news/:newsId/read: Mark news as read;

POST /api/news/:newsId/favourite: Mark news as favourite;

GET /api/news/read: Get all read articles

GET /api/news/favourites: Get all favourites articles



External News Api: https://api.thenewsapi.com

**Features**

1. In-memory data store (e.g., an array) to store users.
2. Proper error handling for invalid requests(made custom error classes -> /utils/custom-error.js)
3. Used express-validator package for Input validation.
4. used uuid packge for generating unique userId.
5. In-memory cache
6. Scheduling a cron job for updating the cache in the background using node-cron library.
7. JWT token based authorisation
8. express-async-handler for passing down the error thrown in async code to error handling middleware

Project Setup ->

**Prerequisites ->**

1. Install Node.js
2. NPM Installation Clone the repository: bash Copy code git clone https://github.com/Gagan3130/news-aggregator.git Navigate to the project directory: bash Copy code cd news-aggregator.
3. Install the dependencies: npm install
4. Create .env file and add JWT_SECRET_KEY=your_jwt_secret and NEWS_API_KEY=your_news_api_key

Start the server: npm start

The API will be available at http://localhost:8080.
