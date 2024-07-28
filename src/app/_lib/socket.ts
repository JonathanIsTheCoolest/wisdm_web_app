'use client'

import { io, Socket } from "socket.io-client";
import { getCookie } from "./actions";

const BASE_API_URL = '127.0.0.1:5000'

export const socket: Socket = io(
  `ws://${BASE_API_URL}` || '', 
  {
    autoConnect: false, 
    transports: ['websocket']
  }
)

export const handleSocketConnection = async () => {
  try {
    const authCookie = await getCookie('auth');

    socket.auth = {token: authCookie}
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected:', reason);
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err);
    });

    console.log(`Socket is connected: ${socket.connected}`)

    return () => {
      socket.disconnect();
    };
  } catch (error) {
    console.error('Socket initialization error:', error);
  }
};

export const handleRoomConnection = (room: string) => {
  console.log(`Joining room: ${room}`)
  socket.emit('join_room', { room })

  return () => {
      socket.emit('leave_room', { room })
  };
}

export const handleSocketCleanup = (cb: () => any) => {
  let cleanup: (() => void) | undefined;

  const initialize = async () => {
    cleanup = await cb();
  };

  initialize();

  return () => {
    if (cleanup) cleanup();
  };
};