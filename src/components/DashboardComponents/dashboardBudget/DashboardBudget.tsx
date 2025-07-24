import { Box, Button, Card, LinearProgress, ThemeProvider, Typography, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../../../assets/styles/theme";

interface Budget {
    id: number;
    categoryName: string;
    allocatedAmount: number;
    spendAmount: number;
    spendPercentage: number;
    status: string;
    monthYear: string;
    isOverBudget: boolean;
}

interface DashboardBudgetProps {
    dashboardData?: any;
    userId?: number; // Optional userId prop for fetching budgets
}

const DashboardBudget: React.FC<DashboardBudgetProps> = ({ dashboardData, userId }) => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Color array for progress bars
    const colors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336"];

    useEffect(() => {
        fetchBudgets();
    }, [dashboardData]);

    const fetchBudgets = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`https://localhost:7211/api/Budget/GetUserBudgets/${userId}`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch budgets");
            }
            
            const data = await response.json();
            setBudgets(data);
        } catch (error: any) {
            console.error("Error fetching budgets:", error);
            setError(error.message || "Failed to load budgets");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const getStatusColor = (status: string, percentage: number) => {
        switch (status.toLowerCase()) {
            case 'exceeded':
                return '#f44336'; // Red
            case 'warning':
                return '#ff9800'; // Orange
            case 'good':
                return '#4caf50'; // Green
            default:
                return percentage > 80 ? '#ff9800' : '#4caf50';
        }
    };

    const getProgressBarColor = (percentage: number, index: number) => {
        if (percentage >= 100) return '#f44336'; // Red when exceeded
        if (percentage >= 80) return '#ff9800';   // Orange when near limit
        return colors[index % colors.length];     // Normal colors
    };

    if (loading) {
        return (
            <Card sx={{ p: "20px", borderRadius: "15px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
            </Card>
        );
    }

    if (error) {
        return (
            <Card sx={{ p: "20px", borderRadius: "15px", height: "100%" }}>
                <Typography variant="h5" component="p" fontWeight="bold" sx={{ mb: 2 }}>Budget Status</Typography>
                <Alert severity="error">{error}</Alert>
            </Card>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ p: "20px", borderRadius: "15px", height: "100%", m: "0px"}}>
                {/* Header section with title and View all button */}
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "35px"
                }}>
                    <Typography variant="h5" component="p" fontWeight="bold">Budget Status</Typography>
                    <Button 
                        variant="text" 
                        size="small" 
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                            // Navigate to budgets page - implement navigation logic here
                            console.log("Navigate to budgets page");
                        }}
                    >
                        View all
                    </Button>
                </Box>

                {/* Budget items */}
                {budgets.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                            No budgets found
                        </Typography>

                    </Box>
                ) : (
                    budgets.slice(0, 4).map((budget: Budget, index: number) => ( // Show only first 4 budgets
                        <Box width="85%" m="0px auto 35px" key={budget.id}>
                            {/* Budget Name and Category */}
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1
                            }}>
                                <Typography variant="h6" fontSize="16px">
                                    {budget.categoryName}
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    fontSize="12px" 
                                    fontWeight="medium"
                                    sx={{ 
                                        color: budget.spendPercentage >= 100 ? '#f44336' : 
                                               budget.spendPercentage >= 80 ? '#ff9800' : 'text.primary'
                                    }}
                                >
                                    {Math.round(budget.spendPercentage)}%
                                </Typography>
                            </Box>

                            {/* Progress bar */}
                            <LinearProgress 
                                variant="determinate" 
                                value={Math.min(budget.spendPercentage, 100)} 
                                sx={{
                                    height: "12px", 
                                    borderRadius: "5px",
                                    backgroundColor: "#E4E4E4",
                                    '& .MuiLinearProgress-bar': {
                                        bgcolor: getProgressBarColor(budget.spendPercentage, index),
                                        borderRadius: "5px"
                                    }
                                }}
                            />

                            {/* Spent Amount and Budget Amount - Moved below progress bar */}
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 1
                            }}>
                                <Typography variant="body2" fontSize="14px" color="text.secondary">
                                    Spent: {formatCurrency(budget.spendAmount)} / {formatCurrency(budget.allocatedAmount)}
                                </Typography>
                            </Box>
                        </Box>
                    ))
                )}
            </Card>
        </ThemeProvider>
    );
};

export default DashboardBudget;