import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Product } from './models/Product.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Sample product data fallback
const fallbackProducts = [
  { id: 1, name: 'Product 1', price: 19.99 },
  { id: 2, name: 'Product 2', price: 29.99 },
  { id: 3, name: 'Product 3', price: 39.99 },
];

// Middleware
app.use(express.json());

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.get('/api/products', async (req, res) => {
  try {
    if (MONGODB_URI && mongoose.connection.readyState === 1) {
      const products = await Product.find({}).lean();
      return res.json(products);
    }
    return res.json(fallbackProducts);
  } catch (err) {
    console.error('GET /api/products error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/order', (req, res) => {
  const order = req.body; // Process order here
  res.status(201).json({ message: 'Order received', order });
});

async function start() {
  try {
    if (MONGODB_URI) {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('Connected to MongoDB');
    } else {
      console.log('MONGODB_URI not set, using in-memory products');
    }
  } catch (err) {
    console.error('MongoDB connection failed, using in-memory products. Error:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();