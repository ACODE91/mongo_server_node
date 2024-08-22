const express = require('express');
const { registerUser } = require('../../services/registration.service');  
const router = express.Router();

router.post('/register', (req, res) => {
  const collection = req.mongo.db.collection(process.env.MONGO_USERS_DB);
  registerUser(collection, req.body);
  res.end('Working');
});

module.exports = router;