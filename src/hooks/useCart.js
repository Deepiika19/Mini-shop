import { useContext } from 'react';
import { CartContext } from '../context/cartContext';
 
const useCart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isInCart,
  } = useContext(CartContext);
 
  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isInCart,
  };
};
 
export default useCart;