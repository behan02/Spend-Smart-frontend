import {
  Box,
  Button,
  Card,
  Divider,
  LinearProgress,
  Typography,
  Alert,
  Skeleton,
  Chip,
} from "@mui/material";
import { format, isAfter, isBefore, differenceInDays } from "date-fns";

// Interface for goal data from backend
interface GoalData {
  goalName: string;
  progressPercentage: number;
  currentAmount: number;
  targetAmount: number;
  targetDate?: string;
}

// Interface for goal component props
interface ReportGoalProps {
  data: GoalData[] | null | undefined;
  title?: string;
  maxGoals?: number;
  onViewAll?: () => void;
}

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Color schemes for progress bars
const progressColors = [
  "#4CAF50", // Green
  "#2196F3", // Blue  
  "#FF9800", // Orange
  "#9C27B0", // Purple
  "#F44336", // Red
  "#00BCD4", // Cyan
  "#795548", // Brown
  "#607D8B", // Blue Grey
];

// Helper function to get status color and message
const getGoalStatus = (progressPercentage: number, targetDate?: string) => {
  const today = new Date();
  
  if (progressPercentage >= 100) {
    return { status: "completed", color: "#4CAF50", message: "🎉 Completed!" };
  }
  
  if (targetDate) {
    const target = new Date(targetDate);
    const daysLeft = differenceInDays(target, today);
    
    if (daysLeft < 0) {
      return { status: "overdue", color: "#F44336", message: "⏰ Overdue" };
    } else if (daysLeft <= 7) {
      return { status: "urgent", color: "#FF9800", message: `⚡ ${daysLeft} days left` };
    } else if (daysLeft <= 30) {
      return { status: "approaching", color: "#FF9800", message: `📅 ${daysLeft} days left` };
    }
  }
  
  if (progressPercentage >= 75) {
    return { status: "ontrack", color: "#4CAF50", message: "✅ On track" };
  } else if (progressPercentage >= 50) {
    return { status: "progress", color: "#2196F3", message: "📈 Good progress" };
  } else {
    return { status: "started", color: "#9E9E9E", message: "🚀 Getting started" };
  }
};

