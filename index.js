const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Basic health check route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Import and use routers
const customerRouter = require('./routes/customer');
app.use('/api/customers', customerRouter);

// Add more routes for other entities
// Example: app.use('/api/manufacturers', require('./routes/manufacturer'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});