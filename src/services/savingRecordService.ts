import axios from 'axios';

// Define your API base URL
const API_BASE_URL = 'http://localhost:5110/api'; // Match your backend port

// Define SavingRecord interface matching the backend model
export interface SavingRecord {
  id: number;
  amount: number;
  date: string; // ISO date string from API
  time: string; // Time string from API
  description?: string;
  goalId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// Create Form Data interface for creating saving records
export interface SavingRecordFormData {
  amount: number;
  date: string; // ISO date string
  description?: string;
  goalId: number;
  userId?: number;
}

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// SavingRecord service methods
export const savingRecordService = {
  // Get all saving records
  getAll: async (): Promise<SavingRecord[]> => {
    const response = await apiClient.get<SavingRecord[]>('/SavingRecords');
    return response.data;
  },

  // Get saving record by id
  getById: async (id: number): Promise<SavingRecord> => {
    const response = await apiClient.get<SavingRecord>(`/SavingRecords/${id}`);
    return response.data;
  },

  // Get saving records by goal id
  getByGoalId: async (goalId: number): Promise<SavingRecord[]> => {
    const response = await apiClient.get<SavingRecord[]>(`/SavingRecords/goal/${goalId}`);
    return response.data;
  },

  // Create new saving record
  create: async (recordData: SavingRecordFormData): Promise<SavingRecord> => {
    console.log('Creating saving record:', recordData);
    
    // Format the data for the API - backend expects single DateTime
    const createData = {
      amount: recordData.amount,
      date: recordData.date, // Should be ISO string that backend can parse as DateTime
      description: recordData.description || '',
      goalId: recordData.goalId,
      userId: recordData.userId || 1 // Default to user 1 for now
    };

    const response = await apiClient.post<SavingRecord>('/SavingRecords', createData);
    return response.data;
  },

  // Update saving record
  update: async (id: number, recordData: Partial<SavingRecordFormData>): Promise<SavingRecord> => {
    const response = await apiClient.put<SavingRecord>(`/SavingRecords/${id}`, recordData);
    return response.data;
  },

  // Delete saving record
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/SavingRecords/${id}`);
  }
};