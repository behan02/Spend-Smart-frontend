import { Box, Button, Card, Divider, LinearProgress, Typography, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";

interface Goal {
    id: number;
    name: string;
    endDate: string;
    currentAmount: number;
    targetAmount: number;
    savedPercentage: number;
    status: string;
    daysRemaining: number;
}

interface DashboardGoalProps {
    dashboardData?: any;
    userId: number; // Add userId prop to fetch goals for specific user
}

const DashboardGoal: React.FC<DashboardGoalProps> = ({ dashboardData, userId }) => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Color array for progress bars
    const colors = ["#4caf50", "#2196f3", "#ff9800"];

    useEffect(() => {
        fetchGoals();
    }, [dashboardData]);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`https://localhost:7211/api/Goal/GetUserGoals/${userId}`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch goals");
            }
            
            const data = await response.json();
            setGoals(data);
        } catch (error: any) {
            console.error("Error fetching goals:", error);
            setError(error.message || "Failed to load goals");
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
                <Typography variant="h5" component="p" fontWeight="bold" sx={{ mb: 2 }}>Goal Status</Typography>
                <Alert severity="error">{error}</Alert>
            </Card>
        );
    }

    return (
        <Card sx={{ p: "20px", borderRadius: "15px", height: "100%", m: "0px" }}>
            {/* Header section with title and View all button */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: "35px"
            }}>
                <Typography variant="h5" component="p" fontWeight="bold">Goal Status</Typography>
                <Button 
                    variant="text" 
                    size="small" 
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                        // Navigate to goals page - implement navigation logic here
                        console.log("Navigate to goals page");
                    }}
                >
                    View all
                </Button>
            </Box>

            {/* Goal items */}
            {goals.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                        No active goals found
                    </Typography>
                    {/* <Button 
                        variant="outlined" 
                        sx={{ mt: 2, textTransform: "none" }}
                        onClick={() => {
                            // Navigate to create goal page
                            console.log("Create new goal");
                        }}
                    >
                        Create Your First Goal
                    </Button> */}
                </Box>
            ) : (
                goals.slice(0, 4).map((goal: Goal, index: number) => ( // Show only first 3 goals
                    <Box width="85%" m="auto" key={goal.id}>
                        {/* Goal Name and Target date */}
                        <Box sx={{ mb: 1 }}>
                            <Typography variant="h6" component="p" fontSize="16px" fontWeight="medium">
                                {goal.name}
                            </Typography>
                            <Typography variant="body2" fontSize="14px" color="text.secondary">
                                Target date: {formatDate(goal.endDate)}
                            </Typography>
                        </Box>
                        
                        {/* Progress bar */}
                        <LinearProgress 
                            variant="determinate" 
                            value={Math.min(goal.savedPercentage, 100)}
                            sx={{
                                height: "12px", 
                                borderRadius: "5px",
                                backgroundColor: "#E4E4E4",
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: colors[index % colors.length],
                                    borderRadius: "5px",
                                }
                            }}
                        />

                        {/* Saved Amount and Progress Percentage */}
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: "8px"
                        }}>
                            <Typography variant="body2" fontSize="14px" color="text.secondary">
                                Saved: {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                            </Typography>
                            <Typography variant="body2" fontSize="12px" fontWeight="medium">
                                {Math.round(goal.savedPercentage)}%
                            </Typography>
                        </Box>
                        
                        {/* Divider between goals */}
                        {index < Math.min(goals.length - 1, 2) && (
                            <Divider sx={{ m: "18px 0px" }} />
                        )}
                    </Box>
                ))
            )}
        </Card>
    );
};

export default DashboardGoal;