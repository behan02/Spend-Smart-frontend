import React, { useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

const OptimizedProgressBarChart: React.FC<ProgressBarChartProps> = ({ 
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
      // No transactions - prioritize current week if it exists, otherwise the last week
      const currentDate = new Date();
      const currentWeekStart = getWeekStart(currentDate);
      
      // Check if current week is in our weeks array
      const currentWeekInArray = weeks.find(week => 
        week.getTime() === currentWeekStart.getTime()
      );
      
      if (currentWeekInArray) {
        console.log('No transactions, but current week is in range:', currentWeekStart.toDateString());
        return currentWeekStart;
      } else {
        // Return the most recent week (last in array)
        const lastWeek = weeks[weeks.length - 1] || new Date();
        console.log('No transactions, returning last week:', lastWeek.toDateString());
        return lastWeek;
      }
    }

    // Sort records by date (most recent first)
    const sortedRecords = [...records].sort((a, b) => b.date.getTime() - a.date.getTime());
    const mostRecentRecord = sortedRecords[0];

    console.log('Most recent transaction date:', mostRecentRecord.date.toDateString());

    // Find which week contains this record
    for (const week of weeks) {
      const weekEnd = new Date(week);
      weekEnd.setDate(week.getDate() + 6);
      
      if (mostRecentRecord.date >= week && mostRecentRecord.date <= weekEnd) {
        console.log('Found matching week for transaction:', week.toDateString());
        return week;
      }
    }

    // If not found, return the last week (most recent)
    const fallbackWeek = weeks[weeks.length - 1] || new Date();
    console.log('Transaction week not found, using last week:', fallbackWeek.toDateString());
    return fallbackWeek;
  };

  // Initialize weeks and current week
  useEffect(() => {
    console.log('=== INITIALIZING WEEKS ===');
    console.log('Goal Creation Date:', goalCreationDate);
    console.log('Goal Deadline:', goalDeadline);
    
    const generatedWeeks = generateWeeks();
    console.log('Generated weeks:', generatedWeeks.length, generatedWeeks.map(w => w.toDateString()));
    setWeeks(generatedWeeks);
    
    if (generatedWeeks.length > 0) {
      // Always start with the most recent week (current week or week with most recent transaction)
      const currentDate = new Date();
      const currentWeekStart = getWeekStart(currentDate);
      
      // Check if current week is within our range
      const isCurrentWeekInRange = generatedWeeks.some(week => 
        week.getTime() === currentWeekStart.getTime()
      );
      
      let initialWeek: Date;
      if (isCurrentWeekInRange) {
        // If current week is in range, use it
        initialWeek = currentWeekStart;
        console.log('Using current week:', initialWeek.toDateString());
      } else {
        // Otherwise find the most recent transaction week or use the last week
        if (savingRecords.length > 0) {
          initialWeek = findMostRecentTransactionWeek(generatedWeeks, savingRecords);
          console.log('Using most recent transaction week:', initialWeek.toDateString());
        } else {
          // No transactions, use the last week (most recent)
          initialWeek = generatedWeeks[generatedWeeks.length - 1];
          console.log('No transactions, using last week:', initialWeek.toDateString());
        }
      }
      
      setCurrentWeekStart(initialWeek);
    }
  }, [goalDeadline, goalCreationDate]);

  // Update current week when savingRecords change (but not on initial load)
  useEffect(() => {
    console.log('=== SAVING RECORDS CHANGED ===');
    console.log('Saving records:', savingRecords.length);
    console.log('Weeks:', weeks.length);
    
    if (weeks.length > 0 && savingRecords.length > 0) {
      const recentWeek = findMostRecentTransactionWeek(weeks, savingRecords);
      console.log('Setting current week to most recent transaction week:', recentWeek.toDateString());
      setCurrentWeekStart(recentWeek);
    }
  }, [savingRecords]);

  const currentWeekIndex = weeks.findIndex(week => 
    week.getTime() === currentWeekStart.getTime()
  );

  console.log('=== CURRENT STATE ===');
  console.log('Current week index:', currentWeekIndex);
  console.log('Total weeks:', weeks.length);
  console.log('Current week start:', currentWeekStart.toDateString());
  console.log('Can go previous:', currentWeekIndex > 0);
  console.log('Can go next:', currentWeekIndex < weeks.length - 1);

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
        seriesData: new Array(7).fill(0),
        cumulativeData: new Array(7).fill(0)
      };
    }

    // Create data for each day of the week
    const weekData = weekDays.map(day => {
      const dayRecords = savingRecords.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.toDateString() === day.toDateString();
      });
      
      return {
        date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: dayRecords.reduce((sum, record) => sum + record.amount, 0)
      };
    });

    const seriesData = weekData.map(d => d.amount);
    
    // Calculate total saved from ALL records (not just current week)
    const totalSaved = savingRecords.reduce((sum, record) => sum + record.amount, 0);
    const cumulativeData = [totalSaved];

    return { seriesData, cumulativeData };
  };

  const { seriesData, cumulativeData } = processWeekData();
  
  const totalSaved = cumulativeData && cumulativeData.length > 0 ? cumulativeData[0] : 0;
  const progressPercentage = goalTargetAmount > 0 ? (totalSaved / goalTargetAmount) * 100 : 0;

  // Calculate max value for scaling bars
  const maxAmountFromData = seriesData && seriesData.length > 0 ? Math.max(...seriesData) : 0;
  const maxAmount = Math.max(maxAmountFromData, 100);

  // Navigation functions
  const goToPreviousWeek = () => {
    console.log('Previous week clicked');
    console.log('Current week index:', currentWeekIndex);
    console.log('Weeks length:', weeks.length);
    
    if (currentWeekIndex > 0 && weeks.length > 0) {
      const newWeekStart = weeks[currentWeekIndex - 1];
      console.log('Setting new week start:', newWeekStart);
      setCurrentWeekStart(newWeekStart);
    }
  };

  const goToNextWeek = () => {
    console.log('Next week clicked');
    console.log('Current week index:', currentWeekIndex);
    console.log('Weeks length:', weeks.length);
    
    if (currentWeekIndex < weeks.length - 1 && weeks.length > 0) {
      const newWeekStart = weeks[currentWeekIndex + 1];
      console.log('Setting new week start:', newWeekStart);
      setCurrentWeekStart(newWeekStart);
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
      width: '100%',
      height: '400px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div>
          <h3 style={{ 
            margin: 0,
            fontWeight: "600",
            color: "#1e293b",
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📊 Saving Progress
          </h3>
          <p style={{ 
            margin: '4px 0 0 0',
            fontSize: '14px',
            color: '#64748b'
          }}>
            🗓️ Week: {formatWeekRange()}
          </p>
          <p style={{ 
            margin: '2px 0 0 0',
            fontSize: '12px',
            color: '#94a3b8'
          }}>
            Week {currentWeekIndex + 1} of {weeks.length} • Use arrows to navigate
          </p>
        </div>
        
        {/* Progress indicator */}
        <div style={{
          textAlign: 'right'
        }}>
          <div style={{ 
            fontSize: '28px',
            fontWeight: "700",
            color: progressPercentage >= 100 ? '#10b981' : '#0b00dd',
            margin: 0
          }}>
            {progressPercentage.toFixed(0)}%
          </div>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>
            Complete
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: '12px',
        padding: '24px',
        flex: 1,
        border: '1px solid #e2e8f0',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Chart with Axes */}
        <div style={{ 
          height: '260px',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '10px',
          position: 'relative'
        }}>
          {/* Y-axis label */}
          <div style={{
            position: 'absolute',
            left: '-35px',
            top: '50%',
            transform: 'rotate(-90deg) translateY(-50%)',
            transformOrigin: 'center',
            fontSize: '12px',
            color: '#64748b',
            fontWeight: '500',
            whiteSpace: 'nowrap'
          }}>
            Amount (LKR)
          </div>

          {/* Chart area */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            height: '200px',
            paddingLeft: '60px',
            paddingRight: '20px',
            paddingBottom: '40px',
            position: 'relative'
          }}>
            {/* Y-axis labels */}
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
              {[4, 3, 2, 1, 0].map((level) => (
                <div key={level} style={{
                  fontSize: '11px',
                  color: '#64748b',
                  textAlign: 'right',
                  paddingRight: '10px'
                }}>
                  {Math.round((maxAmount * level) / 4)}
                </div>
              ))}
            </div>

            {/* Grid lines */}
            <div style={{
              position: 'absolute',
              left: '60px',
              right: '20px',
              top: '0',
              bottom: '40px',
              pointerEvents: 'none'
            }}>
              {[4, 3, 2, 1, 0].map((level) => (
                <div key={level} style={{
                  position: 'absolute',
                  top: `${(4 - level) * 25}%`,
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundColor: level === 0 ? '#e2e8f0' : '#f8fafc'
                }} />
              ))}
            </div>

            {/* Bars */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: '100%',
              flex: 1,
              gap: '12px',
              paddingLeft: '60px'
            }}>
              {seriesData && seriesData.map((amount, index) => {
                const barHeight = maxAmount > 0 ? (amount / maxAmount) * 160 : 0;
                const isHovered = hoveredBar === index;
                
                return (
                  <div key={index} style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    position: 'relative',
                    minWidth: '50px'
                  }}>
                    {/* Tooltip */}
                    {amount > 0 && isHovered && (
                      <div style={{
                        position: 'absolute',
                        bottom: `${barHeight + 20}px`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#1e293b',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        zIndex: 10,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}>
                        LKR {amount.toLocaleString()}
                      </div>
                    )}
                    
                    {/* Bar */}
                    <div 
                      style={{
                        width: '100%',
                        maxWidth: '60px',
                        height: `${Math.max(barHeight, 4)}px`,
                        backgroundColor: amount > 0 ? (isHovered ? '#0900bb' : '#0b00dd') : '#e2e8f0',
                        borderRadius: '6px 6px 0 0',
                        transition: 'all 0.3s ease',
                        boxShadow: amount > 0 ? (isHovered ? '0 4px 12px rgba(11, 0, 221, 0.4)' : '0 2px 8px rgba(11, 0, 221, 0.2)') : 'none',
                        cursor: amount > 0 ? 'pointer' : 'default',
                        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                        border: amount > 0 ? '2px solid rgba(11, 0, 221, 0.3)' : 'none'
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
            gap: '12px',
            position: 'relative'
          }}>
            {/* Left Arrow */}
            <button
              onClick={goToPreviousWeek}
              disabled={currentWeekIndex <= 0}
              style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '2px solid #e2e8f0',
                backgroundColor: currentWeekIndex <= 0 ? '#f8fafc' : '#ffffff',
                color: currentWeekIndex <= 0 ? '#cbd5e1' : '#475569',
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
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
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
              <ArrowBackIosIcon 
                sx={{ 
                  fontSize: '16px',
                  color: currentWeekIndex <= 0 ? '#cbd5e1' : '#475569'
                }} 
              />
            </button>

            {/* Day labels */}
            <div style={{
              display: 'flex',
              gap: '12px',
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
                    fontSize: '12px',
                    color: '#475569',
                    fontWeight: '500',
                    minWidth: '50px'
                  }}>
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{dayName}</div>
                    <div style={{ fontSize: '10px', color: '#64748b' }}>{dayDate}</div>
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
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '2px solid #e2e8f0',
                backgroundColor: currentWeekIndex >= weeks.length - 1 ? '#f8fafc' : '#ffffff',
                color: currentWeekIndex >= weeks.length - 1 ? '#cbd5e1' : '#475569',
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
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
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
              <ArrowForwardIosIcon 
                sx={{ 
                  fontSize: '16px',
                  color: currentWeekIndex >= weeks.length - 1 ? '#cbd5e1' : '#475569'
                }} 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizedProgressBarChart;
