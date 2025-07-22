import React, { useState, useEffect } from 'react';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface SavingRecord {
  id: number;
  amount: number;
  date: string; // Date part as string
  time?: string; // Time part as string
  description?: string;
  goalId: number;
}

interface ProgressBarChartProps {
  savingRecords: SavingRecord[];
  goalTargetAmount: number;
  goalDeadline?: Date;
  goalCreationDate?: Date;
}

const OptimizedProgressBarChart: React.FC<ProgressBarChartProps> = ({ 
  savingRecords, 
  goalTargetAmount,
  goalDeadline,
  goalCreationDate
}) => {
  const [currentPeriodStart, setCurrentPeriodStart] = useState<Date>(new Date());
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [periods, setPeriods] = useState<Date[]>([]);

  const getWeekStart = (date: Date): Date => {
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
  };

  // Generate all 14-day periods between goal creation and deadline
  const generatePeriods = () => {
    if (!goalDeadline) return [];
    
    const startDate = goalCreationDate ? new Date(goalCreationDate) : new Date();
    const endDate = new Date(goalDeadline);
    
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startDate.getDate() - startDate.getDay());
    
    const periods = [];
    let currentDate = new Date(startOfWeek);
    
    while (currentDate <= endDate) {
      periods.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 14);
    }
    
    return periods;
  };

  // Find the period that contains the most recent transaction
  const findMostRecentTransactionPeriod = (periods: Date[], records: SavingRecord[]): Date => {
    if (records.length === 0) {
      const currentDate = new Date();
      const currentWeekStart = getWeekStart(currentDate);
      
      const currentPeriodInArray = periods.find(period => {
        const periodEnd = new Date(period);
        periodEnd.setDate(period.getDate() + 13);
        return currentWeekStart >= period && currentWeekStart <= periodEnd;
      });
      
      if (currentPeriodInArray) {
        return currentWeekStart;
      } else {
        return periods[periods.length - 1] || new Date();
      }
    }

    const sortedRecords = [...records].sort((a, b) => b.date.getTime() - a.date.getTime());
    const mostRecentRecord = sortedRecords[0];

    for (const period of periods) {
      const periodEnd = new Date(period);
      periodEnd.setDate(period.getDate() + 13);
      if (mostRecentRecord.date >= period && mostRecentRecord.date <= periodEnd) {
        return period;
      }
    }

    return periods[periods.length - 1] || new Date();
  };

  // Initialize periods and current period
  useEffect(() => {
    const generatedPeriods = generatePeriods();
    setPeriods(generatedPeriods);
    
    if (generatedPeriods.length > 0) {
      const currentDate = new Date();
      const currentWeekStart = getWeekStart(currentDate);
      
      const isCurrentPeriodInRange = generatedPeriods.some(period => {
        const periodEnd = new Date(period);
        periodEnd.setDate(period.getDate() + 13);
        return currentWeekStart >= period && currentWeekStart <= periodEnd;
      });
      
      let initialPeriod: Date;
      if (isCurrentPeriodInRange) {
        initialPeriod = currentWeekStart;
      } else {
        if (savingRecords.length > 0) {
          initialPeriod = findMostRecentTransactionPeriod(generatedPeriods, savingRecords);
        } else {
          initialPeriod = generatedPeriods[generatedPeriods.length - 1];
        }
      }
      
      setCurrentPeriodStart(initialPeriod);
    }
  }, [goalDeadline, goalCreationDate]);

  // Update current period when savingRecords change
  useEffect(() => {
    if (periods.length > 0 && savingRecords.length > 0) {
      const recentPeriod = findMostRecentTransactionPeriod(periods, savingRecords);
      setCurrentPeriodStart(recentPeriod);
    }
  }, [savingRecords]);

  // Generate 14 days for current period
  const generate14Days = () => {
    const days = [];
    for (let i = 0; i < 14; i++) {
      const day = new Date(currentPeriodStart);
      day.setDate(currentPeriodStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const periodDays = generate14Days();

  // Process chart data for current period
  const processPeriodData = () => {
    if (!savingRecords || savingRecords.length === 0) {
      return {
        seriesData: new Array(14).fill(0),
        cumulativeData: new Array(14).fill(0)
      };
    }

    const periodData = periodDays.map(day => {
      const dayRecords = savingRecords.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.toDateString() === day.toDateString();
      });
      
      return {
        date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: dayRecords.reduce((sum, record) => sum + record.amount, 0)
      };
    });

    const seriesData = periodData.map(d => d.amount);
    const totalSaved = savingRecords.reduce((sum, record) => sum + record.amount, 0);
    const cumulativeData = [totalSaved];

    return { seriesData, cumulativeData };
  };

  const { seriesData, cumulativeData } = processPeriodData();
 


  const maxAmountFromData = seriesData && seriesData.length > 0 ? Math.max(...seriesData) : 0;
  const maxAmount = Math.max(maxAmountFromData, 1000);

  const formatPeriodRange = () => {
    if (!periodDays || periodDays.length < 14) return 'Loading...';
    const startDate = periodDays[0];
    const endDate = periodDays[13];
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  const currentPeriodIndex = periods.findIndex(period => 
    period.getTime() === currentPeriodStart.getTime()
  );

  // Navigation functions
  const goToPreviousPeriod = () => {
    if (currentPeriodIndex > 0) {
      setCurrentPeriodStart(periods[currentPeriodIndex - 1]);
    }
  };

  const goToNextPeriod = () => {
    if (currentPeriodIndex < periods.length - 1) {
      setCurrentPeriodStart(periods[currentPeriodIndex + 1]);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPreviousPeriod();
      } else if (e.key === 'ArrowRight') {
        goToNextPeriod();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPeriodIndex, periods.length]);

  return (
    <Card sx={{ 
      p: "24px", 
      borderRadius: "15px", 
      height: "100%",
      minHeight: "380px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-2px)',
        backgroundColor: '#fafafa'
      }
    }}>
      {/* Header */}
      <Box sx={{
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "flex-start", 
        mb: 3,
        pb: 2,
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Box>
          <Typography variant="h6" sx={{ 
            fontWeight: "600",
            color: "#1e293b",
            fontSize: '18px',
            mb: 0.5
          }}>
            Saving Progress
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          {/* Period Date Range */}
          <Typography variant="body2" sx={{ 
            color: '#64748b',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {formatPeriodRange()}
          </Typography>
          
          {/* Navigation Arrows */}
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton 
              onClick={goToPreviousPeriod}
              disabled={currentPeriodIndex === 0}
              sx={{ 
                opacity: currentPeriodIndex === 0 ? 0.3 : 0.7,
                '&:hover': { opacity: 1 },
                padding: '4px'
              }}
            >
              <ChevronLeft fontSize="small" />
            </IconButton>
            <IconButton 
              onClick={goToNextPeriod}
              disabled={currentPeriodIndex === periods.length - 1}
              sx={{ 
                opacity: currentPeriodIndex === periods.length - 1 ? 0.3 : 0.7,
                '&:hover': { opacity: 1 },
                padding: '4px'
              }}
            >
              <ChevronRight fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Chart Container */}
      <Box sx={{
        height: '260px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Y-axis label */}
        <Typography sx={{
          position: 'absolute',
          left: '-35px',
          top: '40%',
          transform: 'rotate(-90deg)',
          fontSize: '14px',
          color: '#374151',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          letterSpacing: '0.5px'
        }}>
          Amount
        </Typography>

        {/* Chart area */}
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-end',
          height: '200px',
          pl: '50px',
          pr: '20px',
          pb: '30px',
          position: 'relative'
        }}>
          {/* Y-axis labels */}
          <Box sx={{
            position: 'absolute',
            left: '0',
            top: '0',
            bottom: '30px',
            width: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {[4, 3, 2, 1, 0].map((level) => (
              <Typography key={level} sx={{
                fontSize: '12px',
                color: '#6b7280',
                textAlign: 'right',
                pr: 1,
                fontWeight: '500'
              }}>
                {Math.round((maxAmount * level) / 4).toLocaleString()}
              </Typography>
            ))}
          </Box>

          {/* Grid lines */}
          <Box sx={{
            position: 'absolute',
            left: '50px',
            right: '0px',
            top: '0',
            bottom: '30px',
            pointerEvents: 'none'
          }}>
            {[4, 3, 2, 1].map((level) => (
              <Box key={level} sx={{
                position: 'absolute',
                top: `${(4 - level) * 25}%`,
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: '#f3f4f6',
                opacity: 0.8
              }} />
            ))}
          </Box>

          {/* Bars */}
          <Box sx={{
            display: 'flex',
            alignItems: 'flex-end',
            height: '100%',
            flex: 1,
            gap: '2px',
            justifyContent: 'space-between'
          }}>
            {seriesData && seriesData.map((amount, index) => {
              const barHeight = maxAmount > 0 ? (amount / maxAmount) * 150 : 0;
              const isHovered = hoveredBar === index;
              const isEven = index % 2 === 0;
              const barColor = isEven ? '#0b87daff' : '#0c41e0ff';
              
              return (
                <Box key={index} sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative',
                  minWidth: '16px',
                  maxWidth: '24px'
                }}>
                  {/* Tooltip */}
                  {amount > 0 && isHovered && (
                    <Box sx={{
                      position: 'absolute',
                      bottom: `${barHeight + 25}px`,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#1f2937',
                      color: 'white',
                      px: 1.5,
                      py: 1,
                      borderRadius: '6px',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      zIndex: 10,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      fontWeight: '600',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '4px solid transparent',
                        borderRight: '4px solid transparent',
                        borderTop: '4px solid #1f2937'
                      }
                    }}>
                      LKR {amount.toLocaleString()}
                    </Box>
                  )}
                  
                  {/* Bar */}
                  <Box 
                    sx={{
                      width: '28px',
                      height: `${Math.max(barHeight, 2)}px`,
                      backgroundColor: amount > 0 ? barColor : '#e5e7eb',
                      borderRadius: '8px 8px 0 0',
                      transition: 'all 0.5s ease',
                      cursor: amount > 0 ? 'pointer' : 'default',
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                      opacity: amount > 0 ? 1 : 0.4,
                      '&:hover': {
                        transform: amount > 0 ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: amount > 0 ? `0 4px 8px ${barColor}40` : 'none'
                      }
                    }}
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* X-axis labels */}
        <Box sx={{
          display: 'flex',
          pl: '50px',
          pr: '20px',
          gap: '2px',
          mt: 0.5,
          justifyContent: 'space-between'
        }}>
          {periodDays.map((day, index) => {
            const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
            const dayDate = day.getDate();
            
            return (
              <Box key={index} sx={{
                flex: 1,
                textAlign: 'center',
                fontSize: '11px',
                color: '#6b7280',
                fontWeight: '500',
                minWidth: '16px',
                maxWidth: '24px'
              }}>
                <Typography sx={{ 
                  fontSize: '10px', 
                  fontWeight: '600',
                  color: '#374151',
                  mb: 0.2
                }}>
                  {dayName}
                </Typography>
                <Typography sx={{ 
                  fontSize: '9px', 
                  color: '#9ca3af'
                }}>
                  {dayDate}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* X-axis label */}
        <Box sx={{
          textAlign: 'center',
          mt: 1.5
        }}>
          <Typography sx={{
            fontSize: '14px',
            color: '#374151',
            fontWeight: '600'
          }}>
            Savings per Day
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default OptimizedProgressBarChart;