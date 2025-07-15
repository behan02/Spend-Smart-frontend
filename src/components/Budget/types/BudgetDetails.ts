export interface Budget {
  id: number;
  name: string;
  type: 'monthly' | 'annually';
  startDate: string;
  endDate?: string;
  totalAmount: number;
  spentAmount: number;
  remainingAmount: number;
  progress: number;
  categories: BudgetCategory[];
  description?: string;
  status: 'active' | 'completed' | 'exceeded';
}

export interface BudgetCategory {
  id: number;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  icon?: string;
  color?: string;
  percentage?: number;
}

export interface Transaction {
  id: number;
  categoryId: number;
  categoryName: string;
  categoryIcon?: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  budgetId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseBreakdown {
  id: number;
  label: string;
  value: number;
  percentage: number;
  color: string;
  icon?: string;
}

export interface PeriodData {
  date: string;
  amount: number;
  cumulativeAmount: number;
  budgetLimit: number;
}

export interface BudgetProgressData {
  spent: number;
  budget: number;
  remaining: number;
  progressPercentage: number;
  status: 'on-track' | 'warning' | 'exceeded';
}