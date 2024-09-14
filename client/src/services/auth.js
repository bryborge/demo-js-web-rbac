import axios from 'axios';

const API_URL = 'http://localhost:4000'; // In a production app, this should be an environment variable


/**
 * Logs in a user with the given username and password.
 *
 * If the login is successful, an object with a `token` property is returned.
 * The token is saved in local storage.
 *
 * @param {string} username The username to log in with.
 * @param {string} password The password to log in with.
 * @return {Promise} A promise that resolves to an object with a `token` property.
 */
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

/**
 * Returns the user data saved in local storage.
 *
 * @return {Object|null} The user data saved in local storage.
 *                       If no user data is saved, null is returned.
 */
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
}
