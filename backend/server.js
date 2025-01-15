const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');

// Routes
const authRoutes = require("./routes/authRoutes");
const exhibitionsRoutes = require('./routes/exhibitions');
const linksRoutes = require('./routes/links');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes); // Authentication routes
app.use('/api/exhibitions', exhibitionsRoutes); // Exhibitions routes
app.use('/api/links', linksRoutes); // Links routes

// Default route for invalid endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

// Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
