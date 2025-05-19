import axios from 'axios';

// Define your API base URL
const API_BASE_URL = 'https://localhost:7211/api'; 

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

  // Update goal
  update: async (id: number, goalData: Goal): Promise<void> => {
    await apiClient.put(`/goals/${id}`, goalData);
  },

  // Delete goal
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/goals/${id}`);
  }
};
