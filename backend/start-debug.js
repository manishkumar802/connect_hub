// Debug startup script to identify issues
import dotenv from 'dotenv';

console.log('🔍 Starting debug checks...');

// Load environment variables
dotenv.config();

console.log('📋 Environment Variables Check:');
console.log('PORT:', process.env.PORT || 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set ✅' : 'Not set ❌');
console.log('SECRET_KEY:', process.env.SECRET_KEY ? 'Set ✅' : 'Not set ❌');
console.log('CLOUD_NAME:', process.env.CLOUD_NAME ? 'Set ✅' : 'Not set ❌');
console.log('API_KEY:', process.env.API_KEY ? 'Set ✅' : 'Not set ❌');
console.log('API_SECRET:', process.env.API_SECRET ? 'Set ✅' : 'Not set ❌');

console.log('\n🔧 Testing imports...');

try {
    console.log('Testing express import...');
    const express = await import('express');
    console.log('✅ Express imported successfully');
    
    console.log('Testing mongoose import...');
    const mongoose = await import('mongoose');
    console.log('✅ Mongoose imported successfully');
    
    console.log('Testing socket.io import...');
    const socketio = await import('socket.io');
    console.log('✅ Socket.io imported successfully');
    
    console.log('Testing cloudinary import...');
    const cloudinary = await import('./utils/cloudinary.js');
    console.log('✅ Cloudinary imported successfully');
    
    console.log('Testing database connection...');
    const connectDB = await import('./utils/db.js');
    console.log('✅ Database module imported successfully');
    
    console.log('\n🎉 All imports successful! Starting main server...');
    
    // Import and start main server
    await import('./index.js');
    
} catch (error) {
    console.error('❌ Import/startup error:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
}