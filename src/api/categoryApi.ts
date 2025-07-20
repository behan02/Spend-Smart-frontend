import axios from 'axios';

const API_BASE_URL = 'http://localhost:5110/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Category interfaces
export interface Category {
  id: number;
  categoryName: string;
  type: string; // 'Income' or 'Expense'
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: string[];
}

// Category API functions
export const categoryApi = {
  // Get all categories
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/Category');
    return response.data.data;
  },

  // Get categories by type
  getCategoriesByType: async (type: 'Income' | 'Expense'): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>(`/Category/type/${type}`);
    return response.data.data;
  },
};

export default categoryApi;
