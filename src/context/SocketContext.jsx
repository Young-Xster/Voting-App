import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

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
    const socketInstance = io("http://localhost:8090");

    socketInstance.on("connect", () => {
      console.log("Connected to server");
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from server");
      setConnected(false);
    });

    socketInstance.on("state", (state) => {
      console.log("Received state:", state);
      setRoomState(state);
    });

    socketInstance.on("error", (error) => {
      console.error("Socket error:", error);
      alert(error.message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const createRoom = (userName, roomName, theme) => {
    socket?.emit("createRoom", { username: userName, roomName, theme });

    return new Promise((resolve) => {
      socket?.once("roomCreated", ({ roomId }) => {
        resolve(roomId);
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
