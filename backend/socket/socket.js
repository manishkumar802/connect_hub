import {Server} from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: process.env.URL || "http://localhost:3000",
        methods:['GET','POST']
    }
})

const userSocketMap = {} ; // this map stores socket id corresponding the user id; userId -> socketId

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on('connection', (socket)=>{
    try {
        const userId = socket.handshake.query.userId;
        if(userId && userId !== 'undefined' && userId !== 'null'){
            userSocketMap[userId] = socket.id;
            console.log(`✅ User ${userId} connected with socket ${socket.id}`);
            console.log(`📊 Online users:`, Object.keys(userSocketMap));
        }

        io.emit('getOnlineUsers', Object.keys(userSocketMap));

        socket.on('disconnect',()=>{
            try {
                if(userId && userId !== 'undefined' && userId !== 'null'){
                    delete userSocketMap[userId];
                    console.log(`❌ User ${userId} disconnected`);
                    console.log(`📊 Online users:`, Object.keys(userSocketMap));
                }
                io.emit('getOnlineUsers', Object.keys(userSocketMap));
            } catch (error) {
                console.error('Error handling disconnect:', error);
            }
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    } catch (error) {
        console.error('Error handling connection:', error);
    }
})

export {app, server, io};