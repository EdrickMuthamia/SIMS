import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


export const API_BASE_URL = 'http://172.105.244.140:4050';

// API endpoints
export const API_ENDPOINTS = {
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  SIGNIN: `${API_BASE_URL}/api/auth/signin`,
  REFRESH_TOKEN: `${API_BASE_URL}/api/auth/refresh-token`,
  VERIFY_TOKEN: `${API_BASE_URL}/api/auth/verify`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  UPLOAD_ORG_PHOTO: `${API_BASE_URL}/api/upload/organization-photo`,
  UPLOAD_PROFILE_PIC: `${API_BASE_URL}/api/upload/profile-picture`,
};

// Make authenticated API request with auto token refresh
export const apiRequest = async (url, options = {}) => {
  try {
    // Get access token
    let accessToken = await AsyncStorage.getItem('accessToken');

    // Add authorization header if token exists
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (accessToken && !options.skipAuth) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Make request
    let response = await fetch(url, {
      ...options,
      headers,
    });

    let data = await response.json();

    // Handle token expiration
    if (response.status === 401 && data.tokenExpired) {
      console.log('Access token expired, refreshing...');
      
      // Try to refresh token
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const refreshResponse = await fetch(API_ENDPOINTS.REFRESH_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const refreshData = await refreshResponse.json();

      if (refreshData.success) {
        // Store new access token
        await AsyncStorage.setItem('accessToken', refreshData.data.accessToken);
        
        // Retry original request with new token
        headers['Authorization'] = `Bearer ${refreshData.data.accessToken}`;
        response = await fetch(url, {
          ...options,
          headers,
        });
        
        data = await response.json();
      } else {
        // Refresh failed - redirect to login
        await clearAuthData();
        throw new Error('Session expired. Please login again.');
      }
    }

    return { response, data };

  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Upload file (multipart/form-data)
export const uploadFile = async (url, file, fieldName = 'photo') => {
  try {
    const formData = new FormData();
    
    // Append file
    formData.append(fieldName, {
      uri: file.uri,
      type: file.type || 'image/jpeg',
      name: file.fileName || 'photo.jpg',
    });

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await response.json();
    return { response, data };

  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};

// Save auth data to AsyncStorage
export const saveAuthData = async (authData) => {
  try {
    await AsyncStorage.setItem('accessToken', authData.accessToken);
    await AsyncStorage.setItem('refreshToken', authData.refreshToken);
    await AsyncStorage.setItem('user', JSON.stringify(authData.user));
    await AsyncStorage.setItem('organization', JSON.stringify(authData.organization));
    await AsyncStorage.setItem('isLoggedIn', 'true');
  } catch (error) {
    console.error('Error saving auth data:', error);
    throw error;
  }
};

// Clear auth data from AsyncStorage
export const clearAuthData = async () => {
  try {
    await AsyncStorage.multiRemove([
      'accessToken',
      'refreshToken',
      'user',
      'organization',
      'isLoggedIn',
      'userEmail',
      'userPassword',
      'organizationName',
      'organizationLocation',
      'organizationPhoto',
      'userName',
      'organizationBio',
    ]);
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// Get stored user data
export const getStoredUserData = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const organization = await AsyncStorage.getItem('organization');
    
    return {
      user: user ? JSON.parse(user) : null,
      organization: organization ? JSON.parse(organization) : null,
    };
  } catch (error) {
    console.error('Error getting stored user data:', error);
    return { user: null, organization: null };
  }
};