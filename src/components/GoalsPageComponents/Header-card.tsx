import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface HeaderProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  imagePath: string;
}

const HeaderCard: React.FC<HeaderProps> = ({ 
  title, 
  description, 
  buttonText, 
  onButtonClick,
  imagePath 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        backgroundColor: '#9ebbd9',
        borderRadius: '12px',
        padding: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'visible', // Changed from 'hidden' to allow overflow
        minHeight: '240px',
        width: '100%',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 8px 25px rgba(0,0,0,0.12)' 
          : '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}>
      <Box sx={{
        maxWidth: '55%',
        zIndex: 1,
        paddingLeft: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'normal', mb: 0.5 }}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: '20px', fontWeight: 'normal', mb: 2 }}>
          {description}
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: '#0d47a1',
            color: 'white',
            borderRadius: '30px',
            textTransform: 'none',
            padding: '10px 20px',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Box>
      
      <Box 
        component="img" 
        src={imagePath} 
        alt="Banner illustration"
        sx={{
          position: 'absolute',
          right: '-200px', // Move the image to the right to create overflow
          top: '-85px', // Move the image up slightly to create overflow
          width: '70%', // Increase width to make it larger
          height: '170%', 
          zIndex: 1,
          objectFit: 'contain'
        }}
      />
    </Box>
  );
};

export default HeaderCard;