import axios from 'axios';

const API_URL = 'http://localhost:4000'; // In a production app, this should be an environment variable

// Login
export const login = async (username, password) => {
  return await axios.post(`${API_URL}/api/login`, { username, password })
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        // Save user data in local storage
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
}
