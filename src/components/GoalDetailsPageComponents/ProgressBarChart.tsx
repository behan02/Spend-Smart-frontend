import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

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
  goalDeadline?: Date;
  goalCreationDate?: Date;
}

const ProgressBarChart: React.FC<ProgressBarChartProps> = ({ 
  savingRecords, 
  goalTargetAmount,
  goalDeadline,
  goalCreationDate
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [weeks, setWeeks] = useState<Date[]>([]);

  // Generate all weeks between goal creation and deadline
  const generateWeeks = () => {
    if (!goalDeadline) return [];
    
    // Use goal creation date as start, or today if not provided
    const startDate = goalCreationDate ? new Date(goalCreationDate) : new Date();
    const endDate = new Date(goalDeadline);
    
    // Get the start of the week (Sunday) for the start date
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startDate.getDate() - startDate.getDay());
    
    const weeks = [];
    let currentDate = new Date(startOfWeek);
    
    while (currentDate <= endDate) {
      weeks.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }
    
    return weeks;
  };

  // Find the week that contains the most recent transaction
  const findMostRecentTransactionWeek = (weeks: Date[], records: SavingRecord[]): Date => {
    if (records.length === 0) {
      return weeks[0] || new Date(); // Return first week if no records
    }

    // Sort records by date (most recent first)
    const sortedRecords = [...records].sort((a, b) => b.date.getTime() - a.date.getTime());
    const mostRecentRecord = sortedRecords[0];

    // Find which week contains this record
    for (const week of weeks) {
      const weekEnd = new Date(week);
      weekEnd.setDate(week.getDate() + 6);
      
      if (mostRecentRecord.date >= week && mostRecentRecord.date <= weekEnd) {
        return week;
      }
    }

    // If not found, return the first week
    return weeks[0] || new Date();
  };

  // Initialize weeks and current week
  useEffect(() => {
    const generatedWeeks = generateWeeks();
    setWeeks(generatedWeeks);
    
    if (generatedWeeks.length > 0) {
      const initialWeek = findMostRecentTransactionWeek(generatedWeeks, savingRecords);
      setCurrentWeekStart(initialWeek);
    }
  }, [goalDeadline, goalCreationDate, savingRecords]);

  // Update current week when savingRecords change
  useEffect(() => {
    if (weeks.length > 0 && savingRecords.length > 0) {
      const recentWeek = findMostRecentTransactionWeek(weeks, savingRecords);
      setCurrentWeekStart(recentWeek);
    }
  }, [savingRecords, weeks]);

  const currentWeekIndex = weeks.findIndex(week => 
    week.getTime() === currentWeekStart.getTime()
  );

  // Generate 7 days for current week
  const generateWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart);
      day.setDate(currentWeekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = generateWeekDays();

  // Process chart data for current week
  const processWeekData = () => {
    if (!savingRecords || savingRecords.length === 0) {
      return {
        xAxisData: weekDays.map(day => day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        seriesData: new Array(7).fill(0),
        cumulativeData: new Array(7).fill(0)
      };
    }

    // Create data for each day of the week
    const weekData = weekDays.map(day => {
      const dayRecords = savingRecords.filter(record => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getDate() === day.getDate() &&
          recordDate.getMonth() === day.getMonth() &&
          recordDate.getFullYear() === day.getFullYear()
        );
      });
      
      return {
        date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: dayRecords.reduce((sum, record) => sum + record.amount, 0)
      };
    });

    const xAxisData = weekData.map(d => d.date);
    const seriesData = weekData.map(d => d.amount);
    
    // Calculate total saved from ALL records (not just current week)
    const totalSaved = savingRecords.reduce((sum, record) => sum + record.amount, 0);
    const cumulativeData = [totalSaved];

    return { xAxisData, seriesData, cumulativeData };
  };

  const { xAxisData, seriesData, cumulativeData } = processWeekData();
  
  const totalSaved = cumulativeData && cumulativeData.length > 0 ? cumulativeData[0] : 0;
  const progressPercentage = goalTargetAmount > 0 ? (totalSaved / goalTargetAmount) * 100 : 0;

  // Calculate max value for scaling bars - use actual data, not hardcoded
  const maxAmountFromData = seriesData && seriesData.length > 0 ? Math.max(...seriesData) : 0;
  const maxAmount = Math.max(maxAmountFromData, 100); // Minimum scale of 100

  // Navigation functions
  const goToPreviousWeek = () => {
    if (currentWeekIndex > 0 && weeks.length > 0) {
      setCurrentWeekStart(weeks[currentWeekIndex - 1]);
    }
  };

  const goToNextWeek = () => {
    if (currentWeekIndex < weeks.length - 1 && weeks.length > 0) {
      setCurrentWeekStart(weeks[currentWeekIndex + 1]);
    }
  };

  const formatWeekRange = () => {
    if (!weekDays || weekDays.length < 7) return 'Loading...';
    const startDate = weekDays[0];
    const endDate = weekDays[6];
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };

  return (
    <div style={{ 
      padding: '24px', 
      borderRadius: '12px', 
      width: '100%',
      minWidth: '600px',
      height: '500px', // Reduced height to match circular progress card
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      border: "1px solid #e1e5e9",
      backgroundColor: "#ffffff",
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <div>
          <h3 style={{ 
            margin: 0,
            fontWeight: "600",
            color: "#2c3e50",
            fontSize: '20px'
          }}>
            Saving Progress
          </h3>
          <p style={{ 
            margin: '4px 0 0 0',
            fontSize: '14px',
            color: '#7f8c8d'
          }}>
            {formatWeekRange()}
          </p>
        </div>
        
        {/* Progress indicator */}
        <div style={{
          textAlign: 'right'
        }}>
          <div style={{ 
            fontSize: '24px',
            fontWeight: "700",
            color: progressPercentage >= 100 ? '#27ae60' : '#0B00DD',
            margin: 0
          }}>
            {Math.round(progressPercentage)}%
          </div>
          <div style={{ fontSize: '12px', color: '#95a5a6' }}>
            Complete
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div style={{
        backgroundColor: "#fafbfc",
        borderRadius: '8px',
        padding: '24px',
        flex: 1,
        border: '1px solid #e1e5e9',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Chart with Axes */}
        <div style={{ 
          height: '300px', // Reduced chart height
          display: 'flex',
          flexDirection: 'column',
          marginTop: '20px',
          position: 'relative'
        }}>
          {/* Y-axis label */}
          <div style={{
            position: 'absolute',
            left: '-40px',
            top: '50%',
            transform: 'rotate(-90deg) translateY(-50%)',
            transformOrigin: 'center',
            fontSize: '12px',
            color: '#7f8c8d',
            fontWeight: '500',
            whiteSpace: 'nowrap'
          }}>
            Amount (LKR)
          </div>

          {/* Chart area */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            height: '230px', // Reduced chart area height
            paddingLeft: '60px',
            paddingRight: '20px',
            paddingBottom: '40px',
            position: 'relative'
          }}>
            {/* Y-axis grid and labels */}
            <div style={{
              position: 'absolute',
              left: '0',
              top: '0',
              bottom: '40px',
              width: '50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              {[4, 3, 2, 1, 0].map((level) => {
                const value = Math.round((maxAmount * level) / 4);
                return (
                  <div key={level} style={{
                    fontSize: '10px',
                    color: '#95a5a6',
                    textAlign: 'right',
                    paddingRight: '8px',
                    position: 'relative'
                  }}>
                    {value.toLocaleString()}
                    {/* Grid lines */}
                    <div style={{
                      position: 'absolute',
                      left: '50px',
                      top: '50%',
                      width: '500px',
                      height: '1px',
                      backgroundColor: level === 0 ? '#bdc3c7' : '#ecf0f1'
                    }} />
                  </div>
                );
              })}
            </div>

            {/* Bars */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: '100%',
              flex: 1,
              gap: '8px',
              paddingLeft: '60px'
            }}>
              {seriesData && seriesData.map((amount, index) => {
                const barHeight = (maxAmount && maxAmount > 0) ? (amount / maxAmount) * 190 : 0; // Adjusted for smaller height
                const currentDay = weekDays[index];
                const dayName = currentDay ? currentDay.toLocaleDateString('en-US', { weekday: 'short' }) : '';
                const dayDate = currentDay ? currentDay.getDate() : '';
                const isHovered = hoveredBar === index;
                
                return (
                  <div key={index} style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    position: 'relative'
                  }}>
                    {/* Amount tooltip */}
                    {amount > 0 && isHovered && (
                      <div style={{
                        position: 'absolute',
                        bottom: `${barHeight + 10}px`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#2c3e50',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        zIndex: 20
                      }}>
                        {amount.toLocaleString()} LKR
                      </div>
                    )}
                    
                    {/* Bar */}
                    <div 
                      style={{
                        width: '100%',
                        maxWidth: '50px',
                        height: `${Math.max(barHeight, 4)}px`,
                        backgroundColor: amount > 0 ? (isHovered ? '#2980b9' : '#3498db') : '#ecf0f1',
                        borderRadius: '4px 4px 0 0',
                        transition: 'all 0.3s ease',
                        boxShadow: amount > 0 ? (isHovered ? '0 4px 8px rgba(52, 152, 219, 0.3)' : '0 2px 4px rgba(52, 152, 219, 0.2)') : 'none',
                        cursor: amount > 0 ? 'pointer' : 'default',
                        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
                      }}
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* X-axis labels with navigation arrows */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '60px',
            paddingRight: '20px',
            gap: '8px',
            position: 'relative'
          }}>
            {/* Left Arrow */}
            <button
              onClick={goToPreviousWeek}
              disabled={currentWeekIndex <= 0}
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: currentWeekIndex <= 0 ? '#ecf0f1' : '#ffffff',
                color: currentWeekIndex <= 0 ? '#bdc3c7' : '#2c3e50',
                cursor: currentWeekIndex <= 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: currentWeekIndex <= 0 ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                if (currentWeekIndex > 0) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentWeekIndex > 0) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }
              }}
            >
              <ChevronLeft fontSize="small" />
            </button>

            {/* Day labels */}
            <div style={{
              display: 'flex',
              gap: '8px',
              flex: 1,
              justifyContent: 'space-between'
            }}>
              {weekDays.map((day, index) => {
                const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
                const dayDate = day.getDate();
                
                return (
                  <div key={index} style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#2c3e50',
                    fontWeight: '500'
                  }}>
                    <div style={{ fontWeight: '600' }}>{dayName}</div>
                    <div style={{ fontSize: '10px', color: '#7f8c8d', marginTop: '2px' }}>{dayDate}</div>
                  </div>
                );
              })}
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNextWeek}
              disabled={currentWeekIndex >= weeks.length - 1}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: currentWeekIndex >= weeks.length - 1 ? '#ecf0f1' : '#ffffff',
                color: currentWeekIndex >= weeks.length - 1 ? '#bdc3c7' : '#2c3e50',
                cursor: currentWeekIndex >= weeks.length - 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: currentWeekIndex >= weeks.length - 1 ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                if (currentWeekIndex < weeks.length - 1) {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentWeekIndex < weeks.length - 1) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }
              }}
            >
              <ChevronRight fontSize="small" />
            </button>
          </div>

          {/* X-axis label */}
          <div style={{
            textAlign: 'center',
            marginTop: '10px',
            fontSize: '12px',
            color: '#7f8c8d',
            fontWeight: '500'
          }}>
            Days of Week
          </div>
        </div>
      </div>
      
      {/* Summary Section - REMOVED as requested */}
    </div>
  );
};

export default ProgressBarChart;