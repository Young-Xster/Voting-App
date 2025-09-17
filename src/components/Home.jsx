import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = ({ userName, onUserNameSet }) => {
  const [name, setName] = useState(userName || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onUserNameSet(name.trim());
    }
  };

  return (
    <div className="home-container">
      <div className="voting-header">
        <h1>
          <div className="cube-icon">📦</div>
          Voting Rooms
        </h1>
        <p>Create or join a voting room with your friends!</p>
      </div>

      <div className="features-grid">
        <div className="feature-item">
          <div className="feature-icon movies">🎬</div>
          <h3>Movies, Songs, Games</h3>
        </div>
        <div className="feature-item">
          <div className="feature-icon multiplayer">👥</div>
          <h3>Multiplayer Voting</h3>
        </div>
        <div className="feature-item">
          <div className="feature-icon tournament">🏆</div>
          <h3>Tournament Style</h3>
        </div>
      </div>

      <div className="main-card">
        {!userName ? (
          <div className="name-form">
            <h2>Enter Your Name</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button type="submit">Continue</button>
            </form>
          </div>
        ) : (
          <div className="menu">
            <h2>Welcome, {userName}!</h2>
            <div className="action-buttons">
              <Link to="/create" className="action-card create">
                <div className="action-card-icon">🎬</div>
                <h3>Create Room</h3>
                <p>Start a new voting session</p>
              </Link>
              <Link to="/join" className="action-card join">
                <div className="action-card-icon">📋</div>
                <h3>Join Room</h3>
                <p>Enter an existing room</p>
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="how-it-works">
        <h3>How it works</h3>
      </div>
    </div>
  );
};

export default Home;
