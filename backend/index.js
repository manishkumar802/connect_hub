import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 8081;

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000,http://localhost:5173,https://connect-hub-0rwk.onrender.com').split(',');

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow non-browser requests
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('CORS policy: Origin not allowed'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Routes
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

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error',
        success: false
    });
});

const startServer = async () => {
    try {
        await connectDB();
        
        server.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
            console.log(`🌐 API URL: http://localhost:${PORT}`);
            console.log(`📱 Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();