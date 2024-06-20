const express = require('express');
const router = express.Router();
const intercomClient = require('../config/intercomConfig');

router.post('/send', async (req, res) => {
  const { message, userId } = req.body;

  try {
    const response = await intercomClient.messages.create({
      message_type: 'inapp',
      body: message,
      from: {
        type: 'admin',
        id: process.env.INTERCOM_ADMIN_ID // Ensure this ID is correct and set in .env
      },
      to: {
        type: 'user',
        user_id: userId
      }
    });

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
