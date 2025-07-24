// Create this file in your Services folder: Services/feedbackService.ts

import axios from "axios";
import { getApiBaseUrl } from "../Utils/apiUtils";

const API_BASE_URL = getApiBaseUrl();

export interface FeedbackSubmission {
  userId: number;
  rating: number;
  comment: string;
  pageContext: string;
  timestamp: string;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  feedbackId?: number;
}

export interface UserFeedback {
  id: number;
  rating: number;
  comment: string;
  pageContext: string;
  submittedAt: string;
  isProcessed: boolean;
}

export interface FeedbackListResponse {
  feedbacks: UserFeedback[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

class FeedbackService {
  // Submit new feedback
  async submitFeedback(feedbackData: FeedbackSubmission): Promise<FeedbackResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/feedback/submit`, feedbackData);
      return response.data;
    } catch (error) {
      console.error("Error submitting feedback:", error);
      throw error;
    }
  }

  // Get user's feedback history
  async getUserFeedback(
    userId: number, 
    page: number = 1, 
    pageSize: number = 10
  ): Promise<FeedbackListResponse> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/feedback/user/${userId}?page=${page}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user feedback:", error);
      throw error;
    }
  }

  // ADMIN ONLY - Get all feedback with filters
  async getAllFeedback(
    page: number = 1,
    pageSize: number = 20,
    filters?: {
      minRating?: number;
      maxRating?: number;
      pageContext?: string;
    }
  ): Promise<FeedbackListResponse> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (filters?.minRating) params.append('minRating', filters.minRating.toString());
      if (filters?.maxRating) params.append('maxRating', filters.maxRating.toString());
      if (filters?.pageContext) params.append('pageContext', filters.pageContext);

      const response = await axios.get(`${API_BASE_URL}/feedback/all?${params}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all feedback:", error);
      throw error;
    }
  }

  // ADMIN ONLY - Mark feedback as processed
  async markFeedbackAsProcessed(feedbackId: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await axios.put(`${API_BASE_URL}/feedback/${feedbackId}/mark-processed`);
      return response.data;
    } catch (error) {
      console.error("Error marking feedback as processed:", error);
      throw error;
    }
  }
}

export const feedbackService = new FeedbackService();