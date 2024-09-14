import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

/**
 * A component that handles user registration.
 *
 * State variables:
 * - `username`: The username to register with.
 * - `password`: The password to register with.
 * - `role`: The role to register with. Can be `user`, `admin`, or `editor`.
 * - `error`: Any error encountered during registration.
 *
 * The component renders a form with username and password fields, as
 * well as a dropdown for selecting the role. When the form is submitted,
 * the `handleSubmit` function is called, which attempts to register the
 * user with the given credentials. If the registration is successful,
 * the user is redirected to the login page. If the registration fails,
 * an error message is displayed.
 *
 * The component also renders an error message if the `error` state
 * variable is not null.
 */
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(username, password, role);
      navigate('/login');
    } catch (err) {
      setError(`Registration Failed: ${err.message}`);
    }
  }

  return (
    <div className="container">
      <h2>Register</h2>
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
          <label htmlFor="role">Role:
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={!username || !password}
          >
            Register
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
