import axios from "axios";

// Base URLs
const API_URL = "http://127.0.0.1:5500";

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

// Fetch all roles
export async function fetchroles() {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
}

// Fetch perssions for a given role
export async function fetchPermissionsByRoleId(roleId) {
  try {
    const response = await axios.get(`${API_URL}/roles/${roleId}/permissions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
    throw error;
  }
}

// Fetch All Permissions
export async function fetchAllPermissions() {
  try {
    const response = await axios.get(`${API_URL}/permissions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all permissions:", error);
    throw error;
  }
}

//Add new role
export async function addRole(roleData) {
  return await axios.post(`${API_URL}/roles`, roleData);
}

//Update Role Permissions
export async function updateRolePermissions(roleId, permissions) {
  try {
    // Expected payload format:
    // { permissions: [{ id: 1, is_active: true }, { id: 2, is_active: false }] }
    const response = await axios.put(`${API_URL}/roles/${roleId}/permissions`, {
      permissions,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating role permissions:", error);
    throw error;
  }
}

// Delete a role
export async function deleteRole(roleId) {
  return await axios.delete(`${API_URL}/roles/${roleId}`);
}

export default axios;
 
