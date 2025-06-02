import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Signup.css';
import { Link } from 'react-router-dom';
import { setUserDetails, getUserDetails } from '../../utils/localStorage';
import {
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const name = 'users';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      address: '',
      contact: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      address: Yup.string().required('Address is required'),
      contact: Yup.string().required('Contact is required')
    }),
    onSubmit: (values) => {
      const existingUsers = getUserDetails(name) || [];
      const userExists = existingUsers.find(user => user.email === values.email);

      if (userExists) {
        setErrorMessage('This email is already registered.');
        setSuccessMessage('');
      } else {
        const newUser = {
          email: values.email,
          password: values.password,
          name: values.name,
          address: values.address,
          contact: values.contact
        };
        existingUsers.push(newUser);
        setUserDetails(name, existingUsers);
        setErrorMessage('');
        setSuccessMessage('User registered successfully!');
        setOpenSnackbar(true);
        setTimeout(() => navigate('/login'), 2000);
      }
    }
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div className="signup-page">
    <Box className="signup-container">
      <Typography variant="h4" className="signup-title">Sign Up</Typography>
      {errorMessage && <Typography variant="body1" color="error">{errorMessage}</Typography>}

      <form onSubmit={formik.handleSubmit} className="signup-form">
        {['name', 'email', 'password', 'confirmPassword', 'address', 'contact'].map((field) => (
          <Box className="input-group" key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <TextField
              type={field.includes('password') ? 'password' : 'text'}
              id={field}
              name={field}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field]}
              fullWidth
              className="animated-input"
            />
            {formik.touched[field] && formik.errors[field] && (
              <Typography variant="body2" color="error">{formik.errors[field]}</Typography>
            )}
          </Box>
        ))}
        <Button type="submit" variant="contained" color="primary" className="animated-button">Sign Up</Button>
      </form>

      <Typography variant="body1" className="login-link">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        //anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}

      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
    </div>
  );
};

export default Signup;
