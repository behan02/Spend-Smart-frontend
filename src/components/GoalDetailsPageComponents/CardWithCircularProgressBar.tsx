import React from 'react';

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

  // Circle properties
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div style={{ 
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: "1px solid #e2e8f0",
      backgroundColor: "#ffffff",
      width: '420px',
      height: '400px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header with Goal Name */}
      <div style={{ 
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '35px',
          height: '35px',
          borderRadius: '8px',
          backgroundColor: "#0072ddff",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: 'white', fontSize: '25px' }}>🎯</span>
        </div>
        <div style={{ flex: 1  }}>
            <h3 style={{ 
            margin: 0,
            fontWeight: "bold",
            color: "#1F2937",
            fontSize: '26px',
            fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
            lineHeight: 1.2
            
            }}>
            {goal.name || 'Savings Goal'}
            </h3>
          {goal.description && (
            <p style={{ 
              margin: '4px 0 0 0',
              color: '#6B7280',
              fontSize: '14px',
              fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
              lineHeight: 1.4
            }}>
              {goal.description}
            </p>
          )}
        </div>
      </div>

      {/* Progress and Amount Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flex: 1 }}>
        {/* Circular Progress */}
        <div style={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#F9FAFB',
          borderRadius: '50%',
          padding: '15px',
          border: '1px solid #E5E7EB'
        }}>
          <svg width="130" height="130">
            {/* Background circle */}
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke={progressPercentage >= 100 ? "#10B981" : "#0072ddff"}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 65 65)"
              style={{
                transition: 'stroke-dashoffset 0.5s ease'
              }}
            />
          </svg>
          
          {/* Percentage text in center */}
          <div style={{ 
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ 
              fontSize: '32px',
              fontWeight: "700",
              color: progressPercentage >= 100 ? "#4caf50" : "#0b00dd",
              lineHeight: 1,
              margin: 0
            }}>
              {progressPercentage}%
            </div>
            <div style={{ 
              color: '#666',
              fontSize: '12px',
              fontWeight: '500',
              marginTop: '4px',
              textTransform: 'uppercase'
            }}>
              Complete
            </div>
          </div>
        </div>

        {/* Amount Information */}
        <div style={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-end', 
          gap: '20px' 
        }}>
          <div style={{ 
            textAlign: 'right',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            padding: '16px',
            minWidth: '140px',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ 
              color: '#6B7280',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              marginBottom: '4px',
              fontFamily: '"Inter", "Roboto", "Arial", sans-serif'
            }}>
              🎯 Target Goal
            </div>
            <div style={{ 
              color: '#1F2937',
              lineHeight: 1.2,
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: '"Inter", "Roboto", "Arial", sans-serif'
            }}>
              {goal.targetAmount.toLocaleString()} LKR
            </div>
          </div>

          <div style={{ 
            textAlign: 'right',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            padding: '16px',
            minWidth: '140px',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ 
              color: '#6B7280',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              marginBottom: '4px',
              fontFamily: '"Inter", "Roboto", "Arial", sans-serif'
            }}>
              💰 Saved Amount
            </div>
            <div style={{ 
              color: '#1F2937',
              lineHeight: 1.2,
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: '"Inter", "Roboto", "Arial", sans-serif'
            }}>
              {currentSavedAmount.toLocaleString()} LKR
            </div>
          </div>

          <div style={{ 
            textAlign: 'right',
            backgroundColor: '#F9FAFB',
            borderRadius: '8px',
            padding: '16px',
            minWidth: '140px',
            border: `1px solid ${remainingDays > 30 ? '#E5E7EB' : '#FEE2E2'}`
          }}>
            <div style={{ 
              color: remainingDays > 30 ? '#6B7280' : '#EF4444',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              marginBottom: '4px',
              fontFamily: '"Inter", "Roboto", "Arial", sans-serif'
            }}>
              ⏰ Days Left
            </div>
            <div style={{ 
              color: remainingDays > 30 ? '#1F2937' : '#EF4444',
              lineHeight: 1.2,
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: '"Inter", "Roboto", "Arial", sans-serif'
            }}>
              {remainingDays} Days
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default CardWithCircularProgressBar;