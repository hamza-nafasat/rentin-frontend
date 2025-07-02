// utils/socket.js
import { io } from 'socket.io-client';

const SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL;

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SERVER_URL, {
        credentials: true,
        transports: ['websocket', 'polling'],
      });

      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket.id);
        this.isConnected = true;
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
        this.isConnected = false;
      });

      this.socket.on('connect_error', error => {
        console.error('Socket connection error:', error);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  joinRoom(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinRoom', roomId);
    }
  }

  leaveRoom(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leaveRoom', roomId);
    }
  }

  sendMessage(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit('sendMessage', data);
    }
  }

  onReceiveMessage(callback) {
    if (this.socket) {
      this.socket.on('receiveMessage', callback);
    }
  }

  offReceiveMessage() {
    if (this.socket) {
      this.socket.off('receiveMessage');
    }
  }

  getSocket() {
    return this.socket;
  }
}

const socketService = new SocketService();
export default socketService;
