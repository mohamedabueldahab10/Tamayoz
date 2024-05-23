import React, { useEffect, useState } from 'react';
import Navbar from '../components/Layout/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from '../redux/authReducer';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../assets/css/App.css';
import styles from '../assets/css/modules/layout/Dashboard.module.css';
import Sidebar from '../components/Layout/Sidebar';
import { useLocation } from 'react-router-dom';
import MainMenu from './MainMenu';
const Home = () => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);
  const [currentWidth, setCurrentWidth] = useState('73px');
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation().pathname;
  if (isLoggedIn) {
    return (
      <>
        <Navbar />
        <Box
          className={styles.cardContainer}
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          {location === '/' ? (
            <></>
          ) : (
            <Sidebar setCurrentWidth={setCurrentWidth} />
          )}

          <Box
            sx={{
              width: location === '/' ? '100%' : `calc(100% - ${currentWidth})`,
              padding: location === '/' ? '0px' : '10px 15px',
              marginTop: location === '/' ? '0px' : 'var(--navbar-height)',
            }}
          >
            {location === '/' ? <MainMenu /> : <></>}
            <Outlet />
          </Box>
        </Box>
      </>
    );
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default Home;
