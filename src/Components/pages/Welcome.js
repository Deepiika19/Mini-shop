import React, { useEffect, useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const imageUrls = [
  'https://static.vecteezy.com/system/resources/previews/022/354/352/large_2x/3d-render-shop-retail-store-on-red-background-with-copy-space-photo.jpg',
  'https://img.freepik.com/premium-photo/background-shopping_931878-79900.jpg',
  'https://thumbs.dreamstime.com/b/animation-online-shopping-e-commerce-store-box-delivery-trucks-smartphone-d-rendering-179525044.jpg',
];

const Welcome = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 1000); // Change image every 1 second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleExploreClick = () => {
    navigate('/login');
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${imageUrls[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          textAlign: 'center',
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Mini Shop
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Discover amazing products and deals. Start your shopping journey now!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleExploreClick}
        >
          Explore Mini Shop
        </Button>
      </Container>
    </Box>
  );
};

export default Welcome;
