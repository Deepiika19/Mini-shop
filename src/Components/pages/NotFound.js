import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

const NotFound = () => {
  return (
    <Box className="not-found-container">
      <Typography variant="h3">Oops! Page Not Found (404)</Typography>
      <Link to="/" className="go-home-btn">
        <Typography variant="body1">Go to Home</Typography>
      </Link>
    </Box>
  );
};

export default NotFound;
