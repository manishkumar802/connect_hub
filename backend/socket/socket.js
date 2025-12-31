import { Server } from "socket.io";
import express from "express";
import http from "http";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://connecthub-socialmedia.netlify.app',
    'https://connect-hub-0rwk.onrender.com'
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true
    },
    transports: ['websocket', 'polling'],
    pingTimeout: 60000,
    pingInterval: 25000
});

// Basic in-memory map: { userId: socketId }
const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

// Authenticate socket connections using JWT in either auth token (preferred) or query token
io.use((socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.query?.token || (socket.handshake.headers && (socket.handshake.headers.authorization || socket.handshake.headers.Authorization))?.replace?.('Bearer ', '');
        if (!token) return next(new Error('Authentication error: token missing'));
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) return next(new Error('Authentication error: invalid token'));
        socket.userId = decoded.userId;
        return next();
    } catch (err) {
        return next(new Error('Authentication error'));
    }
});

io.on('connection', (socket) => {
    const userId = socket.userId || socket.handshake.query.userId;
    if (userId && userId !== 'undefined') {
        userSocketMap[userId] = socket.id;
        console.log(`✅ User ${userId} connected with socket ${socket.id} (transport=${socket.conn.transport.name})`);
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    } else {
        console.log(`⚠️ Socket connected without userId: ${socket.id}`);
    }

    socket.on('disconnect', (reason) => {
        if (userId && userId !== 'undefined') {
            delete userSocketMap[userId];
            console.log(`❌ User ${userId} disconnected - Reason: ${reason} (transport=${socket.conn?.transport?.name})`);
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        } else {
            console.log(`❌ Unidentified socket ${socket.id} disconnected - Reason: ${reason}`);
        }
    });

    socket.on('error', (error) => {
        console.log(`🔴 Socket error for user ${userId || 'unknown'}:`, error);
    });
});

export { app, server, io };