import React from 'react';
import { Box, Typography, Card, LinearProgress } from '@mui/material';
import { BarChart } from '@mui/x-charts';

interface SavingRecord {
  id: number;
  amount: number;
  date: Date;
  description?: string;
  goalId: number;
}

interface ProgressBarChartProps {
  savingRecords: SavingRecord[];
  goalTargetAmount: number;
}

const ProgressBarChart: React.FC<ProgressBarChartProps> = ({ 
  savingRecords, 
  goalTargetAmount 
}) => {
  // Process saving records into chart data
  const processChartData = () => {
    if (savingRecords.length === 0) {
      return {
        xAxisData: [],
        seriesData: [],
        cumulativeData: []
      };
    }

    // Sort records by date
    const sortedRecords = [...savingRecords].sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // Group records by date (sum amounts for same date)
    const recordsByDate = new Map<string, number>();
    sortedRecords.forEach(record => {
      const dateKey = record.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      recordsByDate.set(dateKey, (recordsByDate.get(dateKey) || 0) + record.amount);
    });

    // Convert to arrays for chart
    const xAxisData = Array.from(recordsByDate.keys());
    const seriesData = Array.from(recordsByDate.values());
    
    // Calculate cumulative data for progress tracking
    const cumulativeData: number[] = [];
    let cumulative = 0;
    seriesData.forEach(amount => {
      cumulative += amount;
      cumulativeData.push(cumulative);
    });

    return { xAxisData, seriesData, cumulativeData };
  };

  const { xAxisData, seriesData, cumulativeData } = processChartData();
  
  const totalSaved = cumulativeData[cumulativeData.length - 1] || 0;
  const progressPercentage = goalTargetAmount > 0 ? (totalSaved / goalTargetAmount) * 100 : 0;

  return (
    <Card sx={{ 
      p: "6px", 
      borderRadius: "24px", 
      width: '100%',
      minWidth: '700px',
      maxWidth: '1200px',
      height: '100%',
      minHeight: '500px',
      boxShadow: "0 8px 32px rgba(0, 119, 182, 0.15), 0 2px 8px rgba(0, 119, 182, 0.08)",
      border: "2px solid rgba(0, 119, 182, 0.1)",
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0f2fe 100%)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      "&:hover": {
        boxShadow: "0 16px 48px rgba(0, 119, 182, 0.2), 0 4px 16px rgba(0, 119, 182, 0.15)",
        transform: "translateY(-4px) scale(1.02)",
        border: "2px solid rgba(0, 119, 182, 0.2)"
      },
      "&::before": {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: "linear-gradient(90deg, #0077B6 0%, #00B4D8 50%, #0077B6 100%)",
        borderRadius: "24px 24px 0 0",
        animation: 'shimmer 3s ease-in-out infinite'
      },
      "@keyframes shimmer": {
        "0%": { backgroundPosition: "-200px 0" },
        "100%": { backgroundPosition: "200px 0" }
      }
    }}>
      {/* Decorative background elements */}
      <Box sx={{
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 119, 182, 0.08) 0%, transparent 70%)',
        zIndex: 0,
        animation: 'float 6s ease-in-out infinite'
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 180, 216, 0.06) 0%, transparent 70%)',
        zIndex: 0,
        animation: 'float 8s ease-in-out infinite reverse'
      }} />

      <Box sx={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        {/* Header */}
        <Box sx={{
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          mb: 2,
          p: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 48,
              height: 48,
              borderRadius: '16px',
              background: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: "0 4px 16px rgba(0, 119, 182, 0.3)",
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                📈
              </Typography>
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                component="p" 
                fontWeight="800"
                sx={{
                  background: "linear-gradient(135deg, #0077B6 0%, #023E8A 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontSize: { xs: "1.2rem", sm: "1.4rem" },
                  letterSpacing: "-0.02em"
                }}
              >
                Saving Progress
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontWeight: 500, mt: 0.5 }}
              >
                Track your financial journey
              </Typography>
            </Box>
          </Box>
          
          {/* Progress indicator */}
          <Box sx={{
            minWidth: 80,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            p: 1.5,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 119, 182, 0.1)'
          }}>
            <Typography 
              variant="h6" 
              fontWeight="bold"
              sx={{
                color: progressPercentage >= 100 ? '#059669' : '#0077B6',
                fontSize: '1.1rem'
              }}
            >
              {progressPercentage.toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Complete
            </Typography>
          </Box>
        </Box>
        
        {savingRecords.length === 0 ? (
          // Fixed empty state - removed margin and adjusted positioning
          <Box sx={{ 
            width: 'auto', 
            height: '400px',
            flex: 1,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.9) 100%)',
            borderRadius: 4,
            border: '3px dashed rgba(0, 119, 182, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            mx: 2, // Changed from m: 2 to mx: 2 to only apply horizontal margin
            my: 1, // Small vertical margin
            backdropFilter: 'blur(10px)'
          }}>
            {/* Animated background grid */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 119, 182, 0.1) 1px, transparent 0)',
              backgroundSize: '20px 20px',
              opacity: 0.3,
              animation: 'backgroundMove 20s linear infinite'
            }} />
            
            <Box sx={{ 
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              p: 3, // Reduced padding from 4 to 3
              zIndex: 1
            }}>
              {/* Enhanced axes */}
              <Box sx={{
                position: 'absolute',
                left: 50, // Reduced from 60 to 50
                top: 30, // Reduced from 40 to 30
                bottom: 70, // Reduced from 80 to 70
                width: 3,
                background: 'linear-gradient(180deg, #0077B6 0%, #00B4D8 100%)',
                borderRadius: '2px',
                boxShadow: '0 2px 8px rgba(0, 119, 182, 0.3)'
              }} />
              
              <Box sx={{
                position: 'absolute',
                left: 50, // Reduced from 60 to 50
                bottom: 70, // Reduced from 80 to 70
                right: 30, // Reduced from 40 to 30
                height: 3,
                background: 'linear-gradient(90deg, #0077B6 0%, #00B4D8 100%)',
                borderRadius: '2px',
                boxShadow: '0 2px 8px rgba(0, 119, 182, 0.3)'
              }} />
              
              {/* Axis labels with enhanced styling */}
              <Box sx={{
                position: 'absolute',
                left: 5, // Reduced from 10 to 5
                top: '40%',
                transform: 'rotate(-90deg) translateY(-50%)',
                transformOrigin: 'center',
              }}>
                <Typography variant="body2" sx={{ 
                  color: '#0077B6', 
                  fontWeight: 600,
                  fontSize: '0.75rem', // Reduced font size
                  textShadow: '0 1px 2px rgba(0, 119, 182, 0.2)'
                }}>
                  Amount (LKR)
                </Typography>
              </Box>
              
              <Box sx={{
                position: 'absolute',
                bottom: 30, // Reduced from 40 to 30
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
                <Typography variant="body2" sx={{ 
                  color: '#0077B6', 
                  fontWeight: 600,
                  fontSize: '0.75rem', // Reduced font size
                  textShadow: '0 1px 2px rgba(0, 119, 182, 0.2)'
                }}>
                  Timeline
                </Typography>
              </Box>
              
              {/* Enhanced no data message */}
              <Box sx={{ 
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 2
              }}>
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.1) 0%, rgba(0, 180, 216, 0.15) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  border: '3px solid rgba(0, 119, 182, 0.2)',
                  boxShadow: '0 8px 24px rgba(0, 119, 182, 0.15)',
                  animation: 'bounce 2s ease-in-out infinite'
                }}>
                  <Typography variant="h3" sx={{ 
                    fontSize: '2rem',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 119, 182, 0.3))'
                  }}>
                    💰
                  </Typography>
                </Box>
                <Typography 
                  variant="h6" 
                  fontWeight="700"
                  sx={{ 
                    mb: 1,
                    background: "linear-gradient(135deg, #0077B6 0%, #023E8A 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  Ready to Start Saving?
                </Typography>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ 
                    maxWidth: 280,
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}
                >
                  Add your first saving record and watch your progress 
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          // Enhanced chart with data
          <Box sx={{ 
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            px: 2
          }}>
            {/* Progress bar */}
            <Box sx={{
              mb: 3,
              p: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '16px',
              border: '1px solid rgba(0, 119, 182, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ mb: 1, fontWeight: 600 }}
              >
                Goal Progress
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={Math.min(progressPercentage, 100)}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: 'rgba(0, 119, 182, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: progressPercentage >= 100 
                      ? 'linear-gradient(90deg, #059669 0%, #047857 100%)'
                      : 'linear-gradient(90deg, #0077B6 0%, #00B4D8 100%)',
                    borderRadius: 6,
                    boxShadow: '0 2px 8px rgba(0, 119, 182, 0.3)',
                    animation: progressPercentage >= 100 ? 'celebrate 1s ease-in-out' : 'none'
                  }
                }}
              />
            </Box>

            {/* Chart container with increased width */}
            <Box sx={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
              borderRadius: 4,
              p: 3,
              mb: 3,
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 119, 182, 0.1)',
              boxShadow: 'inset 0 2px 8px rgba(0, 119, 182, 0.05)',
              width: '100%',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                width: '100%',
                minWidth: '800px',
                overflowX: 'auto'
              }}>
                <BarChart
                  dataset={xAxisData.map((date, index) => ({
                    date,
                    amount: seriesData[index]
                  }))}
                  xAxis={[{ 
                    scaleType: 'band', 
                    dataKey: 'date',
                    tickLabelStyle: {
                      fontSize: 12,
                      fill: '#475569',
                      fontWeight: 500
                    }
                  }]}
                  series={[
                    { 
                      dataKey: 'amount', 
                      label: 'Saving Amount', 
                      color: "#0077B6"
                    },
                  ]}
                  borderRadius={8}
                  height={400}
                  width={Math.max(800, xAxisData.length * 80)}
                  margin={{ left: 100, right: 50, top: 50, bottom: 80 }}
                  sx={{
                    width: '100%',
                    '& .MuiChartsAxis-line': {
                      stroke: '#cbd5e1',
                      strokeWidth: 2
                    },
                    '& .MuiChartsAxis-tick': {
                      stroke: '#cbd5e1'
                    },
                    '& .MuiChartsAxis-tickLabel': {
                      fontWeight: 500
                    }
                  }}
                />
              </Box>
            </Box>
            
            {/* Enhanced progress summary */}
            <Box sx={{ 
              mt: 'auto',
              p: 3, 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
              borderRadius: 4,
              border: '2px solid rgba(0, 119, 182, 0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              minHeight: '100px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(0, 119, 182, 0.1)',
              mb: 2
            }}>
              <Box sx={{ 
                textAlign: 'center', 
                minWidth: '120px',
                p: 1,
                borderRadius: 2,
                background: 'rgba(5, 150, 105, 0.05)',
                border: '1px solid rgba(5, 150, 105, 0.1)'
              }}>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ fontWeight: 600, mb: 1, fontSize: '0.8rem' }}
                >
                  💰 Total Saved
                </Typography>
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  sx={{
                    color: '#059669',
                    fontSize: '1.1rem',
                    textShadow: '0 1px 2px rgba(5, 150, 105, 0.2)'
                  }}
                >
                  {totalSaved.toLocaleString()} LKR
                </Typography>
              </Box>
              
              <Box sx={{ 
                textAlign: 'center', 
                minWidth: '120px',
                p: 1,
                borderRadius: 2,
                background: 'rgba(0, 119, 182, 0.05)',
                border: '1px solid rgba(0, 119, 182, 0.1)'
              }}>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ fontWeight: 600, mb: 1, fontSize: '0.8rem' }}
                >
                  🎯 Goal Target
                </Typography>
                <Typography 
                  variant="h6" 
                  fontWeight="bold"
                  sx={{
                    color: '#0077B6',
                    fontSize: '1.1rem',
                    textShadow: '0 1px 2px rgba(0, 119, 182, 0.2)'
                  }}
                >
                  {goalTargetAmount.toLocaleString()} LKR
                </Typography>
              </Box>
              
              <Box sx={{ 
                textAlign: 'center', 
                minWidth: '120px',
                p: 1,
                borderRadius: 2,
                background: progressPercentage >= 100 
                  ? 'rgba(5, 150, 105, 0.1)'
                  : 'rgba(220, 38, 38, 0.05)',
                border: `1px solid ${progressPercentage >= 100 
                  ? 'rgba(5, 150, 105, 0.2)'
                  : 'rgba(220, 38, 38, 0.1)'}`
              }}>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ fontWeight: 600, mb: 1, fontSize: '0.8rem' }}
                >
                  {progressPercentage >= 100 ? '🎉' : '📊'} Progress
                </Typography>
                <Typography 
                  variant="h6" 
                  fontWeight="bold"
                  sx={{
                    color: progressPercentage >= 100 ? '#059669' : '#dc2626',
                    fontSize: '1.1rem',
                    textShadow: `0 1px 2px ${progressPercentage >= 100 ? 'rgba(5, 150, 105, 0.2)' : 'rgba(220, 38, 38, 0.2)'}`
                  }}
                >
                  {Math.round(progressPercentage)}%
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes backgroundMove {
          0% { background-position: 0 0; }
          100% { background-position: 20px 20px; }
        }
        
        @keyframes celebrate {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.1); }
        }
      `}</style>
    </Card>
  );
};

export default ProgressBarChart;