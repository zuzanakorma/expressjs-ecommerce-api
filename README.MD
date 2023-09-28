# Ecommerce API

![API](<API_docs.jpeg>)


## Technologies

This project is API build with:

- NodeJS
- ExpressJS
- MongoDB


#### Create Database in Atlas
- [MongoDB](https://www.mongodb.com/cloud/atlas/register) = You can create an account (free) and get your online database.
- get your connection string for DB


#### Setup

- install dependencies

```sh
npm install
```

- create .env and provide correct values

.env

```js
MONGO_URI=
JWT_SECRET=
JWT_LIFETIME=
```
- Add your connection string from Atlas into your application code as MONGO_URI
- JWT_SECRET=any text or number you want to add here to create jwt Token
- JWT_LIFETIME=you have to specify time limit (example: JWT_LIFETIME=1d for one day)
- start the project


```sh
npm start
```

- you should see "Server is listening on port 5000..." text

In this project I've created fake strip connection


#### To Create Docs

- [Docgen Library] (https://github.com/thedevsaddam/docgen)
- install docgen on your machine
- Export Postman Collection
- docgen build -i docs.json -o index.html
- create index.html in public

#### Security Packages

- express-rate-limiter
- helmet
- xss-clean
- express-mongo-sanitize
- cors (cookies!!!!)