import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import Room from "./components/Room";
import { SocketProvider } from "./context/SocketContext";

export default function App() {
  // Generate a unique session ID for this tab
  const [sessionId] = useState(() => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  });

  const [userName, setUserName] = useState(() => {
    return sessionStorage.getItem(`userName_${sessionId}`) || "";
  });

  const handleUserNameSet = (name) => {
    sessionStorage.setItem(`userName_${sessionId}`, name);
    setUserName(name);
  };
  return (
    <SocketProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route
              path="/"
              element={
                <Home onUserNameSet={handleUserNameSet} userName={userName} />
              }
            />
            <Route
              path="/create"
              element={
                userName ? (
                  <CreateRoom userName={userName} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/join"
              element={
                userName ? (
                  <JoinRoom userName={userName} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/room/:roomId"
              element={
                userName ? (
                  <Room userName={userName} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
}
