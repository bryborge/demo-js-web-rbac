import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, logout } from '../services/auth';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  /**
   * Logs out the current user and redirects to the login page.
   */
  const handleLogout = () => {
    logout();
    navigate('/login');

  }

  /**
   * Navigates to the user dashboard.
   */
  const handleDashboardNavigate = () => {
    navigate('/dashboard');
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p>
        This is a dashboard that only admins can access.
      </p>

      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleDashboardNavigate}>User Dashboard</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admin;
