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
  icon?: string;
  color?: string;
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
    try {
      // Use the correct endpoint from DatabaseController
      const response = await api.get('/Database/check-categories');
      
      // The response format is different than expected
      // It returns { totalCount, expenseCategories, incomeCategories, categories }
      if (response.data && response.data.categories) {
        return response.data.categories;
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Get categories by type
  getCategoriesByType: async (type: 'Income' | 'Expense'): Promise<Category[]> => {
    try {
      const allCategories = await categoryApi.getAllCategories();
      return allCategories.filter(category => 
        category.type.toLowerCase() === type.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching categories by type:', error);
      throw error;
    }
  },
};

export default categoryApi;
