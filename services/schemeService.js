import api from './api';

export const schemeService = {
  // Generic CRUD operations for any model
  create: async (model, data) => {
    const response = await api.post(`/scheme/${model}`, data);
    return response.data;
  },

  read: async (model, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/scheme/${model}${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },

  update: async (model, data) => {
    const response = await api.put(`/scheme/${model}`, data);
    return response.data;
  },

  patch: async (model, data) => {
    const response = await api.patch(`/scheme/${model}`, data);
    return response.data;
  },

  // List operations
  list: async (model) => {
    const response = await api.get(`/scheme/list/${model}`);
    return response.data;
  },

  listMulti: async () => {
    const response = await api.get('/scheme/list-multi');
    return response.data;
  },

  // Search operations
  fuseSearch: async (model, query) => {
    const response = await api.get(`/scheme/fuse-search/${model}?q=${query}`);
    return response.data;
  },

  // User operations
  getUsers: async () => {
    return await schemeService.list('user');
  },

  createUser: async (userData) => {
    return await schemeService.create('user', userData);
  },

  updateUser: async (userData) => {
    return await schemeService.update('user', userData);
  },

  // Organization operations
  getOrganizations: async () => {
    return await schemeService.list('organization');
  },

  createOrganization: async (orgData) => {
    return await schemeService.create('organization', orgData);
  },

  // Role operations
  getRoles: async () => {
    return await schemeService.list('role');
  },

  createRole: async (roleData) => {
    return await schemeService.create('role', roleData);
  },

  // Request operations
  getRequests: async () => {
    return await schemeService.list('request');
  },

  createRequest: async (requestData) => {
    return await schemeService.create('request', requestData);
  },

  // Vendor operations
  getVendors: async () => {
    return await schemeService.list('vendor');
  },

  createVendor: async (vendorData) => {
    return await schemeService.create('vendor', vendorData);
  },

  // Order operations
  getOrders: async () => {
    return await schemeService.list('order');
  },

  createOrder: async (orderData) => {
    return await schemeService.create('order', orderData);
  }
};