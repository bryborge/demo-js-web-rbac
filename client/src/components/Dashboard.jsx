import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getCurrentUser, logout } from '../services/auth';

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
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, { user.username }</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard;
