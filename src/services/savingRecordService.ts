import axios from 'axios';

// Define your API base URL
const API_BASE_URL = 'http://localhost:5110/api'; // This should match your backend's actual port 

// Define SavingRecord interface matching the backend model
export interface SavingRecord {
  id: number;
  amount: number;
  date: string; // ISO string format for API compatibility
  description?: string;
  goalId: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Create Form Data interface
export interface SavingRecordFormData {
  amount: number;
  date: string;
  description?: string;
  goalId: number;
  userId?: number;
}

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Saving Record service methods
export const savingRecordService = {
  // Get all saving records for a specific goal
  getByGoalId: async (goalId: number): Promise<SavingRecord[]> => {
    try {
      const response = await apiClient.get<SavingRecord[]>(`/saving-records/goal/${goalId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching saving records:', error);
      throw error;
    }
  },

  // Get all saving records for a user
  getByUserId: async (userId: number): Promise<SavingRecord[]> => {
    try {
      const response = await apiClient.get<SavingRecord[]>(`/saving-records/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user saving records:', error);
      throw error;
    }
  },

  // Get saving record by id
  getById: async (id: number): Promise<SavingRecord> => {
    try {
      const response = await apiClient.get<SavingRecord>(`/saving-records/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching saving record:', error);
      throw error;
    }
  },

  // Create new saving record
  create: async (recordData: SavingRecordFormData): Promise<SavingRecord> => {
    try {
      const response = await apiClient.post<SavingRecord>('/saving-records', recordData);
      return response.data;
    } catch (error) {
      console.error('Error creating saving record:', error);
      throw error;
    }
  },

  // Update saving record
  update: async (id: number, recordData: Partial<SavingRecordFormData>): Promise<SavingRecord> => {
    try {
      console.log(`Updating saving record ${id} with data:`, recordData);
      const response = await apiClient.put<SavingRecord>(`/saving-records/${id}`, recordData);
      return response.data;
    } catch (error) {
      console.error('Error updating saving record:', error);
      throw error;
    }
  },

  // Delete saving record
  delete: async (id: number): Promise<void> => {
    try {
      console.log(`Deleting saving record ${id}`);
      await apiClient.delete(`/saving-records/${id}`);
    } catch (error) {
      console.error('Error deleting saving record:', error);
      throw error;
    }
  },

  // Get total saved amount for a goal
  getTotalSavedByGoal: async (goalId: number): Promise<number> => {
    try {
      const response = await apiClient.get<{ totalAmount: number }>(`/saving-records/goal/${goalId}/total`);
      return response.data.totalAmount;
    } catch (error) {
      console.error('Error fetching total saved amount:', error);
      throw error;
    }
  },

  // Get saving records with pagination
  getPaginated: async (goalId: number, page: number = 1, limit: number = 10): Promise<{
    records: SavingRecord[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    try {
      const response = await apiClient.get(`/saving-records/goal/${goalId}/paginated`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching paginated saving records:', error);
      throw error;
    }
  }
};

