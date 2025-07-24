import { Budget, Transaction, ExpenseBreakdown, PeriodData } from '../components/Budget/types/BudgetDetails';
import { budgetApi } from '../api/budgetApi';
import { transactionApi } from '../api/transactionApi';

interface CategoryAllocation {
  categoryId: number;
  allocatedAmount: number;
}

interface CreateBudgetRequest {
  budgetName: string;
  budgetType: 'Monthly' | 'Annually';
  startDate: string;
  description?: string;
  categoryAllocations: CategoryAllocation[];
}

export const budgetService = {
  // Get budget by ID
  getBudgetById: async (budgetId: number): Promise<Budget | null> => {
    try {
      const apiResponse = await budgetApi.getBudgetDetails(budgetId);

      const budget: Budget = {
        id: apiResponse.budgetId,
        name: apiResponse.budgetName,
        type: apiResponse.budgetType.toLowerCase() as 'monthly' | 'annually',
        startDate: apiResponse.startDate,
        endDate: apiResponse.endDate,
        totalAmount: apiResponse.totalBudgetAmount,
        spentAmount: apiResponse.totalSpentAmount,
        remainingAmount: apiResponse.remainingAmount,
        description: apiResponse.description,
        progress: Math.round(apiResponse.progressPercentage * 10) / 10, // Round to 1 decimal place
        remainingDays: apiResponse.daysRemaining,
        status: apiResponse.status.toLowerCase() as 'active' | 'completed' | 'exceeded',
        categories: apiResponse.categories.map(cat => ({
          id: cat.categoryId,
          name: cat.categoryName,
          allocatedAmount: cat.allocatedAmount,
          spentAmount: cat.spentAmount,
          remainingAmount: cat.remainingAmount,
          percentage: Math.round(cat.progressPercentage * 10) / 10
        }))
      };

      return budget;
    } catch (error) {
      console.error('Error fetching budget:', error);
      return null;
    }
  },

  // Get transactions for a budget
  getTransactionsByBudgetId: async (budgetId: number): Promise<Transaction[]> => {
    try {
      const apiTransactions = await budgetApi.getBudgetTransactions(budgetId);
      console.log('Raw API transactions:', apiTransactions);

      return apiTransactions.map(t => {
        console.log('Mapping transaction:', t);
        return {
          id: t.transactionId,
          categoryId: t.categoryId,
          categoryName: t.categoryName,
          categoryIcon: t.categoryIcon || '💰',
          date: t.transactionDate,
          description: t.description || '',
          amount: t.amount,
          type: (t.transactionType || 'expense').toLowerCase() as 'income' | 'expense',
          budgetId: budgetId,
          createdAt: t.transactionDate,
          updatedAt: t.transactionDate
        };
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },

  // Get expense breakdown for a budget
  getExpenseBreakdown: async (budgetId: number): Promise<ExpenseBreakdown[]> => {
    try {
      const apiBreakdown = await budgetApi.getExpenseBreakdown(budgetId);
      
      console.log("API Expense Breakdown:", apiBreakdown);

      // Map API response to ExpenseBreakdown interface
      return apiBreakdown.map(item => ({
        id: item.categoryId,
        label: item.categoryName,
        value: item.amount,
        percentage: item.percentage,
        color: item.color || '#666',
        icon: item.icon
      }));
    } catch (error) {
      console.error('Error fetching expense breakdown:', error);
      return [];
    }
  },

  // Get period data for budget chart
  getPeriodData: async (budgetId: number): Promise<PeriodData[]> => {
    try {
      const apiPeriodData = await budgetApi.getBudgetPeriodData(budgetId);

      return apiPeriodData.map(item => ({
        date: item.date,
        amount: item.amount,
        cumulativeAmount: item.cumulativeAmount,
        budgetLimit: item.budgetLimit
      }));
    } catch (error) {
      console.error('Error fetching period data:', error);
      return [];
    }
  },

  // Create a new budget
  createBudget: async (
    userId: number,
    data: CreateBudgetRequest
  ): Promise<Budget | null> => {
    try {
      const response = await budgetApi.createBudget(userId, data);

      return {
        id: response.budgetId,
        name: response.budgetName,
        type: response.budgetType.toLowerCase() as 'monthly' | 'annually',
        startDate: response.startDate,
        endDate: response.endDate,
        totalAmount: response.totalBudgetAmount,
        spentAmount: response.totalSpentAmount,
        remainingAmount: response.remainingAmount,
        description: response.description,
        progress: Math.round(response.progressPercentage * 10) / 10,
        remainingDays: response.daysRemaining,
        status: response.status.toLowerCase() as 'active' | 'completed' | 'exceeded',
        categories: response.categories.map(cat => ({
          id: cat.categoryId,
          name: cat.categoryName,
          allocatedAmount: cat.allocatedAmount,
          spentAmount: cat.spentAmount,
          remainingAmount: cat.remainingAmount,
          percentage: Math.round(cat.progressPercentage * 10) / 10
        }))
      };
    } catch (error) {
      console.error('Error creating budget:', error);
      return null;
    }
  },

  // Update budget
  updateBudget: async (
    budgetId: number, 
    updates: CreateBudgetRequest
  ): Promise<Budget | null> => {
    try {
      const updatedBudget = await budgetApi.updateBudget(budgetId, updates);

      return {
        id: updatedBudget.budgetId,
        name: updatedBudget.budgetName,
        type: updatedBudget.budgetType.toLowerCase() as 'monthly' | 'annually',
        startDate: updatedBudget.startDate,
        endDate: updatedBudget.endDate,
        totalAmount: updatedBudget.totalBudgetAmount,
        spentAmount: updatedBudget.totalSpentAmount,
        remainingAmount: updatedBudget.remainingAmount,
        description: updatedBudget.description,
        progress: Math.round(updatedBudget.progressPercentage * 10) / 10,
        remainingDays: updatedBudget.daysRemaining,
        status: updatedBudget.status.toLowerCase() as 'active' | 'completed' | 'exceeded',
        categories: updatedBudget.categories.map(cat => ({
          id: cat.categoryId,
          name: cat.categoryName,
          allocatedAmount: cat.allocatedAmount,
          spentAmount: cat.spentAmount,
          remainingAmount: cat.remainingAmount,
          percentage: Math.round(cat.progressPercentage * 10) / 10
        }))
      };
    } catch (error) {
      console.error('Error updating budget:', error);
      return null;
    }
  },

  // Add new transaction
  addTransaction: async (
    transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'> & { userId: number }
  ): Promise<Transaction | null> => {
    try {
      const response = await transactionApi.createTransaction(transaction.userId, {
        transactionType: transaction.type === 'income' ? 'Income' : 'Expense',
        categoryId: transaction.categoryId,
        amount: transaction.amount,
        transactionDate: transaction.date,
        description: transaction.description,
        isRecurring: false
      });

      // If this transaction has budget impacts, try to refresh the affected budgets
      if (response.budgetImpacts && response.budgetImpacts.length > 0) {
        // Wait a moment to allow the backend to process the transaction
        setTimeout(async () => {
          try {
            // Refresh each affected budget
            for (const impact of response.budgetImpacts) {
              try {
                // Refresh the budget details
                await budgetApi.getBudgetDetails(impact.budgetId);
                
                // Refresh the expense breakdown
                await budgetApi.getExpenseBreakdown(impact.budgetId);
                
                // Refresh the budget transactions
                await budgetApi.getBudgetTransactions(impact.budgetId);
                
                // Refresh the period data
                await budgetApi.getBudgetPeriodData(impact.budgetId);
                
                console.log(`Refreshed budget ${impact.budgetId} after transaction impact`);
              } catch (err) {
                console.error(`Error refreshing budget ${impact.budgetId}:`, err);
              }
            }
          } catch (err) {
            console.error('Error refreshing budgets after transaction:', err);
          }
        }, 500);
      }

      return {
        id: response.transactionId,
        categoryId: response.categoryId,
        categoryName: response.categoryName,
        categoryIcon: transaction.categoryIcon, // Use original value since API doesn't return it
        date: response.transactionDate,
        description: response.description || '',
        amount: response.amount,
        type: response.transactionType.toLowerCase() as 'income' | 'expense',
        budgetId: transaction.budgetId,
        createdAt: new Date().toISOString(), // Set current timestamp since API doesn't return it
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return null;
    }
  },

  // Delete transaction
  deleteTransaction: async (transactionId: number): Promise<boolean> => {
    try {
      await transactionApi.deleteTransaction(transactionId);
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return false;
    }
  }
};

export default budgetService;