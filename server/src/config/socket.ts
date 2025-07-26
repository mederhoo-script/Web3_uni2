import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { User } from '../types/index.js';

interface SocketUser extends User {
  socketId: string;
}

const connectedUsers = new Map<string, SocketUser>();

export const setupSocketIO = (io: Server) => {
  // Middleware for socket authentication
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      socket.userId = decoded.userId;
      socket.userRole = decoded.role;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`👤 User ${socket.userId} connected with socket ${socket.id}`);

    // Store connected user
    connectedUsers.set(socket.userId, {
      ...socket.user,
      socketId: socket.id,
    });

    // Join user-specific room
    socket.join(`user:${socket.userId}`);

    // Join cohort room if user has a cohort
    if (socket.userCohortId) {
      socket.join(`cohort:${socket.userCohortId}`);
    }

    // Handle joining chat rooms
    socket.on('join_chat_room', (roomId: string) => {
      socket.join(`chat:${roomId}`);
      socket.emit('joined_chat_room', roomId);
      console.log(`👤 User ${socket.userId} joined chat room ${roomId}`);
    });

    // Handle leaving chat rooms
    socket.on('leave_chat_room', (roomId: string) => {
      socket.leave(`chat:${roomId}`);
      socket.emit('left_chat_room', roomId);
      console.log(`👤 User ${socket.userId} left chat room ${roomId}`);
    });

    // Handle sending messages
    socket.on('send_message', (data: {
      chatRoomId: string;
      message: string;
      type: string;
    }) => {
      // Emit to all users in the chat room
      io.to(`chat:${data.chatRoomId}`).emit('new_message', {
        id: `temp_${Date.now()}`, // This should be replaced with actual DB ID
        chatRoomId: data.chatRoomId,
        senderId: socket.userId,
        message: data.message,
        type: data.type,
        createdAt: new Date(),
      });
    });

    // Handle typing indicators
    socket.on('typing_start', (chatRoomId: string) => {
      socket.to(`chat:${chatRoomId}`).emit('user_typing', {
        userId: socket.userId,
        chatRoomId,
      });
    });

    socket.on('typing_stop', (chatRoomId: string) => {
      socket.to(`chat:${chatRoomId}`).emit('user_stopped_typing', {
        userId: socket.userId,
        chatRoomId,
      });
    });

    // Handle user status updates
    socket.on('status_update', (status: 'online' | 'away' | 'busy') => {
      // Broadcast status to relevant rooms
      if (socket.userCohortId) {
        socket.to(`cohort:${socket.userCohortId}`).emit('user_status_changed', {
          userId: socket.userId,
          status,
        });
      }
    });

    // Handle notifications
    socket.on('mark_notification_read', (notificationId: string) => {
      // This would typically update the database
      socket.emit('notification_marked_read', notificationId);
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      console.log(`👤 User ${socket.userId} disconnected: ${reason}`);
      connectedUsers.delete(socket.userId);

      // Notify others in cohort about user going offline
      if (socket.userCohortId) {
        socket.to(`cohort:${socket.userCohortId}`).emit('user_status_changed', {
          userId: socket.userId,
          status: 'offline',
        });
      }
    });
  });

  return io;
};

// Helper functions for sending notifications
export const sendNotificationToUser = (io: Server, userId: string, notification: any) => {
  io.to(`user:${userId}`).emit('notification', notification);
};

export const sendNotificationToCohort = (io: Server, cohortId: string, notification: any) => {
  io.to(`cohort:${cohortId}`).emit('notification', notification);
};

export const getConnectedUsers = () => {
  return Array.from(connectedUsers.values());
};

export const isUserOnline = (userId: string): boolean => {
  return connectedUsers.has(userId);
};