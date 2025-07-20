import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface SavingRecord {
  id: number;
  amount: number;
  date: string; // ISO string format for API compatibility
  description?: string;
  goalId: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SavingRecordsHistoryTableProps {
  records: SavingRecord[];
  onDeleteRecord?: (recordId: number) => void;
}

const SavingRecordsHistoryTable: React.FC<SavingRecordsHistoryTableProps> = ({ 
  records, 
  onDeleteRecord 
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatAmount = (amount: number) => {
    return `+${amount.toFixed(2)} LKR`;
  };

  const handleDeleteClick = async (recordId: number) => {
    if (!onDeleteRecord) return;
    
    if (window.confirm('Are you sure you want to delete this saving record?')) {
      setDeletingRecord(recordId);
      try {
        await onDeleteRecord(recordId);
      } catch (error) {
        console.error('Error deleting record:', error);
      } finally {
        setDeletingRecord(null);
      }
    }
  };

  return (
    <div style={{ marginTop: '32px', position: 'relative' }}>
      {/* Header */}
      <div style={{ 
        marginLeft: '40px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          backgroundColor: "#0b00dd",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
            📊
          </span>
        </div>
        <h2 style={{ 
          margin: 0,
          color: "#0b00dd",
          fontWeight: '700',
          fontSize: '22px'
        }}>
          Savings History
        </h2>
      </div>
      
      <div style={{ 
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e0e0e0",
        backgroundColor: "#ffffff",
        overflow: 'hidden',
        marginBottom: '40px'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #e0e0e0'
            }}>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '700',
                color: '#0b00dd',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '0.5px'
              }}>
                📅 Date
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '700',
                color: '#0b00dd',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '0.5px'
              }}>
                ⏰ Time
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '700',
                color: '#0b00dd',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '0.5px'
              }}>
                📝 Description
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'right',
                fontWeight: '700',
                color: '#0b00dd',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '0.5px'
              }}>
                💰 Amount
              </th>
              <th style={{
                padding: '16px',
                textAlign: 'center',
                fontWeight: '700',
                color: '#0b00dd',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '0.5px',
                width: '80px'
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr 
                  key={record.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa',
                    borderBottom: '1px solid #e0e0e0',
                    transition: 'all 0.2s ease',
                    opacity: deletingRecord === record.id ? 0.5 : 1
                  }}
                  onMouseEnter={() => setHoveredRow(record.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={{
                    padding: '16px',
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: hoveredRow === record.id ? '#f0f7ff' : 'transparent'
                  }}>
                    <div style={{ fontSize: '14px', color: '#333' }}>
                      {formatDate(record.date)}
                    </div>
                  </td>
                  <td style={{
                    padding: '16px',
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: hoveredRow === record.id ? '#f0f7ff' : 'transparent'
                  }}>
                    <div style={{ fontSize: '14px', color: '#333' }}>
                      {formatTime(record.date)}
                    </div>
                  </td>
                  <td style={{
                    padding: '16px',
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: hoveredRow === record.id ? '#f0f7ff' : 'transparent'
                  }}>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {record.description || 'Necessities'}
                    </div>
                  </td>
                  <td style={{
                    padding: '16px',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'right',
                    backgroundColor: hoveredRow === record.id ? '#f0f7ff' : 'transparent'
                  }}>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#4CAF50' 
                    }}>
                      {formatAmount(record.amount)}
                    </div>
                  </td>
                  <td style={{
                    padding: '16px',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'center',
                    backgroundColor: hoveredRow === record.id ? '#f0f7ff' : 'transparent'
                  }}>
                    {onDeleteRecord && (
                      <Tooltip title="Delete record" arrow>
                        <IconButton
                          onClick={() => handleDeleteClick(record.id)}
                          disabled={deletingRecord === record.id}
                          size="small"
                          sx={{
                            color: '#e74c3c',
                            opacity: hoveredRow === record.id ? 1 : 0.6,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: '#ffebee',
                              color: '#c62828',
                              transform: 'scale(1.1)'
                            },
                            '&:disabled': {
                              color: '#bdc3c7',
                              cursor: 'not-allowed'
                            }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={5} 
                  style={{ 
                    padding: '48px',
                    textAlign: 'center',
                    backgroundColor: '#ffffff',
                    borderBottom: 'none'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      backgroundColor: '#f0f7ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #e3f2fd'
                    }}>
                      <span style={{ fontSize: '32px' }}>📈</span>
                    </div>
                    <h3 style={{ 
                      margin: 0,
                      color: '#0b00dd',
                      fontWeight: '600',
                      fontSize: '18px'
                    }}>
                      No Savings Records Yet
                    </h3>
                    <p style={{ 
                      margin: 0,
                      color: '#666',
                      textAlign: 'center',
                      maxWidth: '300px',
                      fontSize: '14px',
                      lineHeight: 1.5
                    }}>
                      Start your savings journey by clicking "Add Saving Record" to track your progress towards your goals.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavingRecordsHistoryTable;