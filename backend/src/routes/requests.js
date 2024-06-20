const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Ensure the model is registered before using it
const Request = mongoose.model('Request');
const User = mongoose.model('User');

router.post('/', async (req, res) => {
  const { category, comments } = req.body;
  const userId = req.user._id;

  const newRequest = new Request({
    userId,
    category,
    comments,
  });

  try {
    await newRequest.save();
    res.status(201).send(newRequest);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().populate('userId', 'email');
    res.send(requests);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
