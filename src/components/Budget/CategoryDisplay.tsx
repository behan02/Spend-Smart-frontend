import React from 'react';
import { Box, Chip, Typography, Tooltip } from '@mui/material';
import { getCategoryIconAndColor } from '../../utils/categoryUtils';

interface CategoryChipProps {
  categoryName: string;
  spentAmount?: number;
  budgetAmount?: number;
  showProgress?: boolean;
  size?: 'small' | 'medium';
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  categoryName,
  spentAmount,
  budgetAmount,
  showProgress = false,
  size = 'medium'
}) => {
  const { icon, color } = getCategoryIconAndColor(categoryName);
  
  const progress = budgetAmount && budgetAmount > 0 
    ? Math.min((spentAmount || 0) / budgetAmount * 100, 100)
    : 0;

  const getProgressColor = () => {
    if (progress >= 90) return '#DC2626'; // Red for overspending
    if (progress >= 70) return '#F59E0B'; // Orange for warning
    return '#22C55E'; // Green for good
  };

  const chipContent = (
    <Chip
      icon={
        <Typography sx={{ fontSize: size === 'small' ? '12px' : '14px' }}>
          {icon}
        </Typography>
      }
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography sx={{ fontSize: size === 'small' ? '12px' : '14px' }}>
            {categoryName}
          </Typography>
          {showProgress && budgetAmount && (
            <Typography 
              sx={{ 
                fontSize: size === 'small' ? '10px' : '12px',
                color: getProgressColor(),
                fontWeight: 'bold'
              }}
            >
              ({progress.toFixed(0)}%)

            </Typography>
          )}
        </Box>
      }
      sx={{
        backgroundColor: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
        '&:hover': {
          backgroundColor: `${color}25`,
        },
        '& .MuiChip-icon': {
          color: color,
        }
      }}
      size={size}
    />
  );

  if (showProgress && spentAmount !== undefined && budgetAmount !== undefined) {
    return (
      <Tooltip
        title={
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {categoryName}
            </Typography>
            <Typography variant="caption">
              Spent: ${spentAmount.toFixed(2)} / ${budgetAmount.toFixed(2)}

            </Typography>
            <Typography variant="caption" sx={{ display: 'block' }}>
              Progress: {progress.toFixed(1)}%
            </Typography>
          </Box>
        }
      >
        {chipContent}
      </Tooltip>
    );
  }

  return chipContent;
};

interface CategoryListProps {
  categories: Array<{
    id: number;
    name: string;
    spentAmount?: number;
    budgetAmount?: number;
  }>;
  showProgress?: boolean;
  maxDisplay?: number;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  showProgress = false,
  maxDisplay = 5
}) => {
  const displayCategories = categories.slice(0, maxDisplay);
  const remainingCount = categories.length - maxDisplay;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {displayCategories.map((category) => (
        <CategoryChip
          key={category.id}
          categoryName={category.name}
          spentAmount={category.spentAmount}
          budgetAmount={category.budgetAmount}
          showProgress={showProgress}
          size="small"
        />
      ))}
      {remainingCount > 0 && (
        <Chip
          label={`+${remainingCount} more`}
          size="small"
          sx={{
            backgroundColor: '#f5f5f5',
            color: '#666',
          }}
        />
      )}
    </Box>
  );
};
