import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';
import SavingRecord, { SavingRecord as SavingRecordType } from './SavingRecord';

interface SavingRecordsHistoryTableProps {
  records: SavingRecordType[];
}

const SavingRecordsHistoryTable: React.FC<SavingRecordsHistoryTableProps> = ({ records }) => {
  return (
    <Box sx={{ mt: 4, position: 'relative' }}>
      {/* Decorative background elements */}
      <Box sx={{
        position: 'absolute',
        top: -30,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 119, 182, 0.06) 0%, transparent 70%)',
        zIndex: 0,
        animation: 'float 8s ease-in-out infinite'
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: -20,
        left: -20,
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 180, 216, 0.04) 0%, transparent 70%)',
        zIndex: 0,
        animation: 'float 6s ease-in-out infinite reverse'
      }} />

      {/* Header with enhanced styling */}
      <Box sx={{ 
        ml:5,
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        position: 'relative',
        zIndex: 1
      }}>
        <Box sx={{
          width: 40,
          height: 40,
          borderRadius: '12px',
          background: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: "0 4px 16px rgba(0, 119, 182, 0.3)",
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            📊
          </Typography>
        </Box>
        <Typography 
          variant="h5" 
          sx={{ 
            background: "linear-gradient(135deg, #0077B6 0%, #023E8A 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontWeight: '800',
            letterSpacing: '-0.02em',
            fontSize: '1.3rem'
          }}
        >
          Savings History
        </Typography>
      </Box>
      
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0, 119, 182, 0.15), 0 2px 8px rgba(0, 119, 182, 0.08)",
          border: "2px solid rgba(0, 119, 182, 0.1)",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e0f2fe 100%)",
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          bottom:10,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 16px 48px rgba(0, 119, 182, 0.2), 0 4px 16px rgba(0, 119, 182, 0.15)",
            transform: "translateY(-2px)",
            border: "2px solid rgba(0, 119, 182, 0.2)"
          },
          "&::before": {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
           
            zIndex: 1,
            animation: 'shimmer 3s ease-in-out infinite'
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ 
              background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.08) 0%, rgba(0, 180, 216, 0.05) 100%)',
              '& .MuiTableCell-root': {
                borderBottom: '2px solid rgba(0, 119, 182, 0.15)',
                py: 2
              }
            }}>
              <TableCell>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: '700',
                    color: '#0077B6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.75rem'
                  }}
                >
                  📅 Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: '700',
                    color: '#0077B6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.75rem'
                  }}
                >
                  ⏰ Time
                </Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: '700',
                    color: '#0077B6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.75rem'
                  }}
                >
                  📝 Description
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: '700',
                    color: '#0077B6',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.75rem'
                  }}
                >
                  💰 Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length > 0 ? (
              records.map((record, index) => (
                <TableRow 
                  key={record.id}
                  sx={{
                    background: index % 2 === 0 
                      ? 'rgba(255, 255, 255, 0.8)' 
                      : 'rgba(0, 119, 182, 0.02)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(0, 119, 182, 0.08)',
                      transform: 'translateX(4px)',
                      boxShadow: '0 4px 16px rgba(0, 119, 182, 0.1)',
                      '& .MuiTableCell-root': {
                        borderBottom: '1px solid rgba(0, 119, 182, 0.2)'
                      }
                    },
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid rgba(0, 119, 182, 0.1)',
                      py: 2
                    }
                  }}
                >
                  <SavingRecord record={record} />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={4} 
                  align="center" 
                  sx={{ 
                    py: 6,
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderBottom: 'none'
                  }}
                >
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Box sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '20px',
                      background: "linear-gradient(135deg, rgba(0, 119, 182, 0.1) 0%, rgba(0, 180, 216, 0.15) 100%)",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: "0 4px 16px rgba(0, 119, 182, 0.2)",
                      animation: 'breathe 4s ease-in-out infinite'
                    }}>
                      <Typography variant="h4" sx={{ color: '#0077B6' }}>
                        📈
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#0077B6',
                        fontWeight: '600',
                        textAlign: 'center'
                      }}
                    >
                      No Savings Records Yet
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6b7280',
                        textAlign: 'center',
                        maxWidth: '300px',
                        fontWeight: '500'
                      }}
                    >
                      Start your savings journey by clicking "Add Saving Record" to track your progress towards your goals.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: 200px 0; }
        }
      `}</style>
    </Box>
  );
};

export default SavingRecordsHistoryTable;