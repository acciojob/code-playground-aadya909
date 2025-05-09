
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

// PrivateRoute component
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Login page component
const Login = ({ onLogin, isAuthenticated }) => {
  const handleLogin = () => {
    onLogin(true);
  };

  return (
    <div className="main-container">
      <h2>Login Page</h2>
      {isAuthenticated ? (
        <p>You are already logged in.</p>
      ) : (
        <button onClick={handleLogin}>Log In</button>
      )}
    </div>
  );
};

// Private page (Code Playground)
const Home = () => {
  return (
    <div className="main-container">
      <h2>Welcome to the Code Playground</h2>
      <p>This is a private route accessible only to authenticated users.</p>
    </div>
  );
};

// App component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/home">Code Playground</Link>
          <p>Status: {isAuthenticated ? "Authenticated" : "Unauthenticated"}</p>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={
              <Login
                onLogin={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

