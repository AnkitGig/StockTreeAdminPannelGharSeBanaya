// API Configuration
const API_BASE_URL = `${process.env.REACT_APP_BASE_URL}/api`

export const API_ENDPOINTS = {
  TRADERS: {
    GET_ALL: `${API_BASE_URL}/traders`,
    CREATE: `${API_BASE_URL}/traders`,
    DELETE: (id) => `${API_BASE_URL}/traders/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/traders/${id}`,
  },
}

export default API_BASE_URL
