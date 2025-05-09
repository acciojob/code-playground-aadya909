import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";

// PrivateRoute for access control
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

// Home Page (Private)
const Home = () => (
  <div className="main-container">
    <h2>Welcome to the Code Playground</h2>
    <p>This is a private route accessible only to authenticated users.</p>
  </div>
);

// App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        {/* ✅ Always show 2 nav links in the same order */}
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/home">Playground</Link>
        </nav>

        {/* Optional: Auth status */}
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




