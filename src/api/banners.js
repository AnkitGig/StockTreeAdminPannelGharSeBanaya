import API_BASE_URL from "./config";

export const getAllBanners = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) headers['x-api-key'] = token;
    const response = await fetch(`${API_BASE_URL}/banners`, {
      method: 'GET',
      headers,
    });
    const data = await response.json();
    return { status: data.status, data: data.data };
  } catch (error) {
    return { status: false, data: [], error: error.message };
  }
};

export const createBanner = async (formData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const headers = {};
    if (token) headers['x-api-key'] = token;
    const response = await fetch(`${API_BASE_URL}/banners`, {
      method: 'POST',
      headers,
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: false, error: error.message };
  }
};
