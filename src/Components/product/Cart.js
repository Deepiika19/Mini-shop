import React, { useState } from "react";
import '../../assets/styles/Cart.css';
import useCart from "../../hooks/useCart";
import { Typography } from "@mui/material";

export default function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrderNow = () => {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => setOrderPlaced(false), 5000);
  };

  return (
    <div className="cart-container">
      <Typography variant="h4" className="cart-title">Your Cart 🛒</Typography>

      {cart.length === 0 && !orderPlaced ? (
        <Typography variant="body1" className="cart-empty-message">Your Cart is Empty</Typography>
      ) : (
        cart.map((product) => (
          <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} className="cart-item-image" />

            <div className="cart-item-details">
              <Typography variant="h3">{product.title}</Typography>
              <div className="cart-item-controls">
                <button onClick={() => increaseQuantity(product.id)} className="quantity-button">+</button>
                <Typography variant="body1">Quantity: {product.quantity}</Typography>
                <button onClick={() => decreaseQuantity(product.id)} className="quantity-button">-</button>
              </div>
              <Typography variant="body1" className="cart-item-price">Price: ₹{product.price}</Typography>
              <Typography variant="body1" className="cart-item-subtotal">SubPrice: ₹{(product.price * product.quantity).toFixed(2)}</Typography>

              <button onClick={() => removeFromCart(product.id)} className="cart-item-remove">Remove</button>
            </div>
          </div>
        ))
      )}

      {/* Show total and button only if cart has items and order is not placed */}
      {cart.length > 0 && !orderPlaced && (
        <>
          <Typography variant="body1" className="cart-summary">
            Total: ₹{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </Typography>

          <button className="order-now-button" onClick={handleOrderNow}>
            Order Now
          </button>
        </>
      )}

      {orderPlaced && (
        <Typography variant="body1" className="order-message">
          Order placed successfully
        </Typography>
      )}
    </div>
  );
}
