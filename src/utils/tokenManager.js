/**
 * Utility class for managing authentication tokens
 */
export const tokenManager = {
  /**
   * Store the authentication token
   * @param {string} token - JWT token to store
   */
  setToken: (token) => {
    if (!token) return;
    localStorage.setItem("token", token);
  },

  /**
   * Retrieve the stored authentication token
   * @returns {string|null} The stored token or null if not found
   */
  getToken: () => {
    return localStorage.getItem("token");
  },

  /**
   * Remove the stored authentication token
   */
  removeToken: () => {
    localStorage.removeItem("token");
  },

  /**
   * Check if user is authenticated (has valid token)
   * @returns {boolean} True if authenticated, false otherwise
   */
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      // Check if token is expired
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  },

  /**
   * Get user info from token
   * @returns {Object|null} Decoded token payload or null if invalid
   */
  getTokenPayload: () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  },

  /**
   * Check if token is expired
   * @returns {boolean} True if token is expired or invalid, false otherwise
   */
  isTokenExpired: () => {
    const payload = tokenManager.getTokenPayload();
    if (!payload) return true;
    return payload.exp < Date.now() / 1000;
  },
};
