import axios from "axios";

// Base URLs
const API_URL = "http://127.0.0.1:5500";

// Ensure JSON headers and CORS support
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;


// Send an invitation
export async function sendInvitation(email, role_id, department, branch) {
  try {
    const response = await axios.post(`${API_URL}/invitations/send`, {
      email,
      role_id,
      department,
      branch,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending invitation:", error);
    throw error.response?.data || error.message;
  }
}

// Verify or accept invitation (user action)
export async function verifyInvitation(token) {
  try {
    const response = await api.post("/invitations/verify", { token });
    return response.data; // e.g. { valid: true, email: "user@example.com" }
  } catch (error) {
    console.error("Error verifying invitation:", error);
    throw error.response?.data || error.message;
  }
}