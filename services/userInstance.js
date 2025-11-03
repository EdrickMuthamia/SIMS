import axios from "axios";

// Base URLs
const API_URL = "http://192.168.100.46:4050";

// Ensure JSON headers and CORS support
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

// Fetch organiztion logo 
export async function fetchOrganizationLogo(orgId) {
  try {
    const response = await axios.get(`${API_URL}/organization/${orgId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

// Fetch all users
export async function fetchUsers() {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Fetch single user (for modals or details)
export async function fetchUserById(userId) {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

//Add new user
export async function addUser(userData) {
  return await axios.post(`${API_URL}/users`, userData);
}

// Update user details
export async function updateUser(userId, updatedData) {
  return await axios.put(`${API_URL}/users/${userId}`, updatedData);
}

// Delete a user
export async function deleteUser(userId) {
  return await axios.delete(`${API_URL}/users/${userId}`);
}

//Handle search functionality
export async function searchUsers(query) {
  return await axios.get(`${API_URL}/users/search`, {
    params: { q: query },
  });
}

// Export user list csv
export async function exportUsersCSV() {
  return await axios.get(`${API_URL}/users/export`, {
    responseType: "blob",
  });
}

export default axios;