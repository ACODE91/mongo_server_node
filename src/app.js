const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config();

const url = process.env.MONGO_LOCAL;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});