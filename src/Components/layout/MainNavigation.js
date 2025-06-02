import { NavLink } from "react-router-dom";
import '../../assets/styles/MainNavigation.css';
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import React from "react";
import { Box, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//nimport ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function MainNavigation() {
  const { user } = useAuth();
  const { cart } = useCart();

  // Calculate total quantity of items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box component="nav" className="main-nav">
      <Box className="nav-left">
        {!user ? (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
            <NavLink to="/signup" className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink>
          </>
        )}
      </Box>

      <Box className="nav-center">
        <Typography variant="h6" className="brand-title">Mini Shop</Typography>
      </Box>

      <Box className="nav-right">
        {user && (
          <>
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
              <IconButton color="inherit">
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </NavLink>
            <NavLink to="/logout" className={({ isActive }) => isActive ? 'active' : ''}>Logout</NavLink>
          </>
        )}
      </Box>
    </Box>
  );
}

export default MainNavigation;
