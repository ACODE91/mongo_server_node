const express = require('express');
const xss = require('xss-clean');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./routes/v1');
const MongoDB = require('./database/mongodb');
require('dotenv').config();


const mongo = new MongoDB(process.env.MONGO_LOCAL, process.env.MONGO_USERS_DB);
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongo.connect()
  .then(() => {
    app.use((req, res, next) => {
      req.mongo = mongo;
      next();
    });

    // v1 api routes
app.use('/v1', routes);

    app.listen(process.env.LOCAL_PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.LOCAL_PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
