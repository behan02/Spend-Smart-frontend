import React from 'react';
import { Box, Typography, Card } from '@mui/material';
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

  return (
    <Card sx={{ 
      p: "4px", 
      borderRadius: "16px", 
      width: '100%',
      height: '100%',
      minHeight: '200px',
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      border: "1px solid rgba(0, 0, 0, 0.06)",
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      transition: "all 0.3s ease",
      display: 'flex',
      flexDirection: 'column',
      "&:hover": {
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        transform: "translateY(-2px)"
      }
    }}>
      <Box sx={{
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        mb: 1
      }}>
        <Typography 
          variant="h5" 
          component="p" 
          fontWeight="700"
          sx={{
            background: "linear-gradient(135deg, #0077B6 0%, #023E8A 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: { xs: "1.1rem", sm: "1.25rem" }
          }}
        >
          Saving Progress
        </Typography>
      </Box>
      
      {savingRecords.length === 0 ? (
        // Empty state - show axes only
        <Box sx={{ 
          width: '100%', 
          height: '300px',
          flex: 1,
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '2px dashed #e2e8f0',
          borderRadius: 3,
          backgroundColor: '#f8fafc',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative background */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(0, 119, 182, 0.05) 0%, transparent 70%)",
            zIndex: 0
          }} />
          
          <Box sx={{ 
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            p: 3,
            zIndex: 1
          }}>
            {/* Y-axis */}
            <Box sx={{
              position: 'absolute',
              left: 40,
              top: 30,
              bottom: 60,
              width: 2,
              backgroundColor: '#666',
            }} />
            
            {/* X-axis */}
            <Box sx={{
              position: 'absolute',
              left: 40,
              bottom: 60,
              right: 30,
              height: 2,
              backgroundColor: '#666',
            }} />
            
            {/* Y-axis label */}
            <Box sx={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'rotate(-90deg) translateY(-50%)',
              transformOrigin: 'center',
            }}>
              <Typography variant="body2" color="textSecondary">
                Amount
              </Typography>
            </Box>
            
            {/* X-axis label */}
            <Box sx={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
              <Typography variant="body2" color="textSecondary">
                Date
              </Typography>
            </Box>
            
            {/* No data message */}
            <Box sx={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 2
            }}>
              <Box sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 119, 182, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '2px solid rgba(0, 119, 182, 0.2)'
              }}>
                <Typography variant="h4" sx={{ color: '#0077B6', fontWeight: 'bold' }}>
                  📊
                </Typography>
              </Box>
              <Typography 
                variant="h6" 
                color="primary" 
                fontWeight="600"
                sx={{ mb: 1 }}
              >
                No saving records yet
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ 
                  maxWidth: 250,
                  lineHeight: 1.5
                }}
              >
                Add your first saving record to see the progress chart
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        // Chart with data
        <Box sx={{ 
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{
            background: "linear-gradient(135deg, rgba(0, 119, 182, 0.02) 0%, rgba(0, 180, 216, 0.02) 100%)",
            borderRadius: 2,
            p: 2,
            mb: 2,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
                  fill: '#64748b'
                }
              }]}
              series={[
                { 
                  dataKey: 'amount', 
                  label: 'Saving Amount', 
                  color: "#0077B6"
                },
              ]}
              borderRadius={6}
              height={300}
              width={undefined}
              margin={{ left: 80, right: 30, top: 40, bottom: 60 }}
              sx={{
                width: '100%',
                '& .MuiChartsAxis-line': {
                  stroke: '#e2e8f0',
                  strokeWidth: 2
                },
                '& .MuiChartsAxis-tick': {
                  stroke: '#e2e8f0'
                }
              }}
            />
          </Box>
          
          {/* Progress summary */}
          <Box sx={{ 
            mt: 'auto',
            p: 2, 
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: 3,
            border: '1px solid rgba(0, 119, 182, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            minHeight: '80px'
          }}>
            <Box sx={{ textAlign: 'center', minWidth: '100px' }}>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontWeight: 500, mb: 0.5, fontSize: '0.75rem' }}
              >
                Total Saved
              </Typography>
              <Typography 
                variant="subtitle1" 
                fontWeight="bold" 
                sx={{
                  color: '#059669',
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  fontSize: '1rem'
                }}
              >
                {cumulativeData[cumulativeData.length - 1]?.toLocaleString() || 0} LKR
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center', minWidth: '100px' }}>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontWeight: 500, mb: 0.5, fontSize: '0.75rem' }}
              >
                Goal Target
              </Typography>
              <Typography 
                variant="subtitle1" 
                fontWeight="bold"
                sx={{
                  color: '#0077B6',
                  fontSize: '1rem'
                }}
              >
                {goalTargetAmount.toLocaleString()} LKR
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center', minWidth: '100px' }}>
              <Typography 
                variant="body2" 
                color="textSecondary"
                sx={{ fontWeight: 500, mb: 0.5, fontSize: '0.75rem' }}
              >
                Progress
              </Typography>
              <Typography 
                variant="subtitle1" 
                fontWeight="bold"
                sx={{
                  color: '#dc2626',
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  fontSize: '1rem'
                }}
              >
                {goalTargetAmount > 0 
                  ? Math.round(((cumulativeData[cumulativeData.length - 1] || 0) / goalTargetAmount) * 100)
                  : 0
                }%
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default ProgressBarChart;
