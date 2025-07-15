import { Budget, Transaction, ExpenseBreakdown, PeriodData } from '../components/Budget/types/BudgetDetails';

// Mock data for demonstration
const mockBudgets: Budget[] = [
  {
    id: 1,
    name: 'January',
    type: 'monthly',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    totalAmount: 1458.30,
    spentAmount: 1458.30,
    remainingAmount: 0,
    progress: 100,
    description: 'Monthly budget for January 2025',
    status: 'active',
    categories: [
      {
        id: 1,
        name: 'Food',
        allocatedAmount: 720,
        spentAmount: 720,
        remainingAmount: 0,
        icon: '🍔',
        color: '#4CAF50',
        percentage: 49.4
      },
      {
        id: 2,
        name: 'Transportation',
        allocatedAmount: 200,
        spentAmount: 200,
        remainingAmount: 0,
        icon: '🚗',
        color: '#2196F3',
        percentage: 13.7
      },
      {
        id: 3,
        name: 'Healthcare',
        allocatedAmount: 120,
        spentAmount: 120,
        remainingAmount: 0,
        icon: '🏥',
        color: '#FF9800',
        percentage: 8.2
      },
      {
        id: 4,
        name: 'Education',
        allocatedAmount: 120,
        spentAmount: 120,
        remainingAmount: 0,
        icon: '🎓',
        color: '#F44336',
        percentage: 8.2
      },
      {
        id: 5,
        name: 'Clothes',
        allocatedAmount: 60,
        spentAmount: 60,
        remainingAmount: 0,
        icon: '👔',
        color: '#9C27B0',
        percentage: 4.1
      },
      {
        id: 6,
        name: 'Pets',
        allocatedAmount: 60,
        spentAmount: 60,
        remainingAmount: 0,
        icon: '🐾',
        color: '#607D8B',
        percentage: 4.1
      },
      {
        id: 7,
        name: 'Entertainment',
        allocatedAmount: 60,
        spentAmount: 60,
        remainingAmount: 0,
        icon: '🎬',
        color: '#795548',
        percentage: 4.1
      },
      {
        id: 8,
        name: 'Beauty',
        allocatedAmount: 60,
        spentAmount: 60,
        remainingAmount: 0,
        icon: '💄',
        color: '#009688',
        percentage: 4.1
      }
    ]
  }
];

const mockTransactions: Transaction[] = [
  {
    id: 1,
    categoryId: 8,
    categoryName: 'Beauty',
    categoryIcon: '💄',
    date: '2025-01-12',
    description: 'Grocery Items and Beverages soft drinks',
    amount: 32.50,
    type: 'expense',
    budgetId: 1,
    createdAt: '2025-01-12T10:30:00Z',
    updatedAt: '2025-01-12T10:30:00Z'
  },
  {
    id: 2,
    categoryId: 1,
    categoryName: 'Bits & Foods',
    categoryIcon: '🍔',
    date: '2025-01-12',
    description: 'Grocery Items and Beverages soft drinks',
    amount: 32.50,
    type: 'expense',
    budgetId: 1,
    createdAt: '2025-01-12T14:15:00Z',
    updatedAt: '2025-01-12T14:15:00Z'
  },
  {
    id: 3,
    categoryId: 1,
    categoryName: 'Gas',
    categoryIcon: '⛽',
    date: '2025-01-12',
    description: 'Grocery Items and Beverages soft drinks',
    amount: 32.50,
    type: 'expense',
    budgetId: 1,
    createdAt: '2025-01-12T16:45:00Z',
    updatedAt: '2025-01-12T16:45:00Z'
  },
  {
    id: 4,
    categoryId: 4,
    categoryName: 'Education',
    categoryIcon: '🎓',
    date: '2025-01-12',
    description: 'Grocery Items and Beverages soft drinks',
    amount: 32.50,
    type: 'expense',
    budgetId: 1,
    createdAt: '2025-01-12T18:20:00Z',
    updatedAt: '2025-01-12T18:20:00Z'
  },
  {
    id: 5,
    categoryId: 7,
    categoryName: 'Entertainment',
    categoryIcon: '🎬',
    date: '2025-01-12',
    description: 'Grocery Items and Beverages soft drinks',
    amount: 20.20,
    type: 'expense',
    budgetId: 1,
    createdAt: '2025-01-12T20:10:00Z',
    updatedAt: '2025-01-12T20:10:00Z'
  },
  {
    id: 6,
    categoryId: 8,
    categoryName: 'Beauty',
    categoryIcon: '💄',
    date: '2025-01-12',
    description: 'Grocery Items and Beverages soft drinks',
    amount: 32.00,
    type: 'expense',
    budgetId: 1,
    createdAt: '2025-01-12T21:30:00Z',
    updatedAt: '2025-01-12T21:30:00Z'
  }
];

