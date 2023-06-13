import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { isAuthenticated, currentMember } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      currentMember.role === 'admin'
        ? navigate('/admin_main')
        : navigate('/mainpage');
    } else {
      navigate('/login');
    }
  }, [navigate, isAuthenticated, currentMember]);
};

export default HomePage;
