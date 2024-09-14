import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; // In a production app, this should be an environment variable


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
  return await axios.post(`${API_URL}/login`, { username, password })
    .then((response) => {
      if (response.data.token) {
        // Save user data in local storage
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
}

/**
 * Logs out the current user by removing the user data from local storage.
 *
 * @return {void}
 */
export const logout = () => {
  localStorage.removeItem('user');
}

/**
 * Registers a new user with the given username, password, and role.
 *
 * @param {string} username The username to register with.
 * @param {string} password The password to register with.
 * @param {string} role The role to register with. Can be `user`, `admin`, or `editor`.
 * @return {Promise} A promise that resolves to the newly created user object.
 */
export const register = async (username, password, role) => {
  return await axios.post(`${API_URL}/register`, { username, password, role });
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

/**
 * Gets all users from the server.
 *
 * @return {Promise} A promise that resolves to an array of user objects.
 */
export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
}