const ReportGoal = ({ 
  data, 
  title = "Goal Status",
  maxGoals = 5,
  onViewAll 
}: ReportGoalProps) => {
  
  // Loading state
  if (data === null || data === undefined) {
    return (
      <Card
        sx={{
          p: "20px",
          borderRadius: "15px",
          height: "500px",
          m: "0px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "35px",
          }}
        >
          <Typography variant="h5" component="p" fontWeight="bold">
            {title}
          </Typography>
          <Skeleton variant="text" width={60} height={30} />
        </Box>
        
        {[...Array(3)].map((_, index) => (
          <Box width="85%" m="auto" key={index} sx={{ mb: 3 }}>
            <Skeleton variant="text" width="70%" height={24} />
            <Skeleton variant="text" width="50%" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="100%" height={12} sx={{ borderRadius: "5px", mb: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Skeleton variant="text" width="40%" height={20} />
              <Skeleton variant="text" width="20%" height={20} />
            </Box>
            <Divider />
          </Box>
        ))}
      </Card>
    );
  }

  // No data state
  if (!data || data.length === 0) {
    return (
      <Card
        sx={{
          p: "20px",
          borderRadius: "15px",
          height: "500px",
          m: "0px",
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="p" fontWeight="bold" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Alert severity="info" sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="body2">
            No goals found for this period.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Set some financial goals to track your progress!
          </Typography>
        </Alert>
      </Card>
    );
  }

  // Limit the number of goals displayed
  const displayedGoals = data.slice(0, maxGoals);
  const hasMoreGoals = data.length > maxGoals;

  return (
    <Card
      sx={{
        p: "20px",
        borderRadius: "15px",
        minHeight: "500px",
        m: "0px",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "35px",
        }}
      >
        <Typography variant="h5" component="p" fontWeight="bold">
          {title}
        </Typography>
        {(hasMoreGoals || onViewAll) && (
          <Button 
            variant="text" 
            size="small" 
            sx={{ textTransform: "none" }}
            onClick={onViewAll}
          >
            View all {hasMoreGoals && `(${data.length})`}
          </Button>
        )}
      </Box>

      <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
        {displayedGoals.map((goal: GoalData, index: number) => {
          const statusInfo = getGoalStatus(goal.progressPercentage, goal.targetDate);
          const progressColor = progressColors[index % progressColors.length];
          
          return (
            <Box width="90%" m="auto" key={index} sx={{ mb: index === displayedGoals.length - 1 ? 0 : 2 }}>
              {/* Goal name and status */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                <Typography variant="h6" component="p" fontSize="16px" fontWeight={600}>
                  {goal.goalName}
                </Typography>
                <Chip 
                  label={statusInfo.message}
                  size="small"
                  sx={{ 
                    bgcolor: `${statusInfo.color}20`,
                    color: statusInfo.color,
                    fontSize: "10px",
                    height: "20px",
                  }}
                />
              </Box>

              {/* Target date */}
              {goal.targetDate && (
                <Typography
                  variant="body2"
                  component="p"
                  fontSize="14px"
                  color="rgba(0,0,0,0.6)"
                  sx={{ mb: 1 }}
                >
                  Target date: {format(new Date(goal.targetDate), "MMM dd, yyyy")}
                </Typography>
              )}

              {/* Progress bar */}
              <LinearProgress
                variant="determinate"
                value={Math.min(goal.progressPercentage, 100)}
                sx={{
                  height: "12px",
                  borderRadius: "5px",
                  bgcolor: "#E4E4E4",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: progressColor,
                    borderRadius: "5px",
                  },
                }}
              />

              {/* Amount and percentage info */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: "8px",
                  mb: "8px",
                }}
              >
                <Box>
                  <Typography variant="body2" component="p" fontSize="14px" fontWeight={500}>
                    Saved: {formatCurrency(goal.currentAmount)}
                  </Typography>
                  <Typography variant="caption" component="p" fontSize="12px" color="text.secondary">
                    Target: {formatCurrency(goal.targetAmount)}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2" component="p" fontSize="14px" fontWeight={600}>
                    {goal.progressPercentage.toFixed(1)}%
                  </Typography>
                  <Typography variant="caption" component="p" fontSize="12px" color="text.secondary">
                    {formatCurrency(goal.targetAmount - goal.currentAmount)} left
                  </Typography>
                </Box>
              </Box>

              {/* Progress insights */}
              {goal.targetDate && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {(() => {
                      const today = new Date();
                      const target = new Date(goal.targetDate);
                      const daysLeft = differenceInDays(target, today);
                      const amountLeft = goal.targetAmount - goal.currentAmount;
                      
                      if (goal.progressPercentage >= 100) {
                        return "🎉 Goal achieved! Congratulations!";
                      } else if (daysLeft <= 0) {
                        return "⏰ Target date has passed";
                      } else if (amountLeft > 0) {
                        const dailyTarget = amountLeft / daysLeft;
                        return `💡 Save ${formatCurrency(dailyTarget)}/day to reach your goal`;
                      }
                      return "";
                    })()}
                  </Typography>
                </Box>
              )}

              {index < displayedGoals.length - 1 && <Divider sx={{ mt: "18px" }} />}
            </Box>
          );
        })}
      </Box>

      {/* Summary at bottom */}
      {data.length > 0 && (
        <Box sx={{ mt: 2, p: 1, bgcolor: "grey.50", borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center", display: "block" }}>
            📊 {data.length} total goals • {data.filter(g => g.progressPercentage >= 100).length} completed • 
            {data.filter(g => g.progressPercentage >= 75 && g.progressPercentage < 100).length} on track
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default ReportGoal;