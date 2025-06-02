// import { createContext, useState,useEffect } from "react";
// import React from "react";

// const getUserEmail = () => {
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   return user?.email || null;
// };

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const email = getUserEmail();
//     if (email) {
//       const storedCart = localStorage.getItem(`cart_${email}`);
//       if (storedCart) {
//         setCart(JSON.parse(storedCart));
//       }
//     }
//   }, []);


//   useEffect(() => {
//     const email = getUserEmail();
//     if (email) {
//       localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
//     }
//   }, [cart]);
  
//   useEffect(() => {
//     const handleUserChange = () => {
//       const email = getUserEmail();
//       if (email) {
//         const storedCart = localStorage.getItem(`cart_${email}`);
//         setCart(storedCart ? JSON.parse(storedCart) : []);
//       } else {
//         setCart([]);
//       }
//     };
  
//     window.addEventListener("userChanged", handleUserChange);
  
     
//     handleUserChange();
  
//     return () => {
//       window.removeEventListener("userChanged", handleUserChange);
//     };
//   }, []);
  

  
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const exists = prevCart.find((item) => item.id === product.id);

//       if (exists) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

 
//   const isInCart = (id) => {
//     return cart.some((item) => item.id === id);
//   };

  
//   const clearCart = () => {
//     setCart([]);
//   };

   
//   const increaseQuantity = (id) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

   
//   const decreaseQuantity = (id) => {
//     setCart((prevCart) =>
//       prevCart
//         .map((item) =>
//           item.id === id ? { ...item, quantity: item.quantity - 1 } : item
//         )
//         .filter((item) => item.quantity > 0)  
//     );
//   };

   
//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         clearCart,
//         isInCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import { createContext, useState } from "react";
import React from "react";

const getUserEmail = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user?.email || null;
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const email = getUserEmail();
    if (email) {
      const storedCart = localStorage.getItem(`cart_${email}`);
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const saveCart = (newCart) => {
    const email = getUserEmail();
    if (email) {
      localStorage.setItem(`cart_${email}`, JSON.stringify(newCart));
    }
  };

  const handleUserChange = () => {
    const email = getUserEmail();
    if (email) {
      const storedCart = localStorage.getItem(`cart_${email}`);
      setCart(storedCart ? JSON.parse(storedCart) : []);
    } else {
      setCart([]);
    }
  };

  window.addEventListener("userChanged", handleUserChange);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      const newCart = exists
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
      saveCart(newCart);
      return newCart;
    });
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const clearCart = () => {
    setCart([]);
    saveCart([]);
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const newCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCart(newCart);
      return newCart;
    });
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const newCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      saveCart(newCart);
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== id);
      saveCart(newCart);
      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

