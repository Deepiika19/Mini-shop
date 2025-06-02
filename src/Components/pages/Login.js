import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../assets/styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetails, setIsAuthenticated, setUserDetails } from '../../utils/localStorage';
import useAuth from '../../hooks/useAuth';
import { Typography, Snackbar, Alert } from '@mui/material';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const name = 'users';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
    })
  });

  const handleLogin = async () => {
    setErrorMessage('');
    const errors = await formik.validateForm();
    if (Object.keys(errors).length !== 0) {
      formik.setTouched({ email: true, password: true });
      return;
    }

    const values = formik.values;
    const users = getUserDetails(name) || [];

    const matchedUser = users.find(
      user => user.email === values.email && user.password === values.password
    );

    if (matchedUser) {
      login(matchedUser);
      setUserDetails('currentUser', matchedUser);
      window.dispatchEvent(new Event("userChanged"));
      setIsAuthenticated('isAuthenticated', true);
      setSuccessMessage('Logged in successfully!');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/home'), 2000);
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (getUserDetails('isAuthenticated')) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="login-page">
      <div className="banner-message">
        <span className="banner-text">Login for more exclusive deals!</span>
      </div>

      <div className="login-container">
        <Typography variant="h4" className="login-heading">Login</Typography>
        {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}
        <form>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography variant="body1" color="error">{formik.errors.email}</Typography>
            )}
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <Typography variant="body1" color="error">{formik.errors.password}</Typography>
            )}
          </div>
          <button className='button1' type="button" onClick={handleLogin}>Login</button>
        </form>
        <Typography variant="body1">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </Typography>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Login;
