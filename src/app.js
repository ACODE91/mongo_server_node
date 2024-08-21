const express = require('express');
const xss = require('xss-clean');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
require('dotenv').config();


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

module.exports = app;