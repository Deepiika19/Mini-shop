import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Paper,
  Fade,
  Modal,
  IconButton,
  Divider,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCategorySearch from '../product/ProductCategorySearch';
import useAuth from '../../hooks/useAuth';
import { keyframes } from '@emotion/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import CampaignIcon from '@mui/icons-material/Campaign';
import ExploreIcon from '@mui/icons-material/TravelExplore';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
// import Particles from 'react-tsparticles';
// import { loadFull } from 'tsparticles';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowBounce = keyframes`
  0%, 100% { text-shadow: 0 0 5px #3f51b5, 0 0 10px #3f51b5; transform: scale(1); }
  50% { text-shadow: 0 0 20px #3f51b5, 0 0 30px #3f51b5; transform: scale(1.05); }
`;

const pulseZoom = keyframes`
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const strokeText = keyframes`
  0% {
    color: transparent;
    stroke-dashoffset: 100%;
  }
  100% {
    color: #3f51b5;
    stroke-dashoffset: 0;
  }
`;

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openAd, setOpenAd] = useState(true);

  const handleCloseAd = () => setOpenAd(false);

  // const particlesInit = async (main) => {
  //   await loadFull(main);
  // };

  return (
    <>
      {/* Background Particles */}
     <Box sx={{ position: 'absolute', width: '100%', height: '100vh', zIndex: -1 }}>
  {/* Background placeholder */}
</Box>

      {/* Advertisement Popup */}
      <Modal open={openAd} onClose={handleCloseAd}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 320,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            textAlign: 'center',
            animation: `${fadeIn} 0.5s ease-out`
            
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              <CampaignIcon sx={{ mr: 0.1, color: 'primary.main' }} />
              Offer!
            </Typography>
            <IconButton onClick={handleCloseAd}>
              <CloseIcon color='white'/>
            </IconButton>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              animation: `${glowBounce} 2s infinite`,
            }}
          >
            <Typewriter
              words={['🎉 Get 20% off on your first purchase! Use code: WELCOME20']}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={0}
              delaySpeed={1000}
            />
          </Typography>
        </Box>
      </Modal>

      {/* Main Home Content */}
      <Fade in timeout={600}>
        <Container
          maxWidth="xl"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              borderRadius: 4,
              width: '100%',
              maxWidth: 1000,
              background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
              animation: `${fadeIn} 0.6s ease-out`,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box textAlign="center" mb={4}>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ShoppingCartIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              </motion.div>

              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: '#3f51b5',
                  animation: `${pulseZoom} 2s ease-in-out`,
                }}
              >
                {user ? `Welcome, ${user.name}!` : 'Welcome to ShopEase'}
              </Typography>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {user ? (
                  <Typography
                    variant="body1"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                      fontWeight: 500,
                      fontSize: '1.1rem',
                      animation: `${strokeText} 2s ease-in-out`,
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <ExploreIcon color="primary" />
                      Explore products
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <ShoppingCartCheckoutIcon color="primary" />
                      Manage your cart
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonPinIcon color="primary" />
                      Enjoy personalized shopping
                    </Box>
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ color: '#333' }}>
                    Login or Sign up to start your shopping journey with us!
                  </Typography>
                )}
              </motion.div>
            </Box>

            {user ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ProductCategorySearch />
              </motion.div>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/login')}
                    sx={{ textTransform: 'none', minWidth: 100 }}
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate('/signup')}
                    sx={{ textTransform: 'none', minWidth: 100 }}
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </Box>
           
            )}
          </Paper>
        </Container>
      </Fade>
    </>
  );
};

export default Home;
