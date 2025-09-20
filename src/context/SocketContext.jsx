import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import config from "../config/environment.js";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [roomState, setRoomState] = useState(null);

  useEffect(() => {
    const socketInstance = io(config.SERVER_URL);

    socketInstance.on("connect", () => {
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setConnected(false);
    });

    socketInstance.on("state", (state) => {
      setRoomState(state);
    });

    socketInstance.on("error", (error) => {
      console.error("Socket error:", error);
      alert(error.message);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const createRoom = (userName, roomName, theme) => {
    if (!socket || !connected) {
      return Promise.reject(new Error("Not connected to server"));
    }

    socket.emit("createRoom", { username: userName, roomName, theme });

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Room creation timed out"));
      }, 10000); // 10 second timeout

      socket.once("roomCreated", ({ roomId }) => {
        clearTimeout(timeout);
        resolve(roomId);
      });

      socket.once("error", (error) => {
        clearTimeout(timeout);
        reject(new Error(error.message || "Failed to create room"));
      });
    });
  };

  const joinRoom = (userName, roomId) => {
    socket?.emit("joinRoom", { username: userName, roomId });
  };
  const addEntry = (userName, entry) => {
    socket?.emit("addEntry", { username: userName, entry });
  };
  const startVoting = () => {
    socket?.emit("startVoting");
  };

  const vote = (entry) => {
    socket?.emit("vote", { entry });
  };

  const next = () => {
    socket?.emit("next");
  };
  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
        roomState,
        createRoom,
        joinRoom,
        addEntry,
        startVoting,
        vote,
        next,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
