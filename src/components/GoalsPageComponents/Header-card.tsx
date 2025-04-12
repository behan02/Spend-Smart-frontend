
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface HeaderProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  imagePath: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  description, 
  buttonText, 
  onButtonClick,
  imagePath 
}) => {
  const headerStyle = {
    backgroundColor: '#9ebbd9',
    borderRadius: '12px',
    padding: '0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
    overflow: 'visible', // Changed from 'hidden' to allow overflow
    minHeight: '230px',
    width: '90%'
  };

  const contentStyle = {
    maxWidth: '55%',
    zIndex: 1,
    paddingLeft: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'normal',
    color: '#000',
    lineHeight: 1.4,
    mb: 0.5
  };

  const descriptionStyle = {
    fontSize: '20px',
    fontWeight: 'normal',
    color: '#000',
    lineHeight: 1.4,
    mb: 2
  };

  const startTextStyle = {
    fontSize: '20px',
    fontWeight: 'normal',
    color: '#000',
    mb: 3
  };

  const buttonStyle = {
    backgroundColor: '#0d47a1',
    color: 'white',
    borderRadius: '30px',
    textTransform: 'none',
    padding: '10px 20px',
    fontSize: '18px',
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  };

  const illustrationStyle = {
    position: 'absolute',
    right: '-180px', // Move the image to the right to create overflow
    top: '-45px', // Move the image up slightly to create overflow
    width: '55%', // Increase width to make it larger
    height: '140%', 
    zIndex: 1,
    objectFit: 'contain'
  };

  return (
    <Box sx={headerStyle}>
      <Box sx={contentStyle}>
        <Typography sx={titleStyle}>
          Set personalized goals and track your savings effortlessly
        </Typography>
        <Typography sx={descriptionStyle}>
          —whether it's for a dream vacation, a new gadget, or a
          special event.
        </Typography>
        <Typography sx={startTextStyle}>
          Start saving today!
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={buttonStyle}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Box>
      
      <Box 
        component="img" 
        src={imagePath} 
        alt="Banner illustration"
        sx={illustrationStyle}
      />
    </Box>
  );
};

export default Header;