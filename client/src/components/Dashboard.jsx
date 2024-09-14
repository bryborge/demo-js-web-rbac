import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getCurrentUser, logout } from '../services/auth';

/**
 * A protected route that displays a welcome message with the user's name,
 * as well as a logout button.
 *
 * If the user is not logged in, it redirects to the login page.
 *
 * @returns A JSX element containing the welcome message and logout button.
 */
const Dashboard = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser) {
      navigate('/login');
    } else {
      const decodedToken = jwtDecode(currentUser.token);
      setUser(decodedToken);
    }

  }, [navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <h3>Welcome, { user.username }</h3>
      <p>Your role is: { user.role }</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard;
