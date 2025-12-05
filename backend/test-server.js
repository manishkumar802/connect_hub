// Simple test server to check if basic setup works
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.get('/', (req, res) => {
    res.json({ 
        message: 'Test server is working!',
        env: {
            PORT: process.env.PORT,
            NODE_ENV: process.env.NODE_ENV,
            MONGO_URI: process.env.MONGO_URI ? 'Set' : 'Not set',
            SECRET_KEY: process.env.SECRET_KEY ? 'Set' : 'Not set'
        }
    });
});

app.listen(PORT, () => {
    console.log(`✅ Test server running on port ${PORT}`);
    console.log(`🌐 Visit: http://localhost:${PORT}`);
});