import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Box,
  Fade
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { fetchProducts } from "../../services/api";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import '../../assets/styles/ProductList.css';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productInfo, setProductInfo] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const productsPerPage = 6;

  const { isAuthenticated } = useAuth();
  const { addToCart, removeFromCart, isInCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data || []);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleProductInfo = (e, product) => {
    e.stopPropagation();
    setProductInfo(product);
  };

  const handleCartAction = () => {
    if (!isAuthenticated) {
      setSnackbar({ open: true, message: 'Please log in to manage your cart.', severity: 'warning' });
      return;
    }

    if (isInCart(productInfo.id)) {
      removeFromCart(productInfo.id);
      setSnackbar({ open: true, message: 'Removed from cart', severity: 'info' });
    } else {
      addToCart(productInfo);
      setSnackbar({ open: true, message: 'Added to cart!', severity: 'success' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ animation: `${fadeIn} 0.6s ease-out` }}>
      {loading && <CircularProgress />}
      {error && <Typography variant="body1">{error}</Typography>}

      <Fade in timeout={600}>
        <Box>
          <div className="product-grid">
            {currentProducts.map((product) => (
              <div
                className="product-card"
                key={product.id}
                onClick={(e) => handleProductInfo(e, product)}
              >
                <img src={product.image} alt={product.title} />
                <Typography variant="h6">{product.title}</Typography>
              </div>
            ))}
          </div>

          <Stack spacing={2} alignItems="center" marginTop={4}>
            <Pagination
              count={Math.ceil(products.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Box>
      </Fade>

      {/* Product Detail Dialog */}
      <Dialog open={!!productInfo} onClose={() => setProductInfo(null)} maxWidth="sm" fullWidth>
        {productInfo && (
          <>
            <DialogTitle>{productInfo.title}</DialogTitle>
            <DialogContent dividers>
              <img
                src={productInfo.image}
                alt={productInfo.title}
                className="product-detail-image"
              />
              <Typography variant="body1" gutterBottom>{productInfo.description}</Typography>
              <Typography variant="body2">Rating: {productInfo.rating.rate}</Typography>
              <Typography variant="body2">Reviews: {productInfo.count}</Typography>
              <Typography variant="h6" color="primary">₹{productInfo.price}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setProductInfo(null)} color="secondary">Close</Button>
              <Button onClick={handleCartAction} variant="contained" color="primary">
                {isInCart(productInfo.id) ? 'Remove from Cart' : 'Add to Cart'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar for Cart Messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProductList;
