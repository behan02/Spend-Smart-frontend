import React, { useState } from 'react';
import { Goal as BaseGoal } from '../../services/goalService';

// Extend the Goal interface to include remainingDays
interface Goal extends BaseGoal {
  remainingDays?: number;
}

// Material UI style icons as SVG components
const TrendingUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="m7 14 5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m21 7-6 6-4-4-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TargetIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="2"/>
  </svg>
);

const AccountBalanceIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 10h16M4 10l8-6 8 6v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10zM9 21V12h6v9" 
          stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScheduleIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface SavingRecord {
  id: number;
  amount: number;
  date: string;
  time?: string;
  description?: string;
  goalId: number;
}

interface CardWithCircularProgressBarProps {
  goal: Goal;
  savingRecords: SavingRecord[];
}

// Enhanced Goal Status Algorithm
const calculateGoalStatus = (goal: Goal) => {
  const currentAmount = goal.currentAmount;
  const targetAmount = goal.targetAmount;
  const remainingDays = goal.remainingDays || 0;
  
  // Calculate progress percentages
  const amountProgress = targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;
  
  // Calculate timeline progress (assuming goal has a total duration)
  // We need to derive total duration from remaining days and current progress
  // For this calculation, we'll assume the goal started when currentAmount was 0
  // and estimate total duration based on current progress and remaining days
  
  let timelineProgress = 0;
  let totalDuration = 0;
  
  if (remainingDays >= 0) {
    // If we know remaining days, we can estimate total duration
    // Using a simple estimation: if we have some progress, we can estimate how long it took
    if (amountProgress > 0 && remainingDays > 0) {
      // Estimate total duration based on current progress rate
      const estimatedTotalDays = (remainingDays * 100) / (100 - amountProgress);
      totalDuration = estimatedTotalDays;
      const elapsedDays = totalDuration - remainingDays;
      timelineProgress = (elapsedDays / totalDuration) * 100;
    } else if (remainingDays === 0) {
      // Goal deadline has passed
      timelineProgress = 100;
      totalDuration = 1; // Avoid division by zero
    } else if (amountProgress === 0) {
      // No progress yet, assume just started
      timelineProgress = 5; // Assume minimal time has passed
      totalDuration = remainingDays / 0.95; // Rough estimate
    }
  }
  
  // Ensure values are within bounds
  const clampedAmountProgress = Math.max(0, Math.min(100, amountProgress));
  const clampedTimelineProgress = Math.max(0, Math.min(100, timelineProgress));
  
  // Calculate the difference between amount progress and timeline progress
  const progressDifference = clampedAmountProgress - clampedTimelineProgress;
  
  // Enhanced status determination algorithm
  const getGoalStatus = () => {
    // Goal completed
    if (clampedAmountProgress >= 100) {
      if (remainingDays > 0) {
        return {
          status: 'Completed Early',
          color: '#10B981', // Green
          priority: 'excellent'
        };
      } else {
        return {
          status: 'Completed',
          color: '#10B981', // Green
          priority: 'excellent'
        };
      }
    }
    
    // Goal overdue
    if (remainingDays <= 0 && clampedAmountProgress < 100) {
      return {
        status: 'Overdue',
        color: '#DC2626', // Red
        priority: 'urgent'
      };
    }
    
    // Very close to deadline
    if (remainingDays <= 7 && remainingDays > 0) {
      if (clampedAmountProgress >= 90) {
        return {
          status: 'Almost Done',
          color: '#10B981', // Green
          priority: 'good'
        };
      } else if (clampedAmountProgress >= 70) {
        return {
          status: 'Final Push',
          color: '#F59E0B', // Yellow
          priority: 'warning'
        };
      } else {
        return {
          status: 'Critical',
          color: '#EF4444', // Red
          priority: 'urgent'
        };
      }
    }
    
    // Progress-based status (for non-critical timelines)
    if (progressDifference >= 15) {
      // Significantly ahead of schedule
      return {
        status: 'Ahead of Schedule',
        color: '#059669', // Dark green
        priority: 'excellent'
      };
    } else if (progressDifference >= 5) {
      // Slightly ahead
      return {
        status: 'Ahead',
        color: '#10B981', // Green
        priority: 'good'
      };
    } else if (progressDifference >= -5) {
      // On track (within 5% tolerance)
      return {
        status: 'On Track',
        color: '#3B82F6', // Blue
        priority: 'good'
      };
    } else if (progressDifference >= -15) {
      // Slightly behind
      return {
        status: 'Behind Schedule',
        color: '#F59E0B', // Orange
        priority: 'warning'
      };
    } else if (progressDifference >= -25) {
      // Significantly behind
      return {
        status: 'Falling Behind',
        color: '#EF4444', // Red
        priority: 'urgent'
      };
    } else {
      // Very far behind
      return {
        status: 'Needs Attention',
        color: '#DC2626', // Dark red
        priority: 'critical'
      };
    }
  };
  
  const statusInfo = getGoalStatus();
  
  return {
    ...statusInfo,
    amountProgress: clampedAmountProgress,
    timelineProgress: clampedTimelineProgress,
    progressDifference,
    remainingDays,
    debugInfo: {
      amountProgress: clampedAmountProgress.toFixed(1),
      timelineProgress: clampedTimelineProgress.toFixed(1),
      progressDifference: progressDifference.toFixed(1),
      totalDuration: totalDuration.toFixed(1)
    }
  };
};

