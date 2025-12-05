import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({ message: 'Test server is working!' });
});

app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
});