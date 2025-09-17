import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import "../styles/JoinRoom.css";

const JoinRoom = ({ userName }) => {
  const [roomId, setRoomId] = useState("");
  const { joinRoom } = useSocket();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
      joinRoom(userName, roomId.trim());
      navigate(`/room/${roomId.trim()}`);
    }
  };

  return (
    <div className="join-room-container">
      <h1>Join a Voting Room</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomId">Room Code:</label>
          <input
            type="text"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room code"
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate("/")}>
            Back
          </button>
          <button type="submit">Join Room</button>
        </div>
      </form>
    </div>
  );
};

export default JoinRoom;
