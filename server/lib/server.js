const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');
const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
const MONGO_URI = 'mongodb://root:password@localhost:27017/rbac?authSource=admin';

mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(error => console.log(`Error connecting to MongoDB: ${error}`));

// Routes
app.use('/api', router);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
