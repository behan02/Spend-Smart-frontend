import axios from 'axios';
import { API_BASE_URL } from './config';

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
    try {
      const response = await api.get<ApiResponse<TransactionView[]>>(`/Transaction/user/${userId}`);
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      return [];
    }
  },

  // Get transaction details
  getTransactionDetails: async (transactionId: number): Promise<TransactionDetails> => {
    try {
      const response = await api.get<ApiResponse<TransactionDetails>>(`/Transaction/${transactionId}`);
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error(`Transaction with ID ${transactionId} not found`);
    } catch (error) {
      console.error('Error fetching transaction details:', error);
      throw error;
    }
  },

  // Create transaction
  createTransaction: async (userId: number, transaction: CreateTransactionRequest): Promise<TransactionDetails> => {
    try {
      const response = await api.post<ApiResponse<TransactionDetails>>(`/Transaction?userId=${userId}`, transaction);
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      throw new Error('Failed to create transaction');
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // Update transaction
  updateTransaction: async (transactionId: number, transaction: CreateTransactionRequest): Promise<TransactionDetails> => {
    try {
      const response = await api.put<ApiResponse<TransactionDetails>>(`/Transaction/${transactionId}`, transaction);
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      
      // If the response doesn't include the updated transaction data, fetch it
      return await transactionApi.getTransactionDetails(transactionId);
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  },

  // Delete transaction
  deleteTransaction: async (transactionId: number): Promise<void> => {
    try {
      await api.delete(`/Transaction/${transactionId}`);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  },

  // Get transactions by date range
  getTransactionsByDateRange: async (userId: number, startDate: string, endDate: string): Promise<TransactionView[]> => {
    try {
      const response = await api.get<ApiResponse<TransactionView[]>>(`/Transaction/user/${userId}/range`, {
        params: { startDate, endDate }
      });
      
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching transactions by date range:', error);
      return [];
    }
  },
};

export default transactionApi;
