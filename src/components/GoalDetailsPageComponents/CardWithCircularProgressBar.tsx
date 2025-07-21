import React, { useState } from 'react';

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



interface Goal {
  id: number;
  name: string;
  savedAmount: number;
  targetAmount: number;
  progress: number;
  deadline?: Date;
  description?: string;
  remainingDays?: number;
}

interface SavingRecord {
  id: number;
  amount: number;
  date: Date;
  description?: string;
  goalId: number;
}

interface CardWithCircularProgressBarProps {
  goal: Goal;
  savingRecords: SavingRecord[];
}

const CardWithCircularProgressBar: React.FC<CardWithCircularProgressBarProps> = ({
  goal,
  savingRecords
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Calculate total saved amount from records
  const totalSavedFromRecords = savingRecords.reduce((total, record) => total + record.amount, 0);
  
  // Calculate current saved amount (initial saved + records)
  const currentSavedAmount = goal.savedAmount + totalSavedFromRecords;
  
  // Calculate progress percentage
  const progressPercentage = goal.targetAmount > 0 
    ? Math.min(100, Math.round((currentSavedAmount / goal.targetAmount) * 100))
    : 0;
  
  // Calculate remaining days
  const remainingDays = goal.remainingDays || 0;
  const remainingAmount = Math.max(0, goal.targetAmount - currentSavedAmount);

  // Circle properties
  const radius = 90; // Changed from 55 to match the SVG circle radius
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = progressPercentage === 100 
    ? 0 
    : circumference - (progressPercentage / 100) * circumference;

  // Status based on progress
  const getStatusColor = () => {
    if (progressPercentage >= 100) return '#10B981';
    if (progressPercentage >= 75) return '#059669';
    if (progressPercentage >= 50) return '#3B82F6';
    if (progressPercentage >= 25) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusText = () => {
    if (progressPercentage >= 100) return 'Completed';
    if (progressPercentage >= 75) return 'Almost There';
    if (progressPercentage >= 50) return 'On Track';
    if (progressPercentage >= 25) return 'Getting Started';
    return 'Just Started';
  };

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
              backgroundColor: getStatusColor() + '15',
              borderRadius: '20px',
              border: `1px solid ${getStatusColor()}30`
            }}>
              <span style={{ 
                color: getStatusColor(),
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {getStatusText()}
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
        justifyContent: 'space-between', // Align items to opposite sides
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
          flex: 1 // Take up remaining space
        }}>
          {/* Outer glow effect */}
          <div style={{
            position: 'absolute',
            width: '220px', // Enlarged width
            height: '220px', // Enlarged height
            borderRadius: '50%',
            background: `conic-gradient(from 0deg, ${getStatusColor()}20 0deg, ${getStatusColor()}10 ${progressPercentage * 3.6}deg, transparent ${progressPercentage * 3.6}deg)`,
            filter: 'blur(10px)', // Adjusted blur for larger size
            opacity: 0.6
          }} />
          
          <svg width="200" height="200" style={{ position: 'relative', zIndex: 1 }}>
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90" // Enlarged radius
              stroke="rgba(229, 231, 235, 0.8)"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="90" // Enlarged radius
              stroke={getStatusColor()}
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
              fontSize: '32px', // Enlarged font size
              fontWeight: "800",
              color: getStatusColor(),
              lineHeight: 1,
              margin: 0,
              fontFamily: '"Inter", system-ui, sans-serif'
            }}>
              {progressPercentage}%
            </div>
            <div style={{ 
              color: '#9CA3AF',
              fontSize: '12px', // Adjusted font size
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
          flex: 1, // Align to the right side
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
            width: '100%', // Full width
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
            width: '100%', // Full width
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
            background: remainingDays <= 30 
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(252, 165, 165, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%)',
            borderRadius: '10px',
            padding: '10px',
            border: `1px solid ${remainingDays <= 30 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
            transition: 'all 0.3s ease',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            flex: '1',
            width: '100%', // Full width
            height: '60px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ScheduleIcon size={14} color={remainingDays <= 30 ? '#EF4444' : '#F59E0B'} />
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
              color: remainingDays <= 30 ? '#EF4444' : '#1F2937',
              fontSize: '18px',
              fontWeight: '700',
              fontFamily: '"Inter", system-ui, sans-serif'
            }}>
              {remainingDays} Days
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
          <span style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: '"Inter", system-ui, sans-serif' }}>
            {savingRecords.length} transactions
          </span>
        </div>
      )}
    </div>
  );
};

export default CardWithCircularProgressBar;