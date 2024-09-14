import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCurrentUser } from '../services/auth';

const Dashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = getCurrentUser();
    const decodedToken = jwtDecode(currentUser.token);
    setUser(decodedToken);
  }, []);

  if (!user) return null;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, { user.username }</h2>
    </div>
  )
}

export default Dashboard;
