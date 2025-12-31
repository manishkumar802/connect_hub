import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000,http://localhost:5173,https://connect-hub-0rwk.onrender.com').split(',');

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST']
    }
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId && userId !== 'undefined') {
        userSocketMap[userId] = socket.id;
        console.log(`✅ User ${userId} connected`);
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        if (userId && userId !== 'undefined') {
            delete userSocketMap[userId];
            console.log(`❌ User ${userId} disconnected`);
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { app, server, io };