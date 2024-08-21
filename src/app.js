const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// Database Reference Objects
const databasesObj = {
  users: process.env.MONGO_USERS_DB }

// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_LOCAL);

async function connectToMongoDBServer() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    const db = client.db(databasesObj.users);
  } catch (err) {
    console.error(err);
  }
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.LOCAL_PORT}`);
  connectToMongoDBServer();
});