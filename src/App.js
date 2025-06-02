import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../src/Components/layout/RootLayout';
import ProductList from './Components/product/ProductList';
import Cart from '../src/Components/product/Cart';
import Home from './Components/pages/Home';
import Login from '../src/Components/pages/Login';
import Signup from './Components/pages/SignUp';
import Logout from './Components/pages/LogOut';
import ProductCategorySearch from './Components/product/ProductCategorySearch';
import { CartProvider } from './context/cartContext';
import { AuthProvider } from '../src/context/authContext';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import ProductDetail from './Components/product/ProductDetail';  
import NotFound from './Components/pages/NotFound';
import Welcome from "./Components/pages/Welcome";


const  AppRoutes = () => {
  const { user } = useContext(AuthContext); // Access user from context

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { path: '/', element: <Welcome /> },
        { path: '/login', element: !user ? <Login /> : <Home />},
        { path: '/signup', element: !user ? <Signup /> : <Home />},
        { path: '/home', element: user ? <Home /> : <Login />},
        { path: '/products', element: user ? <ProductList /> : <Login />},
        { path: '/cart', element: user ? <Cart /> : <Login />},
        { path: '/logout', element: !user ? <Login /> : <Logout />},
        { path: '/category/:category',element: user ? <ProductCategorySearch /> : <Login />},
        { path: '/productdetails/:id', element: user ? <ProductDetail /> : <Login />},
        { path: '*', element: <NotFound/>},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
