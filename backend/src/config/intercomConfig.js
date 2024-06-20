// src/config/intercomConfig.js
const { Client } = require('intercom-client');
require('dotenv').config();

const accessToken = process.env.INTERCOM_ACCESS_TOKEN;

// Check if the token is being set correctly
if (!accessToken) {
  console.error('INTERCOM_ACCESS_TOKEN is not defined');
  throw new Error('Intercom access token is not defined');
}

console.log('Initializing Intercom Client with token:', accessToken);

const intercomClient = new Client({ token: accessToken });

module.exports = intercomClient;
