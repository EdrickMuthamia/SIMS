import api from './api';

export const scannerService = {
  // Scan item by code with user tracking
  scanItem: async (code, userId = null, orgId = null) => {
    const params = new URLSearchParams();
    if (userId) params.append('user_id', userId);
    if (orgId) params.append('org_id', orgId);
    
    const response = await api.get(`/scanner/scan/${code}?${params.toString()}`);
    return response.data;
  },

  // Borrow asset
  borrowAsset: async (borrowData) => {
    const response = await api.post('/scanner/borrow', borrowData);
    return response.data;
  },

  // Return asset
  returnAsset: async (returnData) => {
    const response = await api.post('/scanner/return', returnData);
    return response.data;
  },

  // Record scan history
  recordScanHistory: async (historyData) => {
    const response = await api.post('/scanner/history', historyData);
    return response.data;
  },

  // Get scan history for user
  getScanHistory: async (userId) => {
    const response = await api.get(`/scanner/history/${userId}`);
    return response.data;
  },

  // Test endpoints
  testHistory: async () => {
    const response = await api.get('/scanner/test-history');
    return response.data;
  },

  createTestRecord: async () => {
    const response = await api.post('/scanner/test-create');
    return response.data;
  }
};