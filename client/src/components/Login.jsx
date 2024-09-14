import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/auth';

/**
 * A component that handles user login.
 *
 * State variables:
 * - `username`: The username to log in with.
 * - `password`: The password to log in with.
 * - `error`: Any error encountered during login.
 *
 * The component renders a form with username and password fields.
 * When the form is submitted, the `handleSubmit` function is called,
 * which attempts to log in the user with the given credentials.
 * If the login is successful, the user is redirected to the dashboard.
 * If the login fails, an error message is displayed.
 *
 * The component also renders an error message if the `error` state
 * variable is not null.
 */
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      setError(`Login Failed: ${error.message}`);
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={!username || !password}
          >
            Login</button>
        </div>
      </form>
      {error && <p>{error}</p>}

      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}

export default Login;
