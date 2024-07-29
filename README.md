Brief This project involves building a RESTful API for a simple news aggragator application with user authentication using Node.js, Express.js, and NPM packages.

Project Description: The API enables users to retrieve news based on user preferences and caches the API results, revalidate the cache and update the cache periodically. The project includes setting up a basic Node.js environment with Express.js and other necessary NPM packages. The API supports input validation, error handling, and is tested using Postman or Curl.

API Endpoints ->

POST /api/users/signup: Create a user with name, email, password, and preferences.

POST /api/users/login: Authenticate a user and return jwt token

GET /api/users/preference: Retrieve user preferences after authorising the user

PUT /api/users/preference:  Update the user preferences after authorising the user

GET /api/news: Retrieve all news from external news API based on user prefernce.

GET /api/news/serach/:query: Retrive the news based on query keyword


External News Api: https://newsapi.org/v2/top-headlines

Features

1. In-memory data store (e.g., an array) to store users.
2. Proper error handling for invalid requests(made custom error classes -> /utils/custom-error.js)
3. Used express-validator package for Input validation.
4. used uuid packge for generating unique userId.
5. In-memory cache
6. Scheduling a cron job for updating the cache in the background using node-cron library.
7. JWT token based authorisation
8. express-async-handler for passing down the error thrown in async code to error handling middleware

Project Setup ->

Prerequisites ->

Node.js
NPM Installation Clone the repository: bash Copy code git clone https://github.com/Gagan3130/news-aggregator.git Navigate to the project directory: bash Copy code cd task-manager-api Install the dependencies: npm install
Start the server: npm start

The API will be available at http://localhost:8080.