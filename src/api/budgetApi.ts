import axios from 'axios';
import { API_BASE_URL } from './config';
import { 
  BudgetSummaryDto, 
  BudgetResponseDto, 
  TransactionDto, 
  ExpenseBreakdownDto, 
  PeriodDataDto,
  CreateBudgetDto,
  UpdateBudgetDto
} from '../types/budgetTypes';

const BUDGET_API_URL = `${API_BASE_URL}/Budget`;

export const budgetApi = {
  // Get all budgets for a user
  getUserBudgets: async (userId: number): Promise<BudgetSummaryDto[]> => {
    const response = await axios.get<BudgetSummaryDto[]>(`${BUDGET_API_URL}/user/${userId}`);
    return response.data;
  },

  // Get budget details by ID
  getBudgetDetails: async (budgetId: number): Promise<BudgetResponseDto> => {
    const response = await axios.get<BudgetResponseDto>(`${BUDGET_API_URL}/details/${budgetId}`);
    return response.data;
  },

  // Get transactions for a budget
  getBudgetTransactions: async (budgetId: number): Promise<TransactionDto[]> => {
    const response = await axios.get<TransactionDto[]>(`${BUDGET_API_URL}/${budgetId}/transactions`);
    return response.data;
  },

  // Get expense breakdown for a budget
  getExpenseBreakdown: async (budgetId: number): Promise<ExpenseBreakdownDto[]> => {
    const response = await axios.get<ExpenseBreakdownDto[]>(`${BUDGET_API_URL}/${budgetId}/expense-breakdown`);
    return response.data;
  },

  // Get period data for budget chart
  getBudgetPeriodData: async (budgetId: number): Promise<PeriodDataDto[]> => {
    const response = await axios.get<PeriodDataDto[]>(`${BUDGET_API_URL}/${budgetId}/period-data`);
    return response.data;
  },

  // Create a new budget
  createBudget: async (userId: number, budgetData: CreateBudgetDto): Promise<BudgetResponseDto> => {
    const response = await axios.post<BudgetResponseDto>(`${BUDGET_API_URL}/create/${userId}`, budgetData);
    return response.data;
  },

  // Update an existing budget
  updateBudget: async (budgetId: number, budgetData: UpdateBudgetDto): Promise<BudgetResponseDto> => {
    const response = await axios.put<BudgetResponseDto>(`${BUDGET_API_URL}/update/${budgetId}`, budgetData);
    return response.data;
  },

  // Delete a budget
  deleteBudget: async (budgetId: number): Promise<void> => {
    await axios.delete(`${BUDGET_API_URL}/delete/${budgetId}`);
  },

  // Update budget status
  updateBudgetStatus: async (budgetId: number, status: string): Promise<void> => {
    await axios.put(`${BUDGET_API_URL}/${budgetId}/status/${status}`);
  },

  // Record transaction impact on budget
  recordTransactionImpact: async (
    transactionId: number,
    budgetId: number,
    categoryId: number,
    amount: number
  ): Promise<void> => {
    await axios.post(`${BUDGET_API_URL}/transaction-impact`, {
      transactionId,
      budgetId,
      categoryId,
      amount
    });
  }
};
