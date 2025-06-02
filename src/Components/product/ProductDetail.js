import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../../services/api';
import '../../assets/styles/ProductDetail.css';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { Typography } from '@mui/material';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState('');

  const { isAuthenticated } = useAuth();
  const { addToCart, removeFromCart, isInCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleCartAction = () => {
    if (!isAuthenticated) {
      setCartMessage('Please log in to manage your cart.');
      setTimeout(() => setCartMessage(''), 3000);
      return;
    }

    if (isInCart(product.id)) {
      removeFromCart(product.id);
      setCartMessage('Removed from cart');
    } else {
      addToCart(product);
      setCartMessage('Added to cart!');
    }

    setTimeout(() => setCartMessage(''), 3000);
  };

  if (loading) return <Typography variant="body1">Loading...</Typography>;

  const inCart = product && isInCart(product.id);

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-btn">
        Back to Products
      </button>

      <Typography variant="h6">{product.title}</Typography>
      <img src={product.image} alt={product.title} className="product-image" />
      <Typography variant="body2">
        {product.description.length > 150
          ? product.description.slice(0, 150) + '...'
          : product.description}
      </Typography>
      <Typography variant="body2">Price: ₹{(product.price * 83).toFixed(0)}</Typography>
      <Typography variant="body2">Rating: {product.rating.rate}</Typography>
      <Typography variant="body2">No. of Reviews: {product.rating.count}</Typography>

      <button
        onClick={handleCartAction}
        className={`add-to-cart-btn ${inCart ? 'remove-from-cart' : 'add-to-cart'}`}
      >
        {inCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>

      {cartMessage && (
        <div className="toast-message">
          {cartMessage}
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
