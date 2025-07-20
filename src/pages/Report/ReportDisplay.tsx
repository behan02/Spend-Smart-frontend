import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  Alert,
  Paper,
} from "@mui/material";
import Cards from "../../components/ReportComponents/Cards";
import PieChart from "../../components/ReportComponents/PieChart";
import BarGraph from "../../components/ReportComponents/BarGraph";
import SavingsGrowthChart from "../../components/ReportComponents/SavingsgrowthChart";
import ReportGoal from "../../components/ReportComponents/Reportgoal/reportgoal";
import BasicTable from "../../components/ReportComponents/Reporttable/transactiontable";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// API Configuration
const API_BASE_URL = "https://localhost:7211/api";

// API Client Setup
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Add response interceptor for detailed error logging
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Response Success:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("❌ API Error Details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

// Types
interface ReportRequest {
  startDate: string;
  endDate: string;
  userId: number;
}

interface ReportData {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  budgetUtilization: number;
  categoryBreakdown: Record<string, number>;
  monthlyData: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  goals: Array<{
    goalName: string;
    progressPercentage: number;
    currentAmount: number;
    targetAmount: number;
    targetDate?: string;
  }>;
  transactions: Array<{
    id: number;
    date: string;
    category: string;
    amount: number;
    type: string;
    description?: string;
  }>;
  savingsGrowthOverTime?: Array<{
    month: string;
    monthlySavings: number;
    cumulativeSavings: number;
    income: number;
    expenses: number;
    savingsRate: number;
    monthDate: string;
  }>;
}

interface ReportDisplayProps {
  startDate: string;
  endDate: string;
}

function ReportDisplay({ startDate, endDate }: ReportDisplayProps) {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<string>("PDF");

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // API Functions
  const generateReport = async (
    request: ReportRequest
  ): Promise<ReportData> => {
    try {
      console.log("🚀 Sending report request:", request);

      const response = await apiClient.post("/Reports/generate", request);

      console.log("📊 Report response received:", response.data);

      // Validate response data structure
      if (!response.data) {
        throw new Error("No data received from server");
      }

      return response.data;
    } catch (error: any) {
      console.error("💥 Error generating report:", error);

      if (error.response) {
        // Server responded with an error
        const status = error.response.status;
        const message =
          error.response.data?.message ||
          error.response.statusText ||
          "Unknown server error";

        if (status === 404) {
          throw new Error(
            "Report endpoint not found. Check if the backend route is correct."
          );
        } else if (status === 400) {
          throw new Error(`Bad Request: ${message}`);
        } else if (status === 500) {
          throw new Error(`Server Error: ${message}`);
        } else {
          throw new Error(`Server Error (${status}): ${message}`);
        }
      } else if (error.request) {
        // Request was made but no response received
        throw new Error(
          "No response from server. Please check if the backend is running on https://localhost:7211"
        );
      } else {
        // Something else happened
        throw new Error(`Request setup error: ${error.message}`);
      }
    }
  };

  const testConnection = async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      console.log("🔌 Testing API connection...");
      const response = await apiClient.get("/Reports/test");
      console.log("✅ Connection test successful:", response.data);
      return {
        success: true,
        message: response.data.message || "API connection successful",
      };
    } catch (error: any) {
      console.error("❌ Connection test failed:", error);

      let message = "Connection failed";
      if (error.code === "ECONNREFUSED") {
        message = "Connection refused. Backend server is not running.";
      } else if (error.response?.status) {
        message = `Server returned status ${error.response.status}`;
      } else if (error.request) {
        message =
          "Network error. Check if backend is running on https://localhost:7211";
      }

      return {
        success: false,
        message,
      };
    }
  };

  // Get test user ID
  const getTestUserId = (): number => {
    const storedUserId = localStorage.getItem("testUserId");
    return storedUserId ? parseInt(storedUserId) : 1;
  };

  useEffect(() => {
    const loadReport = async () => {
      try {
        setLoading(true);
        setError(null);

        // Validate input dates
        if (!startDate || !endDate) {
          throw new Error("Start date and end date are required");
        }

        // Get test user ID
        const userId = getTestUserId();
        console.log("📅 Loading report with parameters:", {
          startDate,
          endDate,
          userId,
        });

        // Test API connection first
        console.log("🔍 Testing API connection before generating report...");
        const connectionTest = await testConnection();
        if (!connectionTest.success) {
          throw new Error(`Connection test failed: ${connectionTest.message}`);
        }

        // Generate report with real data
        console.log("📈 Connection successful, generating report...");
        const reportResult = await generateReport({
          startDate,
          endDate,
          userId,
        });

        // Validate the received data
        if (!reportResult) {
          throw new Error("No report data received from server");
        }

        console.log("✅ Report data successfully loaded:", reportResult);
        setReportData(reportResult);

        // Check if report has no data
        if (
          reportResult.transactions &&
          reportResult.transactions.length === 0
        ) {
          console.warn("⚠️ No transactions found for the selected date range");
        }
      } catch (error: any) {
        console.error("💥 Report loading failed:", error);
        setError(error.message);
        setReportData(null); // Clear any existing data
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [startDate, endDate]);

  // CSV Download Function
  const downloadCSV = () => {
    try {
      let csvContent = "data:text/csv;charset=utf-8,";

      // Add header information
      csvContent += "SpendSmart Financial Report\n";
      csvContent += `Period,${startDate} to ${endDate}\n`;
      csvContent += `Generated On,${new Date().toLocaleDateString()}\n`;
      csvContent += `User ID,${getTestUserId()}\n\n`;

      // Financial Summary
      csvContent += "FINANCIAL SUMMARY\n";
      csvContent += "Metric,Amount\n";
      csvContent += `Total Income,${reportData.totalIncome}\n`;
      csvContent += `Total Expenses,${reportData.totalExpenses}\n`;
      csvContent += `Total Savings,${reportData.totalSavings}\n`;
      csvContent += `Budget Utilization,${reportData.budgetUtilization}%\n\n`;

      // Category Breakdown
      if (hasCategories) {
        csvContent += "EXPENSE BREAKDOWN BY CATEGORY\n";
        csvContent += "Category,Amount,Percentage of Total Expenses\n";
        Object.entries(reportData.categoryBreakdown)
          .sort(([, a], [, b]) => b - a)
          .forEach(([category, amount]) => {
            const percentage = (
              (amount / reportData.totalExpenses) *
              100
            ).toFixed(1);
            csvContent += `${category},${amount},${percentage}%\n`;
          });
        csvContent += "\n";
      }

      // Monthly Data
      if (hasMonthlyData) {
        csvContent += "MONTHLY INCOME VS EXPENSES\n";
        csvContent += "Month,Income,Expenses,Net Savings\n";
        reportData.monthlyData.forEach((month) => {
          const netSavings = month.income - month.expenses;
          csvContent += `${month.month},${month.income},${month.expenses},${netSavings}\n`;
        });
        csvContent += "\n";
      }

      // ADD SAVINGS GROWTH SECTION
      if (hasSavingsGrowthData) {
        csvContent += "SAVINGS GROWTH OVER TIME\n";
        csvContent +=
          "Month,Monthly Savings,Cumulative Savings,Income,Expenses,Savings Rate %\n";
        reportData.savingsGrowthOverTime.forEach((item) => {
          csvContent += `${item.month},${item.monthlySavings},${
            item.cumulativeSavings
          },${item.income},${item.expenses},${item.savingsRate.toFixed(1)}%\n`;
        });
        csvContent += "\n";
      }

      // Goals Progress
      if (reportData.goals && reportData.goals.length > 0) {
        csvContent += "GOALS PROGRESS\n";
        csvContent +=
          "Goal Name,Current Amount,Target Amount,Progress Percentage,Target Date,Amount Remaining\n";
        reportData.goals.forEach((goal) => {
          const remaining = goal.targetAmount - goal.currentAmount;
          csvContent += `"${goal.goalName}",${goal.currentAmount},${
            goal.targetAmount
          },${goal.progressPercentage}%,${
            goal.targetDate || "Not set"
          },${remaining}\n`;
        });
        csvContent += "\n";
      }

      // Transactions
      if (hasTransactions) {
        csvContent += "TRANSACTION DETAILS\n";
        csvContent += "Date,Category,Description,Amount,Type\n";
        reportData.transactions.forEach((transaction) => {
          const description = (transaction.description || "").replace(
            /"/g,
            '""'
          ); // Escape quotes
          csvContent += `${transaction.date},${transaction.category},"${description}",${transaction.amount},${transaction.type}\n`;
        });
      }

      // Create and trigger download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `SpendSmart-Report-${startDate}-to-${endDate}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("✅ CSV download completed successfully");
    } catch (error) {
      console.error("❌ Error generating CSV:", error);
      alert("Failed to generate CSV file. Please try again.");
    }
  };

  // Enhanced Visual PDF Download Function
  const downloadVisualPDF = async () => {
    try {
      console.log("🔄 Starting visual PDF generation...");

      // Show loading state
      const loadingElement = document.createElement("div");
      loadingElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 20px;
      border-radius: 8px;
      z-index: 10000;
      font-size: 16px;
    `;
      loadingElement.textContent = "Generating PDF...";
      document.body.appendChild(loadingElement);

      // Find the main report container (adjust selector as needed)
      const reportElement =
        document.querySelector("[data-report-container]") ||
        document.querySelector("main") ||
        document.querySelector(".MuiBox-root[sx]") ||
        document.body;

      // Temporarily hide the export section during capture
      const exportSection = document
        .querySelector(".download-btn")
        ?.closest(".MuiBox-root");
      const originalDisplay = exportSection?.style.display;
      if (exportSection) {
        exportSection.style.display = "none";
      }

      // Configure html2canvas options for better quality
      const canvas = await html2canvas(reportElement, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: reportElement.offsetWidth,
        height: reportElement.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });

      // Restore export section visibility
      if (exportSection && originalDisplay !== undefined) {
        exportSection.style.display = originalDisplay;
      }

      // Create PDF with the captured image
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      // Add the image to PDF
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // Save the PDF
      pdf.save(`SpendSmart-Visual-Report-${startDate}-to-${endDate}.pdf`);

      // Remove loading element
      document.body.removeChild(loadingElement);

      console.log("✅ Visual PDF generated successfully");
      return true;
    } catch (error) {
      console.error("❌ Error generating visual PDF:", error);

      // Remove loading element if it exists
      const loadingElement = document.querySelector(
        '[style*="position: fixed"]'
      );
      if (loadingElement && document.body.contains(loadingElement)) {
        document.body.removeChild(loadingElement);
      }

      alert("Failed to generate visual PDF: " + error.message);
      return false;
    }
  };

  // Alternative method using a specific container
  const downloadReportContainerPDF = async () => {
    try {
      console.log("🔄 Starting container-based PDF generation...");

      // Create a temporary container with just the report content
      const tempContainer = document.createElement("div");
      tempContainer.style.cssText = `
      position: absolute;
      top: -10000px;
      left: -10000px;
      width: 1200px;
      background: white;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

      // Clone the report content (exclude sidebar and export buttons)
      const mainContent =
        document.querySelector("[data-report-container]") ||
        document.querySelector(".MuiGrid-container") ||
        document.querySelector(".MuiBox-root[sx]");

      if (mainContent) {
        const clonedContent = mainContent.cloneNode(true);

        // Remove export section from clone
        const exportSection = clonedContent
          .querySelector(".download-btn")
          ?.closest(".MuiBox-root");
        if (exportSection) {
          exportSection.remove();
        }

        tempContainer.appendChild(clonedContent);
        document.body.appendChild(tempContainer);

        // Capture the temporary container
        const canvas = await html2canvas(tempContainer, {
          scale: 2,
          backgroundColor: "#ffffff",
          width: 1200,
          height: tempContainer.scrollHeight,
          useCORS: true,
          allowTaint: true,
        });

        // Remove temporary container
        document.body.removeChild(tempContainer);

        // Create and download PDF
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("portrait", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`SpendSmart-Report-${startDate}-to-${endDate}.pdf`);

        console.log("✅ Container-based PDF generated successfully");
        return true;
      } else {
        throw new Error("Could not find report content to capture");
      }
    } catch (error) {
      console.error("❌ Error in container-based PDF generation:", error);
      alert("Failed to generate PDF: " + error.message);
      return false;
    }
  };

  // PDF Download Function (requires jspdf and html2canvas)
  const downloadSimplePDF = () => {
    try {
      console.log("🔄 Starting PDF generation...");

      const pdf = new jsPDF();

      // Title
      pdf.setFontSize(20);
      pdf.setTextColor(25, 118, 210); // Blue color
      pdf.text("SpendSmart Financial Report", 105, 20, { align: "center" });

      // Date range
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100); // Gray color
      pdf.text(`Period: ${startDate} to ${endDate}`, 105, 35, {
        align: "center",
      });
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 45, {
        align: "center",
      });
      pdf.text(`User ID: ${getTestUserId()}`, 105, 55, { align: "center" });

      let yPos = 70;

      // Financial Summary
      pdf.setFontSize(16);
      pdf.setTextColor(25, 118, 210);
      pdf.text("📊 Financial Summary", 20, yPos);
      yPos += 15;

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      // Create a summary box
      pdf.rect(20, yPos - 5, 170, 50); // Draw border

      pdf.text(
        `💰 Total Income: ${formatCurrency(reportData.totalIncome)}`,
        25,
        yPos + 5
      );
      pdf.text(
        `💸 Total Expenses: ${formatCurrency(reportData.totalExpenses)}`,
        25,
        yPos + 15
      );
      pdf.text(
        `🏦 Net Savings: ${formatCurrency(reportData.totalSavings)}`,
        25,
        yPos + 25
      );
      pdf.text(
        `📈 Budget Utilization: ${reportData.budgetUtilization.toFixed(1)}%`,
        25,
        yPos + 35
      );

      yPos += 60;

      // Category Breakdown
      if (hasCategories) {
        pdf.setFontSize(16);
        pdf.setTextColor(25, 118, 210);
        pdf.text("🏷️ Expense Breakdown", 20, yPos);
        yPos += 15;

        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);

        Object.entries(reportData.categoryBreakdown)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 8)
          .forEach(([category, amount]) => {
            const percentage = (
              (amount / reportData.totalExpenses) *
              100
            ).toFixed(1);
            pdf.text(
              `• ${category}: ${formatCurrency(amount)} (${percentage}%)`,
              25,
              yPos
            );
            yPos += 8;
          });
        yPos += 10;
      }

      // ADD SAVINGS GROWTH SECTION
      if (hasSavingsGrowthData) {
        if (yPos > 160) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFontSize(16);
        pdf.setTextColor(25, 118, 210);
        pdf.text("💰 Savings Growth Trend", 20, yPos);
        yPos += 15;

        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);

        const totalSavings =
          reportData.savingsGrowthOverTime[
            reportData.savingsGrowthOverTime.length - 1
          ]?.cumulativeSavings || 0;
        const avgMonthlySavings =
          reportData.savingsGrowthOverTime.reduce(
            (sum, item) => sum + item.monthlySavings,
            0
          ) / reportData.savingsGrowthOverTime.length;
        const avgSavingsRate =
          reportData.savingsGrowthOverTime.reduce(
            (sum, item) => sum + item.savingsRate,
            0
          ) / reportData.savingsGrowthOverTime.length;
        const positiveMonths = reportData.savingsGrowthOverTime.filter(
          (item) => item.monthlySavings > 0
        ).length;

        pdf.text(
          `Total Accumulated Savings: ${formatCurrency(totalSavings)}`,
          25,
          yPos
        );
        yPos += 8;
        pdf.text(
          `Average Monthly Savings: ${formatCurrency(avgMonthlySavings)}`,
          25,
          yPos
        );
        yPos += 8;
        pdf.text(
          `Average Savings Rate: ${avgSavingsRate.toFixed(1)}%`,
          25,
          yPos
        );
        yPos += 8;
        pdf.text(
          `Positive Savings Months: ${positiveMonths}/${reportData.savingsGrowthOverTime.length}`,
          25,
          yPos
        );
        yPos += 8;

        // Show recent months savings
        pdf.text("Recent Monthly Performance:", 25, yPos);
        yPos += 8;
        reportData.savingsGrowthOverTime.slice(-6).forEach((item) => {
          const sign = item.monthlySavings >= 0 ? "+" : "";
          pdf.text(
            `${item.month}: ${sign}${formatCurrency(
              item.monthlySavings
            )} (${item.savingsRate.toFixed(1)}%)`,
            25,
            yPos
          );
          yPos += 6;
        });
        yPos += 10;
      }

      // Goals Progress
      if (reportData.goals && reportData.goals.length > 0) {
        if (yPos > 200) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFontSize(16);
        pdf.setTextColor(25, 118, 210);
        pdf.text("🎯 Goals Progress", 20, yPos);
        yPos += 15;

        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 0);

        reportData.goals.slice(0, 5).forEach((goal) => {
          pdf.text(`${goal.goalName}`, 25, yPos);
          yPos += 6;
          pdf.text(
            `  Progress: ${goal.progressPercentage.toFixed(1)}% completed`,
            25,
            yPos
          );
          yPos += 6;
          pdf.text(
            `  Saved: ${formatCurrency(
              goal.currentAmount
            )} / Target: ${formatCurrency(goal.targetAmount)}`,
            25,
            yPos
          );
          if (goal.targetDate) {
            yPos += 6;
            pdf.text(
              `  Target Date: ${new Date(
                goal.targetDate
              ).toLocaleDateString()}`,
              25,
              yPos
            );
          }
          yPos += 12;
        });
      }

      // Transactions
      if (hasTransactions) {
        if (yPos > 150) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFontSize(16);
        pdf.setTextColor(25, 118, 210);
        pdf.text("📋 Recent Transactions", 20, yPos);
        yPos += 15;

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);

        // Table headers
        pdf.text("Date", 25, yPos);
        pdf.text("Category", 60, yPos);
        pdf.text("Amount", 120, yPos);
        pdf.text("Type", 160, yPos);
        yPos += 8;

        // Draw line under headers
        pdf.line(20, yPos - 2, 190, yPos - 2);

        reportData.transactions.slice(0, 15).forEach((transaction) => {
          pdf.text(transaction.date, 25, yPos);
          pdf.text(transaction.category.substring(0, 15), 60, yPos); // Truncate long category names
          pdf.text(formatCurrency(transaction.amount), 120, yPos);
          pdf.text(transaction.type, 160, yPos);
          yPos += 6;

          if (yPos > 280) {
            pdf.addPage();
            yPos = 20;
          }
        });

        if (reportData.transactions.length > 15) {
          yPos += 5;
          pdf.setFontSize(8);
          pdf.setTextColor(100, 100, 100);
          pdf.text(
            `... and ${reportData.transactions.length - 15} more transactions`,
            25,
            yPos
          );
        }
      }

      // Footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`SpendSmart Report - Page ${i} of ${pageCount}`, 105, 290, {
          align: "center",
        });
      }

      console.log("📄 PDF generated, initiating download...");

      // Generate the PDF as a blob
      const pdfOutput = pdf.output("blob");

      // Create download link
      const url = URL.createObjectURL(pdfOutput);
      const link = document.createElement("a");
      link.href = url;
      link.download = `SpendSmart-Report-${startDate}-to-${endDate}.pdf`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

      console.log("✅ PDF download initiated successfully");
      return true;
    } catch (error) {
      console.error("❌ Error generating PDF:", error);
      alert("PDF generation failed: " + error.message);
      return false;
    }
  };

  const downloadPDFDataURI = () => {
    try {
      console.log("🔄 Starting PDF generation (DataURI method)...");

      const pdf = new jsPDF();

      // Title
      pdf.setFontSize(20);
      pdf.setTextColor(25, 118, 210);
      pdf.text("SpendSmart Financial Report", 105, 20, { align: "center" });

      // Date range
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Period: ${startDate} to ${endDate}`, 105, 35, {
        align: "center",
      });
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 45, {
        align: "center",
      });

      let yPos = 65;

      // Financial Summary
      pdf.setFontSize(14);
      pdf.setTextColor(25, 118, 210);
      pdf.text("Financial Summary", 20, yPos);
      yPos += 12;

      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text(
        `Total Income: ${formatCurrency(reportData.totalIncome)}`,
        25,
        yPos
      );
      yPos += 8;
      pdf.text(
        `Total Expenses: ${formatCurrency(reportData.totalExpenses)}`,
        25,
        yPos
      );
      yPos += 8;
      pdf.text(
        `Net Savings: ${formatCurrency(reportData.totalSavings)}`,
        25,
        yPos
      );
      yPos += 8;
      pdf.text(
        `Budget Utilization: ${reportData.budgetUtilization.toFixed(1)}%`,
        25,
        yPos
      );
      yPos += 15;

      // Category Breakdown
      if (hasCategories) {
        pdf.setFontSize(14);
        pdf.setTextColor(25, 118, 210);
        pdf.text("Expense Categories", 20, yPos);
        yPos += 12;

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);

        Object.entries(reportData.categoryBreakdown)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .forEach(([category, amount]) => {
            const percentage = (
              (amount / reportData.totalExpenses) *
              100
            ).toFixed(1);
            pdf.text(
              `${category}: ${formatCurrency(amount)} (${percentage}%)`,
              25,
              yPos
            );
            yPos += 6;
          });
        yPos += 10;
      }

      // ADD SAVINGS GROWTH SUMMARY
      if (hasSavingsGrowthData) {
        if (yPos > 200) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFontSize(14);
        pdf.setTextColor(25, 118, 210);
        pdf.text("Savings Growth Summary", 20, yPos);
        yPos += 12;

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);

        const totalSavings =
          reportData.savingsGrowthOverTime[
            reportData.savingsGrowthOverTime.length - 1
          ]?.cumulativeSavings || 0;
        const avgMonthlySavings =
          reportData.savingsGrowthOverTime.reduce(
            (sum, item) => sum + item.monthlySavings,
            0
          ) / reportData.savingsGrowthOverTime.length;
        const avgSavingsRate =
          reportData.savingsGrowthOverTime.reduce(
            (sum, item) => sum + item.savingsRate,
            0
          ) / reportData.savingsGrowthOverTime.length;

        pdf.text(`Total Savings: ${formatCurrency(totalSavings)}`, 25, yPos);
        yPos += 6;
        pdf.text(`Avg Monthly: ${formatCurrency(avgMonthlySavings)}`, 25, yPos);
        yPos += 6;
        pdf.text(`Avg Rate: ${avgSavingsRate.toFixed(1)}%`, 25, yPos);
        yPos += 10;
      }

      // Goals
      if (reportData.goals && reportData.goals.length > 0) {
        if (yPos > 220) {
          pdf.addPage();
          yPos = 20;
        }

        pdf.setFontSize(14);
        pdf.setTextColor(25, 118, 210);
        pdf.text("Goals Progress", 20, yPos);
        yPos += 12;

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);

        reportData.goals.slice(0, 6).forEach((goal) => {
          pdf.text(
            `${goal.goalName}: ${goal.progressPercentage.toFixed(1)}%`,
            25,
            yPos
          );
          yPos += 5;
          pdf.text(
            `  ${formatCurrency(goal.currentAmount)} / ${formatCurrency(
              goal.targetAmount
            )}`,
            25,
            yPos
          );
          yPos += 8;
        });
      }

      // Generate dataURI and download
      const dataURI = pdf.output("datauristring");

      // Create download link
      const link = document.createElement("a");
      link.href = dataURI;
      link.download = `SpendSmart-Report-${startDate}-to-${endDate}.pdf`;

      // Force download
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("✅ PDF download completed (DataURI method)");
      return true;
    } catch (error) {
      console.error("❌ Error generating PDF (DataURI):", error);
      return false;
    }
  };

  // Enhanced Main export handler
  const handleExportReport = async () => {
    try {
      if (!reportData) {
        alert("No report data available to export");
        return;
      }

      console.log(`📥 Exporting report as ${exportFormat}...`);
      let success = false;

      switch (exportFormat) {
        case "PDF":
          // Try visual capture first
          success = await downloadVisualPDF();

          // If visual capture fails, try container method
          if (!success) {
            console.log("🔄 Trying container-based PDF method...");
            success = await downloadReportContainerPDF();
          }

          // If both visual methods fail, fall back to text-based PDF
          if (!success) {
            console.log("🔄 Falling back to text-based PDF...");
            success = downloadSimplePDF();
          }

          // If all methods fail, try basic jsPDF save
          if (!success) {
            console.log("🔄 Trying basic PDF save...");
            try {
              const pdf = new jsPDF();
              pdf.text("SpendSmart Financial Report", 20, 20);
              pdf.text(`Period: ${startDate} to ${endDate}`, 20, 30);
              pdf.text(
                `Total Income: ${formatCurrency(reportData.totalIncome)}`,
                20,
                40
              );
              pdf.text(
                `Total Expenses: ${formatCurrency(reportData.totalExpenses)}`,
                20,
                50
              );
              pdf.save(`SpendSmart-Report-${startDate}-to-${endDate}.pdf`);
              success = true;
            } catch (e) {
              console.error("Basic PDF save also failed:", e);
            }
          }
          break;

        case "CSV":
          downloadCSV();
          success = true;
          break;

        case "Excel":
          downloadCSV();
          success = true;
          break;

        default:
          alert("Unsupported export format selected");
          return;
      }

      // Only show success notification if download actually worked
      if (success) {
        setTimeout(() => {
          const notification = document.createElement("div");
          notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4caf50;
          color: white;
          padding: 12px 20px;
          border-radius: 4px;
          z-index: 9999;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
          notification.textContent = `${exportFormat} downloaded successfully!`;
          document.body.appendChild(notification);

          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 3000);
        }, 500);
      } else if (exportFormat === "PDF") {
        alert(
          "PDF download failed. Please check your browser settings and try again."
        );
      }
    } catch (error) {
      console.error("💥 Export error:", error);
      alert(`Export failed: ${error.message}`);
    }
  };

  const handleRetry = () => {
    console.log("🔄 Retrying report generation...");
    window.location.reload();
  };

  const handleTestConnection = async () => {
    try {
      const result = await testConnection();
      alert(result.success ? `✅ ${result.message}` : `❌ ${result.message}`);
    } catch (error) {
      alert("❌ Connection test failed");
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress size={60} />
        <Typography sx={{ mt: 2 }}>Loading your financial report...</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Fetching data from {startDate} to {endDate}
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 1 }}>
          User ID: {getTestUserId()}
        </Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          gap: 2,
          p: 3,
        }}
      >
        <Alert severity="error" sx={{ maxWidth: "600px" }}>
          <Typography variant="h6">Report Generation Failed</Typography>
          <Typography sx={{ mt: 1, mb: 2 }}>{error}</Typography>
          <Typography variant="body2" color="text.secondary">
            Parameters: User ID {getTestUserId()}, {startDate} to {endDate}
          </Typography>
        </Alert>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={handleRetry}>
            Retry
          </Button>
          <Button variant="outlined" onClick={handleTestConnection}>
            Test Connection
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", maxWidth: "500px" }}
        >
          Troubleshooting steps:
          <br />• Ensure backend is running on https://localhost:7211
          <br />• Check if user ID {getTestUserId()} exists in database
          <br />• Verify date range has transaction data
        </Typography>
      </Box>
    );
  }

  // No data state
  if (!reportData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          gap: 2,
        }}
      >
        <Typography variant="h6">No Report Data</Typography>
        <Typography color="text.secondary">
          No data received from the server for the selected date range.
        </Typography>
        <Button variant="outlined" onClick={handleRetry}>
          Try Again
        </Button>
      </Box>
    );
  }

  // Check if report has empty data
  const hasTransactions =
    reportData.transactions && reportData.transactions.length > 0;
  const hasCategories =
    reportData.categoryBreakdown &&
    Object.keys(reportData.categoryBreakdown).length > 0;
  const hasMonthlyData =
    reportData.monthlyData && reportData.monthlyData.length > 0;

  // ADD SAVINGS GROWTH VALIDATION
  const hasSavingsGrowthData =
    reportData?.savingsGrowthOverTime &&
    reportData.savingsGrowthOverTime.length > 0;

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }} data-report-container>
      {/* Main Report Display */}
      {/* Show info if data is limited */}
      {!hasTransactions && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No transactions found for the selected date range ({startDate} to{" "}
          {endDate}). The report shows summary data only.
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          position: "center",
        }}
      >
        {/* Row 1: Summary Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center", // Horizontal centering (cross axis)
            justifyContent: "center", // Vertical centering (main axis, optional)
          }}
        >
          <Grid container spacing={3}>
            {/* Pass the reportData to Cards component */}
            <Cards data={reportData} />
          </Grid>
        </Box>

        {/* Row 2: Pie Chart and Bar Graph */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {hasCategories ? (
                <PieChart data={reportData.categoryBreakdown} />
              ) : (
                <Typography color="text.secondary">
                  No expense data available
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {hasMonthlyData ? (
                <BarGraph data={reportData.monthlyData} />
              ) : (
                <Typography color="text.secondary">
                  No monthly data available
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Row 3: Savings Growth and Goals */}
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {hasSavingsGrowthData ? (
                <SavingsGrowthChart
                  data={reportData.savingsGrowthOverTime}
                  title="Savings Growth Over Time"
                  height={400}
                />
              ) : (
                <Typography color="text.secondary">
                  No savings growth data available for selected period
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {reportData.goals && reportData.goals.length > 0 ? (
                <ReportGoal data={reportData.goals} />
              ) : (
                <Typography color="text.secondary">
                  No goals data available
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Row 4: Transactions Table */}

        {hasTransactions ? (
          <BasicTable data={reportData.transactions} />
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography color="text.secondary">
              No transactions found for the selected date range
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
              Try expanding your date range or check if data exists for user ID{" "}
              {getTestUserId()}
            </Typography>
          </Box>
        )}

        {/* Export Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
            mt: 3,
            p: 2,
            backgroundColor: "grey.50",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Export Report As:
          </Typography>

          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              sx={{
                fontSize: "14px",
                height: "36px",
                backgroundColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "grey.300",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              }}
            >
              <MenuItem value="PDF" sx={{ fontSize: "14px" }}>
                📄 PDF
              </MenuItem>
              <MenuItem value="CSV" sx={{ fontSize: "14px" }}>
                📊 CSV
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            className="download-btn"
            variant="contained"
            size="medium"
            onClick={handleExportReport}
            disabled={!reportData || loading}
            sx={{
              fontSize: "14px",
              textTransform: "none",
              px: 3,
              py: 1,
              height: "36px",
              fontWeight: 600,
              minWidth: "140px",
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              boxShadow: "0 3px 5px 2px rgba(25, 118, 210, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                boxShadow: "0 4px 8px 3px rgba(25, 118, 210, .4)",
                transform: "translateY(-1px)",
              },
              "&:disabled": {
                background: "grey.400",
                boxShadow: "none",
              },
              transition: "all 0.3s ease",
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={16} sx={{ mr: 1, color: "white" }} />
                Generating...
              </>
            ) : (
              <>📥 Download Report</>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportDisplay;
