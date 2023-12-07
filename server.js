const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorMiddleware = require('./middleware/errorMiddleware.js');
require('dotenv').config();

const FRONTEND = process.env.FRONTEND;
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 1000;

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware setup
app.use(express.json());
app.use('/api/products', require('./routes/productRoutes.js'));

app.get('/', (req, res) => {
  throw new Error('FAKE ERROR');
});

// Error middleware should be placed after other middlewares and routes
app.use(errorMiddleware);

// MongoDB setup
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log('Connected to MongoDB server');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
