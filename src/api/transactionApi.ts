import axios from 'axios';

const API_BASE_URL = 'http://localhost:5110/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Transaction interfaces
export interface CreateTransactionRequest {
  transactionType: 'Income' | 'Expense';
  categoryId: number;
  amount: number;
  transactionDate: string; // ISO date string
  description?: string;
  merchantName?: string;
  location?: string;
  tags?: string[];
  receiptUrl?: string;
  isRecurring?: boolean;
  recurringFrequency?: 'Daily' | 'Weekly' | 'Monthly' | 'Annually';
  recurringEndDate?: string;
}

export interface TransactionView {
  id: number;
  type: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
  userId: number;
}

export interface TransactionDetails {
  transactionId: number;
  transactionType: string;
  categoryId: number;
  categoryName: string;
  amount: number;
  transactionDate: string;
  description?: string;
  merchantName?: string;
  location?: string;
  tags: string[];
  receiptUrl?: string;
  isRecurring: boolean;
  recurringFrequency?: string;
  recurringEndDate?: string;
  budgetImpacts: BudgetImpact[];
}

export interface BudgetImpact {
  budgetId: number;
  budgetName: string;
  categoryName: string;
  impactAmount: number;
  impactType: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: string[];
}

// Transaction API functions
export const transactionApi = {
  // Get user transactions
  getUserTransactions: async (userId: number): Promise<TransactionView[]> => {
    const response = await api.get<ApiResponse<TransactionView[]>>(`/Transaction/user/${userId}`);
    return response.data.data;
  },

  // Get transaction details
  getTransactionDetails: async (transactionId: number): Promise<TransactionDetails> => {
    const response = await api.get<ApiResponse<TransactionDetails>>(`/Transaction/${transactionId}`);
    return response.data.data;
  },

  // Create transaction
  createTransaction: async (userId: number, transaction: CreateTransactionRequest): Promise<TransactionDetails> => {
    const response = await api.post<ApiResponse<TransactionDetails>>(`/Transaction?userId=${userId}`, transaction);
    return response.data.data;
  },

  // Update transaction
  updateTransaction: async (transactionId: number, transaction: CreateTransactionRequest): Promise<TransactionDetails> => {
    const response = await api.put<ApiResponse<TransactionDetails>>(`/Transaction/${transactionId}`, transaction);
    return response.data.data;
  },

  // Delete transaction
  deleteTransaction: async (transactionId: number): Promise<void> => {
    await api.delete(`/Transaction/${transactionId}`);
  },

  // Get transactions by date range
  getTransactionsByDateRange: async (userId: number, startDate: string, endDate: string): Promise<TransactionView[]> => {
    const response = await api.get<ApiResponse<TransactionView[]>>(`/Transaction/user/${userId}/range`, {
      params: { startDate, endDate }
    });
    return response.data.data;
  },
};

export default transactionApi;
