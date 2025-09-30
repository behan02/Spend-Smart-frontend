import axios from 'axios';

// Define your API base URL
const API_BASE_URL = 'http://localhost:5110/api'; // This should match your backend's actual port 

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
});

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

  // Update goal - accept any partial data for update
  update: async (id: number, goalData: Partial<GoalFormData>): Promise<Goal> => {
    console.log(`Sending PUT to /goals/${id} with data:`, goalData);
    // Use axios directly to ensure proper URL format and debugging
    const url = `${API_BASE_URL}/goals/${id}`;
    console.log(`Full URL: ${url}`);
    const response = await axios.put<Goal>(url, goalData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  },

  // Delete goal
  delete: async (id: number): Promise<void> => {
    console.log(`Sending DELETE to /goals/${id}`);
    const url = `${API_BASE_URL}/goals/${id}`;
    console.log(`Full URL for delete: ${url}`);
    await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
