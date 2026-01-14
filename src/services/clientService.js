import axios from 'axios';

// Base URL for the Client Microservice
// In a real scenario, this would come from an environment variable
const API_URL = 'http://localhost:8081/api/clients';

/**
 * Service for handling client-related API calls.
 */
const clientService = {
  /**
   * Fetch all clients.
   * @returns {Promise}
   */
  getAllClients: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  },

  /**
   * Get a single client by ID.
   * @param {string|number} id 
   * @returns {Promise}
   */
  getClientById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching client ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new client.
   * @param {Object} clientData 
   * @returns {Promise}
   */
  createClient: async (clientData) => {
    try {
      const response = await axios.post(API_URL, clientData);
      return response.data;
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  },

  /**
   * Update an existing client.
   * @param {string|number} id 
   * @param {Object} clientData 
   * @returns {Promise}
   */
  updateClient: async (id, clientData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, clientData);
      return response.data;
    } catch (error) {
      console.error(`Error updating client ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a client.
   * @param {string|number} id 
   * @returns {Promise}
   */
  deleteClient: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting client ${id}:`, error);
      throw error;
    }
  }
};

export default clientService;
