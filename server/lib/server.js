const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
const app = express();

// Middleware
app.use(express.json());

// Enable CORS for client-side on all routes
// This is necessary because React is hosted on a different port.
// Don't do this in production. ;)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

// MongoDB Connection
const mongoUser = 'root';
const mongoPass = 'password'; // Obviously, handle this secret with care and not as plaintext
const MONGO_URI = `mongodb://${mongoUser}:${mongoPass}@localhost:27017/rbac?authSource=admin`;

mongoose.connect(MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(error => console.log(`Error connecting to MongoDB: ${error}`));

// Routes
app.use('/api', router);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
