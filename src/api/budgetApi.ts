import axios from 'axios';

const API_BASE_URL = 'http://localhost:5110/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Budget API interfaces
export interface BudgetCategoryAllocation {
  categoryId: number;
  allocatedAmount: number;
}

export interface CreateBudgetRequest {
  budgetName: string;
  budgetType: string; // 'Monthly' or 'Annually'
  startDate: string; // ISO date string
  description?: string;
  categoryAllocations: BudgetCategoryAllocation[];
}

export interface BudgetSummary {
  budgetId: number;
  budgetName: string;
  budgetType: string;
  startDate: string;
  endDate: string;
  totalBudgetAmount: number;
  totalSpentAmount: number;
  remainingAmount: number;
  progressPercentage: number;
  status: string;
}

export interface BudgetDetails {
  budgetId: number;
  budgetName: string;
  budgetType: string;
  startDate: string;
  endDate: string;
  totalBudgetAmount: number;
  totalSpentAmount: number;
  remainingAmount: number;
  progressPercentage: number;
  status: string;
  description?: string;
  categories: BudgetCategoryDetails[];
}

export interface BudgetCategoryDetails {
  budgetCategoryId: number;
  categoryId: number;
  categoryName: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  progressPercentage: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: string[];
}

// Budget API functions
export const budgetApi = {
  // Get user budgets
  getUserBudgets: async (userId: number): Promise<BudgetSummary[]> => {
    const response = await api.get<ApiResponse<BudgetSummary[]>>(`/Budget/user/${userId}`);
    return response.data.data;
  },

  // Get budget details
  getBudgetDetails: async (budgetId: number): Promise<BudgetDetails> => {
    const response = await api.get<ApiResponse<BudgetDetails>>(`/Budget/${budgetId}`);
    return response.data.data;
  },

  // Create budget
  createBudget: async (userId: number, budget: CreateBudgetRequest): Promise<BudgetDetails> => {
    const response = await api.post<ApiResponse<BudgetDetails>>(`/Budget?userId=${userId}`, budget);
    return response.data.data;
  },

  // Update budget
  updateBudget: async (budgetId: number, budget: CreateBudgetRequest): Promise<BudgetDetails> => {
    const response = await api.put<ApiResponse<BudgetDetails>>(`/Budget/${budgetId}`, budget);
    return response.data.data;
  },

  // Delete budget
  deleteBudget: async (budgetId: number): Promise<void> => {
    await api.delete(`/Budget/${budgetId}`);
  },

  // Get budget analytics
  getBudgetAnalytics: async (budgetId: number): Promise<any> => {
    const response = await api.get<ApiResponse<any>>(`/BudgetAnalytics/${budgetId}`);
    return response.data.data;
  },
};

export default budgetApi;
