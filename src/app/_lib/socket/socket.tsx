"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

const BASE_API_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const SOCKET_STANDARD = ENVIRONMENT === "production" ? "wss" : "ws";

// WebSocket Initialization (autoConnect: false to prevent immediate connection)
export const socket: Socket = io(`${SOCKET_STANDARD}://${BASE_API_URL}`, {
  autoConnect: false,
  transports: ["websocket"],
});

// ✅ Context Definition (Make sure it is declared BEFORE using it)
interface WebSocketContextType {
  socket: Socket;
  isConnected: boolean;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// ✅ Ensure the Provider Returns a ReactNode
export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let isMounted = true; // ✅ Prevents state updates on unmounted components

    const connectSocket = () => {
      if (socket.connected) {
        console.log("✅ WebSocket already connected.");
        if (isMounted) setIsConnected(true);
        return;
      }

      console.log("🌐 Connecting to WebSocket...");
      socket.connect();

      const onConnect = () => {
        console.log("✅ Connected to WebSocket server.");
        if (isMounted) setIsConnected(true);
      };

      const onError = (err: any) => {
        console.error("❌ WebSocket connection error:", err);
      };

      socket.once("connect", onConnect);
      socket.once("connect_error", onError);
    };

    connectSocket();

    return () => {
      isMounted = false; // ✅ Prevents unnecessary re-renders
      console.log("🔌 Disconnecting WebSocket...");
      socket.disconnect();
    };
  }, []);

  const joinRoom = (room: string) => {
    console.log(`📢 Joining room: ${room}`);
    socket.emit("join_room", { room });
  };

  const leaveRoom = (room: string) => {
    console.log(`📤 Leaving room: ${room}`);
    socket.emit("leave_room", { room });
  };

  return (
    <WebSocketContext.Provider value={{ socket, isConnected, joinRoom, leaveRoom }}>
      {children} {/* ✅ Ensures JSX is returned */}
    </WebSocketContext.Provider>
  );
};

// ✅ Custom Hook to Use WebSocket Context (Ensure Proper Export)
export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};