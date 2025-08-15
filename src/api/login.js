import API_BASE_URL from "./config";
const API_URL = `${API_BASE_URL}/auth/admin-login`;

/**
 * Logs in the admin user.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object>} The API response containing status, message, token, and adminId.
 */
export async function loginAdmin(username, password) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: false,
        message: errorData.message || 'Login failed',
        error: errorData,
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Login failed',
      error,
    };
  }
}
