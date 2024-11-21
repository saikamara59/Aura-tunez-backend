const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const artistRoutes = require('./routes/artistRoutes');
const songRoutes = require('./routes/songRoutes');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(bodyParser.json()); 

// Routes
app.use('/artists', artistRoutes);
app.use('/songs', songRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });