// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Load models
require('./models/User');
require('./models/Request');

// OAuth configuration
require('./config/oauthConfig');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
}));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Import routes after models are loaded
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');
const intercomRoutes = require('./routes/intercom');

app.use('/auth', authRoutes);
app.use('/requests', requestRoutes);
app.use('/intercom', intercomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
