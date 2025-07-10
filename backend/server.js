 import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

// Middleware to verify JWT and project ID
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        const projectId = socket.handshake.query.projectId;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid projectId'));
        }

        socket.project = await projectModel.findById(projectId);

        if (!token) {
            return next(new Error('Authentication error'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new Error('Authentication error'));
        }

        socket.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
});

io.on('connection', socket => {
    socket.roomId = socket.project._id.toString();
    console.log('✅ User connected to room:', socket.roomId);

    socket.join(socket.roomId);

    socket.on('project-message', data => {
        const message = data.message;

        // // 🔒 Safety check to avoid crash
        // if (typeof message !== 'string') {
        //     console.warn('⚠️ Invalid message type:', message);
        //     return;
        // }

        // Just broadcast the message to others in the same room
        socket.broadcast.to(socket.roomId).emit('project-message', data);
    });

    socket.on('disconnect', () => {
        console.log('🚪 User disconnected');
        socket.leave(socket.roomId);
    });
});

server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
