import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../../utils/localStorage';
import useAuth from '../../hooks/useAuth';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();   
    // localStorage.removeItem('isAuthenticated');   
    // localStorage.removeItem('currentUser');   
    removeUser('isAuthenticated');
    removeUser('currentUser');
    window.dispatchEvent(new Event("userChanged"));  

    navigate('/login', { replace: true });   
  }, [logout, navigate]);

  return null;  
};

export default Logout;
