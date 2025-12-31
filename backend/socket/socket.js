import { Server } from "socket.io";
import express from "express";
import http from "http";

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

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId && userId !== 'undefined') {
        userSocketMap[userId] = socket.id;
        console.log(`✅ User ${userId} connected with socket ${socket.id}`);
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    }

    socket.on('disconnect', (reason) => {
        if (userId && userId !== 'undefined') {
            delete userSocketMap[userId];
            console.log(`❌ User ${userId} disconnected - Reason: ${reason}`);
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        }
    });

    socket.on('error', (error) => {
        console.log(`🔴 Socket error for user ${userId}:`, error);
    });
});

export { app, server, io };