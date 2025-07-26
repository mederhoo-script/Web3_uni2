import { io, Socket } from 'socket.io-client';
import { SocketEvents, ChatMessage, Notification } from '../types/index';

class SocketService {
  private socket: Socket | null = null;
  private token: string | null = null;

  connect(token: string): void {
    this.token = token;
    
    const serverUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    
    this.socket = io(serverUrl, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
    });

    // Connection events
    this.socket.on('connect', () => {
      console.log('✅ Connected to Socket.IO server');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Disconnected from Socket.IO server:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error:', error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Chat methods
  joinChatRoom(roomId: string): void {
    this.socket?.emit('join_chat_room', roomId);
  }

  leaveChatRoom(roomId: string): void {
    this.socket?.emit('leave_chat_room', roomId);
  }

  sendMessage(data: { chatRoomId: string; message: string; type: string }): void {
    this.socket?.emit('send_message', data);
  }

  startTyping(chatRoomId: string): void {
    this.socket?.emit('typing_start', chatRoomId);
  }

  stopTyping(chatRoomId: string): void {
    this.socket?.emit('typing_stop', chatRoomId);
  }

  updateStatus(status: 'online' | 'away' | 'busy'): void {
    this.socket?.emit('status_update', status);
  }

  // Event listeners
  onNewMessage(callback: (message: ChatMessage) => void): void {
    this.socket?.on('new_message', callback);
  }

  onUserTyping(callback: (data: { userId: string; chatRoomId: string }) => void): void {
    this.socket?.on('user_typing', callback);
  }

  onUserStoppedTyping(callback: (data: { userId: string; chatRoomId: string }) => void): void {
    this.socket?.on('user_stopped_typing', callback);
  }

  onUserStatusChanged(callback: (data: { userId: string; status: string }) => void): void {
    this.socket?.on('user_status_changed', callback);
  }

  onNotification(callback: (notification: Notification) => void): void {
    this.socket?.on('notification', callback);
  }

  onJoinedChatRoom(callback: (roomId: string) => void): void {
    this.socket?.on('joined_chat_room', callback);
  }

  onLeftChatRoom(callback: (roomId: string) => void): void {
    this.socket?.on('left_chat_room', callback);
  }

  // Remove event listeners
  off(event: string, callback?: (...args: any[]) => void): void {
    this.socket?.off(event, callback);
  }

  // Check connection status
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // Reconnect with new token
  reconnect(token: string): void {
    this.disconnect();
    this.connect(token);
  }
}

// Create singleton instance
export const socketService = new SocketService();

export default socketService;