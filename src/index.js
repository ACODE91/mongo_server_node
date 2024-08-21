const app = require('./app');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

let server;

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


server = app.listen(process.env.LOCAL_PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.LOCAL_PORT}`);
    connectToMongoDBServer();
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
  const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  };
  
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  
  process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });