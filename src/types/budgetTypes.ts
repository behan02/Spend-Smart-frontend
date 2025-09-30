//budgetTypes.ts

// Budget Types

// Request DTOs
export interface CategoryAllocationDto {
  categoryId: number;
  allocatedAmount: number;
}

export interface CreateBudgetDto {
  budgetName: string;
  budgetType: 'Monthly' | 'Annually';
  startDate: string;
  description?: string;
  categoryAllocations: CategoryAllocationDto[];
}

export interface UpdateBudgetDto {
  budgetName: string;
  budgetType: 'Monthly' | 'Annually';
  startDate: string;
  description?: string;
  categoryAllocations: CategoryAllocationDto[];
}

// Response DTOs
export interface BudgetCategoryResponseDto {
  categoryId: number;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  progressPercentage: number;
}

export interface BudgetResponseDto {
  budgetId: number;
  budgetName: string;
  budgetType: string;
  startDate: string;
  endDate: string;
  totalBudgetAmount: number;
  totalSpentAmount: number;
  remainingAmount: number;
  description?: string;
  progressPercentage: number;
  daysRemaining: number;
  status: string;
  categories: BudgetCategoryResponseDto[];
}

export interface BudgetSummaryDto {
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

export interface ExpenseBreakdownDto {
  categoryId: number;
  categoryName: string;
  amount: number;
  percentage: number;
  color: string;
  icon: string;
}

export interface PeriodDataDto {
  date: string;
  amount: number;
  cumulativeAmount: number;
  budgetLimit: number;
}

export interface TransactionDto {
  transactionId: number;
  transactionType: string;
  categoryId: number;
  categoryName: string;
  categoryIcon?: string;
  categoryColor?: string;
  amount: number;
  transactionDate: string;
  description?: string;
  merchantName?: string;
  location?: string;
  tags?: string[];
  receiptUrl?: string;
  isRecurring: boolean;
  recurringFrequency?: string;
  recurringEndDate?: string;
  budgetImpacts: BudgetImpactDto[];
}

export interface BudgetImpactDto {
  budgetId: number;
  budgetName: string;
  categoryId: number;
  categoryName: string;
  impactAmount: number;
  impactType: string;
}

// Transaction Impact DTO
export interface TransactionImpactDto {
  transactionId: number;
  budgetId: number;
  categoryId: number;
  amount: number;
}
