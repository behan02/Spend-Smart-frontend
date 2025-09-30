export interface Budget {
  id: number;
  name: string;
  type: 'monthly' | 'annually';
  startDate: string;
  categories: BudgetCategory[];
  totalAmount: number;
  spentAmount: number;
  remainingAmount: number;
  description?: string;
  progress: number;
  remainingDays?: number;
}

export interface BudgetCategory {
  id: number;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  icon?: string;
}

export interface BudgetFormData {
  name: string;
  type: 'monthly' | 'annually';
  startDate: string;
  selectedCategories: number[];
  categoryAmounts: { [key: number]: number };
  totalAmount: number;
  description?: string;
}