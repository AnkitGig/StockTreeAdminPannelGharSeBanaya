import API_BASE_URL from "./config";
const API_URL = `${API_BASE_URL.replace('/api','')}/user/search`;

export const searchUser = async (query) => {
  try {
    const token = localStorage.getItem('adminToken');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['x-api-key'] = token;
    }
    const url = `${API_URL}?query=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      let errorMsg = `HTTP error! status: ${response.status}`;
      try {
        const errData = await response.json();
        if (errData && errData.message) errorMsg = errData.message;
      } catch {}
      throw new Error(errorMsg);
    }
    const data = await response.json();
    return { status: 'success', data: data.data };
  } catch (error) {
    return { status: 'error', data: [], error: error.message };
  }
};