const mockPeriodData: PeriodData[] = [
  { date: '4 Jan', amount: 100, cumulativeAmount: 100, budgetLimit: 1458.30 },
  { date: '5 Jan', amount: 120, cumulativeAmount: 220, budgetLimit: 1458.30 },
  { date: '6 Jan', amount: 80, cumulativeAmount: 300, budgetLimit: 1458.30 },
  { date: '7 Jan', amount: 150, cumulativeAmount: 450, budgetLimit: 1458.30 },
  { date: '8 Jan', amount: 90, cumulativeAmount: 540, budgetLimit: 1458.30 },
  { date: '9 Jan', amount: 200, cumulativeAmount: 740, budgetLimit: 1458.30 },
  { date: '10 Jan', amount: 110, cumulativeAmount: 850, budgetLimit: 1458.30 },
  { date: '11 Jan', amount: 130, cumulativeAmount: 980, budgetLimit: 1458.30 },
  { date: '12 Jan', amount: 160, cumulativeAmount: 1140, budgetLimit: 1458.30 },
  { date: '13 Jan', amount: 140, cumulativeAmount: 1280, budgetLimit: 1458.30 },
  { date: '14 Jan', amount: 180, cumulativeAmount: 1460, budgetLimit: 1458.30 },
  { date: '15 Jan', amount: 200, cumulativeAmount: 1660, budgetLimit: 1458.30 }
];

// Service functions
export const budgetService = {
  // Get budget by ID
  getBudgetById: async (budgetId: string): Promise<Budget | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const budget = mockBudgets.find(b => b.id === parseInt(budgetId));
        resolve(budget || null);
      }, 500);
    });
  },

  // Get transactions for a budget
  getTransactionsByBudgetId: async (budgetId: string): Promise<Transaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactions = mockTransactions.filter(t => t.budgetId === parseInt(budgetId));
        resolve(transactions);
      }, 300);
    });
  },

  // Get expense breakdown for a budget
  getExpenseBreakdown: async (budgetId: string): Promise<ExpenseBreakdown[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const budget = mockBudgets.find(b => b.id === parseInt(budgetId));
        if (!budget) {
          resolve([]);
          return;
        }

        const breakdown: ExpenseBreakdown[] = budget.categories.map(category => ({
          id: category.id,
          label: category.name,
          value: category.spentAmount,
          percentage: category.percentage || 0,
          color: category.color || '#666',
          icon: category.icon
        }));

        resolve(breakdown);
      }, 300);
    });
  },

  // Get period data for budget chart
  getPeriodData: async (_budgetId: string): Promise<PeriodData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPeriodData);
      }, 300);
    });
  },

  // Update budget
  updateBudget: async (budgetId: string, updates: Partial<Budget>): Promise<Budget | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const budgetIndex = mockBudgets.findIndex(b => b.id === parseInt(budgetId));
        if (budgetIndex === -1) {
          resolve(null);
          return;
        }

        mockBudgets[budgetIndex] = { ...mockBudgets[budgetIndex], ...updates };
        resolve(mockBudgets[budgetIndex]);
      }, 500);
    });
  },

  // Add new transaction
  addTransaction: async (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Promise<Transaction> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTransaction: Transaction = {
          ...transaction,
          id: mockTransactions.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        mockTransactions.push(newTransaction);
        
        // Update budget spent amount
        const budget = mockBudgets.find(b => b.id === transaction.budgetId);
        if (budget && transaction.type === 'expense') {
          budget.spentAmount += transaction.amount;
          budget.remainingAmount = budget.totalAmount - budget.spentAmount;
          budget.progress = (budget.spentAmount / budget.totalAmount) * 100;
          
          // Update category spent amount
          const category = budget.categories.find(c => c.id === transaction.categoryId);
          if (category) {
            category.spentAmount += transaction.amount;
            category.remainingAmount = category.allocatedAmount - category.spentAmount;
            category.percentage = (category.spentAmount / budget.totalAmount) * 100;
          }
        }
        
        resolve(newTransaction);
      }, 500);
    });
  },

  // Delete transaction
  deleteTransaction: async (transactionId: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transactionIndex = mockTransactions.findIndex(t => t.id === transactionId);
        if (transactionIndex === -1) {
          resolve(false);
          return;
        }

        const transaction = mockTransactions[transactionIndex];
        mockTransactions.splice(transactionIndex, 1);

        // Update budget spent amount
        const budget = mockBudgets.find(b => b.id === transaction.budgetId);
        if (budget && transaction.type === 'expense') {
          budget.spentAmount -= transaction.amount;
          budget.remainingAmount = budget.totalAmount - budget.spentAmount;
          budget.progress = (budget.spentAmount / budget.totalAmount) * 100;
          
          // Update category spent amount
          const category = budget.categories.find(c => c.id === transaction.categoryId);
          if (category) {
            category.spentAmount -= transaction.amount;
            category.remainingAmount = category.allocatedAmount - category.spentAmount;
            category.percentage = (category.spentAmount / budget.totalAmount) * 100;
          }
        }

        resolve(true);
      }, 300);
    });
  }
};

export default budgetService;
