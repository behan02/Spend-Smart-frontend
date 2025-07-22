import axios from 'axios';

const API_BASE_URL = 'https://localhost:7211/api';

export interface StoredReport {
  id: number;
  reportName: string;
  format: string;
  dateGenerated: string;
  startDate: string;
  endDate: string;
  firebaseUrl: string;
  description?: string;
  dateRange: string;
}

export interface StoreReportData {
  reportName: string;
  format: string;
  startDate: string;
  endDate: string;
  firebaseUrl: string;
  description?: string;
  userId: number;
}

// API client setup with error handling
const reportsApiClient = axios.create({
  baseURL: `${API_BASE_URL}/reports`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Add response interceptor for better error handling
reportsApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED') {
      console.warn('⚠️ Backend server not running - using mock data');
      return Promise.reject(new Error('Backend server not available'));
    }
    return Promise.reject(error);
  }
);

// Get stored reports for a user
export const getStoredReports = async (userId: number): Promise<StoredReport[]> => {
  try {
    console.log(`🔄 Fetching stored reports for user ${userId}...`);
    const response = await reportsApiClient.get(`/stored/${userId}`);
    console.log("✅ Stored reports fetched:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error fetching stored reports:", error);
    
    // Return mock data if backend is not available
    if (error.message?.includes('Backend server not available')) {
      console.log("📝 Returning mock data for testing");
      return [
        {
          id: 1,
          reportName: "Financial Report (2025-01-01 to 2025-01-31)",
          format: "PDF",
          dateGenerated: new Date().toISOString(),
          startDate: "2025-01-01",
          endDate: "2025-01-31",
          firebaseUrl: "https://mock-storage.example.com/reports/user_1/sample-report.pdf",
          description: "Mock report for testing",
          dateRange: "2025-01-01 to 2025-01-31"
        }
      ];
    }
    
    throw error;
  }
};

// Store a new report
export const storeReport = async (reportData: StoreReportData): Promise<any> => {
  try {
    console.log("🔄 Storing report to database...", reportData);
    const response = await reportsApiClient.post('/store', reportData);
    console.log("✅ Report stored successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error storing report:", error);
    
    // Mock success if backend is not available
    if (error.message?.includes('Backend server not available')) {
      console.log("📝 Mock report storage (backend not available)");
      return { 
        id: Date.now(), 
        message: "Report stored successfully (mock)", 
        reportName: reportData.reportName 
      };
    }
    
    throw error;
  }
};

// Delete a stored report
export const deleteStoredReport = async (reportId: number): Promise<void> => {
  try {
    console.log(`🔄 Deleting report ${reportId}...`);
    const response = await reportsApiClient.delete(`/${reportId}`);
    console.log("✅ Report deleted successfully:", response.data);
  } catch (error: any) {
    console.error("❌ Error deleting report:", error);
    
    // Mock success if backend is not available
    if (error.message?.includes('Backend server not available')) {
      console.log("📝 Mock report deletion (backend not available)");
      return;
    }
    
    throw error;
  }
};
