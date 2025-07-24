import React from 'react';
import { Box, Typography, Card, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
  onEdit?: () => void;
  onDelete?: () => void;
}

const CardWithCircularProgressBar: React.FC<CardWithCircularProgressBarProps> = ({
  goal,
  savingRecords,
  onEdit,
  onDelete
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
    <Card 
      sx={{ 
        p: "6px",
        marginLeft: 3,
        borderRadius: "24px", 
        boxShadow: "0 8px 32px rgba(0, 119, 182, 0.15), 0 2px 8px rgba(0, 119, 182, 0.08)",
        border: "2px solid rgba(0, 119, 182, 0.1)",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0f2fe 100%)",
        width: '450px',
        height: '500px',
        position: 'relative',
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
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
      }}
    >
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

      {/* Main Content */}
      <Box sx={{ 
        p: 3, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header with Goal Name */}
        <Box sx={{ 
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
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
              🎯
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h5" 
              fontWeight="800" 
              sx={{ 
                background: "linear-gradient(135deg, #0077B6 0%, #023E8A 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                letterSpacing: '-0.02em',
                fontSize: '1.3rem',
                lineHeight: 1.2
              }}
            >
              {goal.name || 'Savings Goal'}
            </Typography>
            {goal.description && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#6b7280',
                  mt: 0.5,
                  lineHeight: 1.4,
                  fontWeight: 500
                }}
              >
                {goal.description}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Progress and Amount Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
          {/* Circular Progress */}
          <Box sx={{ 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            padding: '15px',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(0, 119, 182, 0.1)',
            boxShadow: '0 8px 24px rgba(0, 119, 182, 0.15)',
            animation: 'breathe 4s ease-in-out infinite'
          }}>
            <svg width="130" height="130">
              {/* Background circle */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke="rgba(0, 119, 182, 0.1)"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke={progressPercentage > 0 ? 
                  `url(#gradient-${goal.id})` : "rgba(0, 119, 182, 0.1)"}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 65 65)"
                style={{
                  transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: 'drop-shadow(0 2px 8px rgba(0, 119, 182, 0.3))'
                }}
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id={`gradient-${goal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0077B6" />
                  <stop offset="50%" stopColor="#00B4D8" />
                  <stop offset="100%" stopColor="#0077B6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Percentage text in center */}
            <Box sx={{ 
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography
                variant="h4"
                fontWeight="700"
                sx={{
                  fontFamily: 'Poppins, Arial, sans-serif',
                  color: '#22223b',
                  fontSize: '2rem',
                  textAlign: 'center',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  mb: '-2px',
                }}
              >
                {currentSavedAmount.toLocaleString()} LKR
                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{
                    display: 'block',
                    fontFamily: 'Poppins, Arial, sans-serif',
                    fontWeight: 400,
                    fontSize: '1rem',
                    color: '#4a4e69',
                    mt: 0.5,
                  }}
                >
                  Total
                </Typography>
              </Typography>
            </Box>
          </Box>

          {/* Amount Information - Enhanced styling */}
          <Box sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end', 
            gap: 2.5 
          }}>
            <Box sx={{ 
              textAlign: 'right',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              p: 2,
              minWidth: '140px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 119, 182, 0.1)',
              boxShadow: '0 4px 16px rgba(0, 119, 182, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#0077B6',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                🎯 Target Goal
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="700" 
                sx={{ 
                  color: '#0077B6',
                  lineHeight: 1.2,
                  fontSize: '1.2rem',
                  mt: 0.5
                }}
              >
                {goal.targetAmount.toLocaleString()} LKR
              </Typography>
            </Box>

            <Box sx={{ 
              textAlign: 'right',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              p: 2,
              minWidth: '140px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(5, 150, 105, 0.1)',
              boxShadow: '0 4px 16px rgba(5, 150, 105, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#059669',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                💰 Saved Amount
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="700" 
                sx={{ 
                  color: '#059669',
                  lineHeight: 1.2,
                  fontSize: '1.2rem',
                  mt: 0.5
                }}
              >
                {currentSavedAmount.toLocaleString()} LKR
              </Typography>
            </Box>

            <Box sx={{ 
              textAlign: 'right',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              p: 2,
              minWidth: '140px',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${remainingDays > 30 ? 'rgba(0, 119, 182, 0.1)' : 'rgba(220, 38, 38, 0.1)'}`,
              boxShadow: `0 4px 16px ${remainingDays > 30 ? 'rgba(0, 119, 182, 0.1)' : 'rgba(220, 38, 38, 0.1)'}`,
              transition: 'all 0.3s ease'
            }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: remainingDays > 30 ? '#0077B6' : '#dc2626',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                ⏰ Days Left
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight="700" 
                sx={{ 
                  color: remainingDays > 30 ? '#0077B6' : '#dc2626',
                  lineHeight: 1.2,
                  fontSize: '1.2rem',
                  mt: 0.5
                }}
              >
                {remainingDays} Days
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Bottom Action Buttons - Enhanced with matching style */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 1.5,
          mt: 2,
          pt: 2,
          borderTop: '2px solid rgba(0, 119, 182, 0.1)'
        }}>
          <IconButton 
            onClick={onEdit}
            sx={{
              background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.1) 0%, rgba(0, 180, 216, 0.15) 100%)',
              color: '#0077B6',
              width: 48,
              height: 48,
              border: '2px solid rgba(0, 119, 182, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(0, 119, 182, 0.2)',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.15) 0%, rgba(0, 180, 216, 0.2) 100%)',
                transform: 'translateY(-2px) scale(1.05)',
                boxShadow: '0 8px 24px rgba(0, 119, 182, 0.3)',
                border: '2px solid rgba(0, 119, 182, 0.25)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            onClick={onDelete}
            sx={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.15) 100%)',
              color: '#dc2626',
              width: 48,
              height: 48,
              border: '2px solid rgba(220, 38, 38, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(220, 38, 38, 0.2)',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(239, 68, 68, 0.2) 100%)',
                transform: 'translateY(-2px) scale(1.05)',
                boxShadow: '0 8px 24px rgba(220, 38, 38, 0.3)',
                border: '2px solid rgba(220, 38, 38, 0.25)'
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
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
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes celebrate {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </Card>
  );
};

export default CardWithCircularProgressBar;