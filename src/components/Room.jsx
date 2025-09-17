import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import "../styles/Room.css";

const Room = ({ userName }) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { roomState, addEntry, startVoting, vote, next, joinRoom } =
    useSocket();
  const [newEntry, setNewEntry] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  // Debug logging
  console.log("Room component - roomId:", roomId);
  console.log("Room component - userName:", userName);
  console.log("Room component - roomState:", roomState);

  useEffect(() => {
    // Auto-join the room when component mounts
    if (roomId && userName && !hasJoined) {
      joinRoom(userName, roomId);
      setHasJoined(true);
    }
  }, [roomId, userName, joinRoom, hasJoined]);

  useEffect(() => {
    if (!roomState) {
      return;
    }

    // If room doesn't exist, go back to home
    if (roomState.error || !roomState.id) {
      alert("Room not found or has been closed");
      navigate("/");
    }
  }, [roomState, navigate]);

  const handleSubmitEntry = (e) => {
    e.preventDefault();
    if (newEntry.trim()) {
      addEntry(userName, newEntry.trim());
      setNewEntry("");
    }
  };

  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVote = (entry) => {
    vote(entry);
  };

  const handleNext = () => {
    next();
  };

  const handleStartVoting = () => {
    startVoting();
  };

  const isCreator = roomState?.creator === userName;

  if (!roomState) {
    return <div className="loading">Loading room data...</div>;
  }

  if (!roomState.id) {
    return <div className="loading">Room not found...</div>;
  }

  return (
    <div className="room-container">
      <div className="room-header">
        <h1>{roomState.name || "Voting Room"}</h1>
        <div className="room-code">
          Room Code: <span>{roomId}</span>
          <button className="copy-button" onClick={copyRoomCodeToClipboard}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <p className="room-theme">Theme: {roomState.theme}</p>
      </div>

      <div className="room-content">
        {roomState.phase === "collecting" && (
          <div className="collection-phase">
            <h2>Submit Your Entry</h2>

            {/* Check if user has already submitted */}
            {roomState.entries?.some((entry) => entry.author === userName) ? (
              <div className="already-submitted">
                <p>✅ You have already submitted your entry!</p>
                <p>Waiting for other participants...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEntry}>
                <input
                  type="text"
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                  placeholder={`Your ${roomState.theme} idea...`}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            )}

            <div className="entries-list">
              <h3>Current Entries ({roomState.entries?.length || 0})</h3>
              <ul>
                {roomState.entries?.map((entry, index) => (
                  <li key={index}>
                    <span className="entry-content">{entry.content}</span>
                    <span className="entry-author">by {entry.author}</span>
                  </li>
                ))}
              </ul>

              {isCreator && roomState.entries?.length >= 2 && (
                <button
                  className="start-voting-button"
                  onClick={handleStartVoting}
                >
                  Start Voting
                </button>
              )}
            </div>
          </div>
        )}

        {roomState.phase === "voting" && roomState.vote && (
          <div className="voting-phase">
            <h2>Vote for your favorite</h2>

            {/* Check if current user has already voted */}
            {roomState.vote.voters && roomState.vote.voters[userName] ? (
              <div className="already-voted">
                <p>✅ You have voted! Waiting for other participants...</p>
              </div>
            ) : (
              <div className="voting-pair">
                {roomState.vote.pair.map((entry, index) => (
                  <div key={index} className="voting-option">
                    <div className="entry-card">
                      <p>{entry.content}</p>
                      <span className="entry-author">by {entry.author}</span>
                    </div>
                    <button onClick={() => handleVote(entry.content)}>
                      Vote
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="voting-tally">
              <h3>Current Votes:</h3>
              <ul>
                {roomState.vote.pair.map((entry, index) => (
                  <li key={index}>
                    {entry.content}:{" "}
                    {roomState.vote.tally?.[entry.content] || 0} votes
                  </li>
                ))}
              </ul>

              {/* Show voting progress */}
              <div className="voting-progress">
                <p>
                  Votes: {Object.keys(roomState.vote.voters || {}).length} /{" "}
                  {Object.keys(roomState.participants || {}).length}
                </p>
              </div>
            </div>

            {isCreator && (
              <button
                className="next-button"
                onClick={handleNext}
                disabled={
                  Object.keys(roomState.vote.voters || {}).length <
                  Object.keys(roomState.participants || {}).length
                }
              >
                {Object.keys(roomState.vote.voters || {}).length <
                Object.keys(roomState.participants || {}).length
                  ? `Waiting for votes (${
                      Object.keys(roomState.vote.voters || {}).length
                    }/${Object.keys(roomState.participants || {}).length})`
                  : "Next Pair"}
              </button>
            )}
          </div>
        )}

        {roomState.phase === "completed" && (
          <div className="completed-phase">
            <h2>We have a winner! 🎉</h2>
            <div className="winner-card">
              <p className="winner-content">{roomState.winner.content}</p>
              <span className="winner-author">
                Submitted by: {roomState.winner.author}
              </span>
            </div>

            {isCreator && (
              <button onClick={() => navigate("/")} className="new-vote-button">
                Start a New Vote
              </button>
            )}
          </div>
        )}
      </div>

      <div className="room-footer">
        <div className="participants">
          <h3>Participants:</h3>
          <ul>
            {Object.keys(roomState.participants || {}).map(
              (participant, index) => (
                <li key={index}>
                  {participant}{" "}
                  {participant === roomState.creator && "(Creator)"}
                </li>
              )
            )}
          </ul>
        </div>

        <button onClick={() => navigate("/")} className="leave-room-button">
          Leave Room
        </button>
      </div>
    </div>
  );
};

export default Room;
