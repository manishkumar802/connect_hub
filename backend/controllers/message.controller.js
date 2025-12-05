import { getReceiverSocketId, io } from "../socket/socket.js";
import {Message} from "../models/message.model.js"
// for chatting
export const sendMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {textMessage:message} = req.body;
        
        if (!message || !message.trim()) {
            return res.status(400).json({
                message: 'Message content is required',
                success: false
            });
        }
        
        if (!receiverId) {
            return res.status(400).json({
                message: 'Receiver ID is required',
                success: false
            });
        }
      
        const newMessage = await Message.create({
            message: message,
            senderId: senderId,
            receiverId: receiverId
        });

        await newMessage.populate([
            { path: 'senderId', select: 'username profilePicture' },
            { path: 'receiverId', select: 'username profilePicture' }
        ]);

        console.log(`📨 Message from ${senderId} to ${receiverId}:`, message);

        // implement socket io for real time data transfer
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            console.log(`✅ Sending to receiver socket: ${receiverSocketId}`);
            io.to(receiverSocketId).emit('newMessage', newMessage);
            
            // Send notification
            io.to(receiverSocketId).emit('notification', {
                type: 'message',
                userId: senderId,
                userDetails: newMessage.senderId,
                message: `${newMessage.senderId.username} sent you a message`
            });
        } else {
            console.log(`⚠️ Receiver ${receiverId} is offline`);
        }

        return res.status(201).json({
            success:true,
            newMessage
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const getMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        
        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).populate([
            { path: 'senderId', select: 'username profilePicture' },
            { path: 'receiverId', select: 'username profilePicture' }
        ]).sort({ createdAt: 1 });

        return res.status(200).json({success:true, messages});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}