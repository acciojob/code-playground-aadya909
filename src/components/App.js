import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";

// PrivateRoute for guarding private pages
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

// Login Page
const Login = ({ onLogin, isAuthenticated }) => {
  const handleLogin = () => {
    onLogin(true);
  };

  return (
    <div className="main-container">
      <h2>You are not authenticated, Please login first</h2>
      {isAuthenticated ? (
        <p>You are already logged in.</p>
      ) : (
        <button onClick={handleLogin}>Log In</button>
      )}
    </div>
  );
};

// Private Home Page
const Home = () => (
  <div className="main-container">
    <h2>Welcome to the Code Playground</h2>
    <p>This is a private route accessible only to authenticated users.</p>
  </div>
);

// Main App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        {/* Navigation with expected structure */}
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/home">Code Playground</Link>
        </nav>

        {/* Auth status message (optional for debugging) */}
        <p>Status: {isAuthenticated ? "Authenticated" : "Unauthenticated"}</p>

        <Switch>
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                onLogin={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
          <PrivateRoute
            path="/home"
            component={Home}
            isAuthenticated={isAuthenticated}
          />
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;