const CardWithCircularProgressBar: React.FC<CardWithCircularProgressBarProps> = ({
  goal,
  savingRecords
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Calculate total saved amount from records
  const totalSavedFromRecords = savingRecords.reduce((total, record) => total + record.amount, 0);
  
  // The backend already includes saving records in currentAmount,
  // so we use the goal's currentAmount directly to avoid double counting
  const currentSavedAmount = goal.currentAmount;
  
  // Use the enhanced algorithm to get goal status
  const goalStatusInfo = calculateGoalStatus(goal);
  
  // Calculate progress percentage for the circle
  const progressPercentage = Math.min(100, Math.round(goalStatusInfo.amountProgress));
  
  // Calculate remaining amount
  const remainingAmount = Math.max(0, goal.targetAmount - currentSavedAmount);

  // Circle properties
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = progressPercentage === 100 
    ? 0 
    : circumference - (progressPercentage / 100) * circumference;

  return (
    <div 
      style={{ 
        padding: '28px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        boxShadow: isHovered 
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: "1px solid rgba(226, 232, 240, 0.8)",
        width: '480px',
        height: '406px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        transform: 'translate(50%, -50%)'
      }} />

      {/* Header Section */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}>
              <TargetIcon size={20} color="white" />
            </div>
            <div style={{
              padding: '4px 12px',
              backgroundColor: goalStatusInfo.color + '15',
              borderRadius: '20px',
              border: `1px solid ${goalStatusInfo.color}30`
            }}>
              <span style={{ 
                color: goalStatusInfo.color,
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {goalStatusInfo.status}
              </span>
            </div>
          </div>
          
          <h3 style={{ 
            margin: '0 0 6px 0',
            fontWeight: "700",
            color: "#1F2937",
            fontSize: '24px',
            fontFamily: '"Inter", system-ui, sans-serif',
            lineHeight: 1.2,
            letterSpacing: '-0.5px'
          }}>
            {goal.name || 'Savings Goal'}
          </h3>

          {goal.description && (
            <p style={{ 
              margin: 0,
              color: '#6B7280',
              fontSize: '14px',
              fontFamily: '"Inter", system-ui, sans-serif',
              lineHeight: 1.5,
              opacity: showDetails ? 1 : 0.8
            }}>
              {goal.description}
            </p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: '32px', 
        flex: 1,
        minHeight: '240px'
      }}>
        {/* Enhanced Circular Progress */}
        <div style={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0,
          flex: 1
        }}>
          {/* Outer glow effect */}
          <div style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: `conic-gradient(from 0deg, ${goalStatusInfo.color}20 0deg, ${goalStatusInfo.color}10 ${progressPercentage * 3.6}deg, transparent ${progressPercentage * 3.6}deg)`,
            filter: 'blur(10px)',
            opacity: 0.6
          }} />
          
          <svg width="200" height="200" style={{ position: 'relative', zIndex: 1 }}>
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="rgba(229, 231, 235, 0.8)"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke={goalStatusInfo.color}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              style={{
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />
          </svg>
          
          {/* Center content */}
          <div style={{ 
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ 
              fontSize: '32px',
              fontWeight: "800",
              color: goalStatusInfo.color,
              lineHeight: 1,
              margin: 0,
              fontFamily: '"Inter", system-ui, sans-serif'
            }}>
              {progressPercentage}%
            </div>
            <div style={{ 
              color: '#9CA3AF',
              fontSize: '12px',
              fontWeight: '600',
              marginTop: '2px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Progress
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '12px',
          height: '100%',
          minHeight: '220px'
        }}>
          {/* Target Amount */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.05) 100%)',
            borderRadius: '10px',
            padding: '10px',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            flex: '1',
            width: '100%',
            height: '60px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <TargetIcon size={14} color="#3B82F6" />
              <span style={{ 
                color: '#6B7280',
                fontSize: '10px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Target Goal
              </span>
            </div>
            <div style={{ 
              color: '#1F2937',
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: '"Inter", system-ui, sans-serif'
            }}>
              {goal.targetAmount.toLocaleString()} LKR
            </div>
          </div>

          {/* Current Savings */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(110, 231, 183, 0.05) 100%)',
            borderRadius: '10px',
            padding: '10px',
            border: '1px solid rgba(16, 185, 129, 0.1)',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            flex: '1',
            width: '100%',
            height: '60px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <AccountBalanceIcon size={14} color="#10B981" />
              <span style={{ 
                color: '#6B7280',
                fontSize: '10px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Current Savings
              </span>
            </div>
            <div style={{ 
              color: '#1F2937',
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: '"Inter", system-ui, sans-serif'
            }}>
              {currentSavedAmount.toLocaleString()} LKR
            </div>
          </div>

          {/* Days Remaining */}
          <div style={{
            background: goal.remainingDays <= 30 
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(252, 165, 165, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%)',
            borderRadius: '10px',
            padding: '10px',
            border: `1px solid ${goal.remainingDays <= 30 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            flex: '1',
            width: '100%',
            height: '60px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ScheduleIcon size={14} color={goal.remainingDays <= 30 ? '#EF4444' : '#F59E0B'} />
              <span style={{ 
                color: '#6B7280',
                fontSize: '10px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Time Remaining
              </span>
            </div>
            <div style={{ 
              color: goal.remainingDays <= 30 ? '#EF4444' : '#1F2937',
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: '"Inter", system-ui, sans-serif'
            }}>
              {goal.remainingDays} Days
            </div>
          </div>
        </div>
      </div>

      {/* Footer with additional info */}
      {showDetails && (
        <div style={{
          marginTop: '20px',
          padding: '16px 0',
          borderTop: '1px solid rgba(229, 231, 235, 0.5)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          animation: 'fadeIn 0.3s ease',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUpIcon />
            <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>
              {remainingAmount > 0 ? `${remainingAmount.toLocaleString()} LKR remaining` : 'Goal achieved!'}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
            <span style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: '"Inter", system-ui, sans-serif' }}>
              {savingRecords.length} transactions
            </span>
            {/* Debug info - remove in production */}
            <span style={{ fontSize: '10px', color: '#D1D5DB', fontFamily: 'monospace' }}>
              Progress Diff: {goalStatusInfo.progressDifference.toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardWithCircularProgressBar;