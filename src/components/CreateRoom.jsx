import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import "../styles/CreateRoom.css";

const CreateRoom = ({ userName }) => {
  const [roomName, setRoomName] = useState("");
  const [theme, setTheme] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { createRoom } = useSocket();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roomName.trim() && theme.trim()) {
      setIsLoading(true);
      try {
        const roomId = await createRoom(
          userName,
          roomName.trim(),
          theme.trim()
        );
        navigate(`/room/${roomId}`);
      } catch (error) {
        console.error("Error creating room:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="create-room-container">
      <h1>Create a Voting Room</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomName">Room Name:</label>
          <input
            id="roomName"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="theme">Theme:</label>
          <input
            id="theme"
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="e.g. Movies, Books, Food ideas"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={isLoading}
          >
            Back
          </button>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Room"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;
