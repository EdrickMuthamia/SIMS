import api from './api';

export const itemService = {
  // Get all items with optional search
  getItems: async (search = '') => {
    const response = await api.get(`/items${search ? `?search=${search}` : ''}`);
    return response.data;
  },

  // Get item by ID
  getItemById: async (itemId) => {
    const response = await api.get(`/items/${itemId}`);
    return response.data;
  },

  // Create new item with image
  createItem: async (itemData, imageUri = null) => {
    const formData = new FormData();
    
    // Add item data
    Object.keys(itemData).forEach(key => {
      if (itemData[key] !== null && itemData[key] !== undefined) {
        formData.append(key, itemData[key]);
      }
    });

    // Add image if provided
    if (imageUri) {
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'item-image.jpg',
      });
    }

    const response = await api.post('/items', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update item
  updateItem: async (itemId, itemData, imageUri = null) => {
    const formData = new FormData();
    
    Object.keys(itemData).forEach(key => {
      if (itemData[key] !== null && itemData[key] !== undefined) {
        formData.append(key, itemData[key]);
      }
    });

    if (imageUri) {
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'item-image.jpg',
      });
    }

    const response = await api.put(`/items/${itemId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete item
  deleteItem: async (itemId) => {
    const response = await api.delete(`/items/${itemId}`);
    return response.data;
  },

  // Scan item by code
  scanItem: async (code) => {
    const response = await api.get(`/items/scan/${code}`);
    return response.data;
  }
};