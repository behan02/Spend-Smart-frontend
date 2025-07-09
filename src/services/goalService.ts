import axios from 'axios';

// Define your API base URL
const API_BASE_URL = 'http://localhost:5110/api'; // Updated to match backend port 

// Define Goal interface matching the backend model
export interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate?: string;
  description?: string;
  userId: number;
}

// Create Form Data interface
export interface GoalFormData {
  name: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate?: string;
  description?: string;
  userId?: number;
}

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received:`, response.status, response.data);
    return response;
  },
  (error) => {
    // Don't log 404 errors for full update endpoint as they're expected
    if (error.response?.status === 404 && error.config?.url?.includes('/full')) {
      console.log('ℹ️ Full update endpoint not available (404), will use fallback');
    } else {
      console.error('❌ Response error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
        fullURL: `${error.config?.baseURL}${error.config?.url}`
      });
    }
    return Promise.reject(error);
  }
);

// Goal service methods
export const goalService = {
  // Get all goals
  getAll: async (): Promise<Goal[]> => {
    const response = await apiClient.get<Goal[]>('/goals');
    return response.data;
  },

  // Get goal by id
  getById: async (id: number): Promise<Goal> => {
    const response = await apiClient.get<Goal>(`/goals/${id}`);
    return response.data;
  },

  // Create new goal
  create: async (goalData: GoalFormData): Promise<Goal> => {
    const response = await apiClient.post<Goal>('/goals', goalData);
    return response.data;
  },

  // Debug create goal
  debugCreate: async (goalData: GoalFormData): Promise<any> => {
    const response = await apiClient.post('/goals/debug', goalData);
    return response.data;
  },

  // Update goal
  update: async (id: number, goalData: GoalFormData): Promise<Goal> => {
    console.log(`Updating goal with ID: ${id}`, goalData);
    
    try {
      // Try the full update endpoint first
      console.log(`Attempting full update endpoint: /goals/${id}/full`);
      const response = await apiClient.put(`/goals/${id}/full`, goalData);
      console.log(`✅ Goal ${id} updated successfully via full endpoint:`, response.status, response.data);
      return response.data;
    } catch (error: any) {
      // If full update fails with 404, try the regular partial update endpoint
      if (error.response?.status === 404) {
        console.log(`Full update endpoint not available, using partial update: /goals/${id}`);
        try {
          // Convert GoalFormData to partial update format
          const partialUpdateData = {
            name: goalData.name,
            targetAmount: goalData.targetAmount,
            currentAmount: goalData.currentAmount,
            startDate: goalData.startDate,
            endDate: goalData.endDate,
            description: goalData.description
          };
          
          console.log('Calling partial update endpoint...');
          const fallbackResponse = await apiClient.put(`/goals/${id}`, partialUpdateData);
          console.log(`✅ Goal ${id} updated via partial update:`, fallbackResponse.status);
          
          // Since partial update returns NoContent, fetch the updated goal
          console.log('Fetching updated goal data...');
          const updatedGoal = await apiClient.get(`/goals/${id}`);
          console.log(`✅ Updated goal data retrieved:`, updatedGoal.data);
          return updatedGoal.data;
        } catch (fallbackError: any) {
          console.error(`❌ Partial update failed:`, fallbackError.response?.data || fallbackError.message);
          throw fallbackError;
        }
      } else {
        console.error(`❌ Full update failed with non-404 error:`, error.response?.status, error.response?.data);
        throw error;
      }
    }
  },

  // Delete goal
  delete: async (id: number): Promise<void> => {
    console.log(`Deleting goal with ID: ${id}`);
    try {
      const response = await apiClient.delete(`/goals/${id}`);
      console.log(`Goal ${id} deleted successfully:`, response.status);
    } catch (error: any) {
      console.error(`Error deleting goal ${id}:`, error.response?.data || error.message);
      throw error;
    }
  }
};
