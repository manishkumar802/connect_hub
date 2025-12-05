import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";
 
dotenv.config();

const PORT = process.env.PORT || 8081;
const __dirname = path.resolve();

// Global error handlers
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

//middlewares
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(urlencoded({ extended: true, limit: '10mb' }));

const corsOptions = {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}
app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
    res.json({ 
        message: "Instagram Clone Backend API is running!",
        port: PORT,
        timestamp: new Date().toISOString()
    });
});

app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Server is healthy" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

const startServer = async () => {
    try {
        await connectDB();
        
        server.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`🌐 API URL: http://localhost:${PORT}`);
            console.log(`📱 Health check: http://localhost:${PORT}/health`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`❌ Port ${PORT} is already in use`);
                console.log('💡 Trying to kill the process and restart...');
                setTimeout(() => process.exit(1), 1000);
            } else {
                console.error('❌ Server error:', err);
            }
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        console.log('🔄 Retrying in 5 seconds...');
        setTimeout(() => startServer(), 5000);
    }
};

startServer();