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

  /**
   * Navigates to the admin dashboard.
   */
  const handleAdminNavigate = () => {
    navigate('/admin');
  }

  /**
   * Logs out the current user and redirects to the login page.
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome, { user.username }. Your role is: { user.role }</p>
      { user.role === 'admin' && <button onClick={handleAdminNavigate}>Admin Dashboard</button> }
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard;
