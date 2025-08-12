import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// Sample product data
const products = [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    { id: 3, name: 'Product 3', price: 39.99 },
];

// Middleware
app.use(express.json());

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/order', (req, res) => {
    const order = req.body;  // Process order here
    res.status(201).json({ message: 'Order received', order });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});