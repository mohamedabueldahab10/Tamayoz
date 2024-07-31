import React, { useState, useEffect } from 'react';
import LoginInputUser from '../../components/utilities/LoginInputUser';
import PasswordInput from '../../components/utilities/PasswordInput';
import styles from '../../assets/css/modules/auth/Login.module.css';
import {
  Box,
  Alert,
  Snackbar,
  IconButton,
  Stack,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LogoImg from '../../assets/images/tamayoz-logo.png';
import StyledButton from '../../components/utilities/StyledButton';
import Footer from '../../components/Layout/Footer';
import { Link } from 'react-router-dom';
import { handleUserLogin } from '../../redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { changeLanguage } from 'i18next';
const Login = () => {
  const { t } = useTranslation('login');
  const { i18n } = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [snack, setSnack] = useState(false);
  const handleClose = (branch) => {
    if (branch === 'clickaway') {
      return;
    }
    setSnack(false);
  };
  const schema = yup.object().shape({
    userName: yup.string().required(t('validation.user_name_required')),
    password: yup.string().required(t('validation.password_required')),
  });
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const handleLanguage = () => {
    if (language === 'en') {
      changeLanguage('ar');
    } else {
      changeLanguage('en');
    }
  };
  const { LoginError } = useSelector((state) => state.auth);
  // ====================
  async function handleLogin(data) {
    setLoading(true);
    const userName = data.userName;
    const Password = data.password;
    const userData = { userName, Password };
    if (userName && Password) {
      dispatch(handleUserLogin(userData));
      setLoading(false);
    }
  }
  useEffect(() => {
    if (LoginError?.error.message === 'Request failed with status code 400') {
      setSnack(true);
      console.log(LoginError);
      setError(t('error.message_credentials'));
    } else if (LoginError?.error) {
      setSnack(true);
      console.log(LoginError);
      setError(t('error.message_unexpected'));
    }
  }, [LoginError]);

  return (
    <Box sx={{ height: '100vh' }}>
      <div className={styles.authContainer}>
        <Box className={styles.authHeader}>
          <div className={styles.logo}>
            <img src={LogoImg} alt="Tamayoz" />
          </div>
          <div className={styles.quickActions}>
            <div>{t('quick_actions.privacy_policy')}</div>
            <div>{t('quick_actions.about_us')}</div>
            <div>{t('quick_actions.contact_us')}</div>
            <div>{t('quick_actions.help')}</div>
            <div onClick={handleLanguage}>{t('quick_actions.language')}</div>
          </div>
        </Box>
        <Box className={styles.formHeader}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className={styles.loginForm}>
                <LoginInputUser
                  id="userName"
                  name="userName"
                  type="userName"
                  placeholder={t('form.user_placeholder')}
                  error={errors.userName}
                />
                <PasswordInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t('form.password_placeholder')}
                  error={errors.password}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <StyledButton type="submit" small="true">
                    {t('form.login_button')}
                  </StyledButton>
                  <Link
                    className={styles.forgetPass}
                    to="/auth/forget-password"
                  >
                    {t('form.forget_password')}
                  </Link>
                </Box>
                <div className={styles.or}>
                  <p>{t('form.or')}</p>
                </div>
                <div className={styles.register}>
                  <StyledButton>
                    {loading ? <CircularProgress /> : t('form.register_button')}
                  </StyledButton>
                </div>
              </div>
            </form>
          </FormProvider>

          <div className={styles.loginWord}>
            <h2>{t('login_word.welcome')}</h2>
            <p>{t('login_word.description')}</p>
          </div>
        </Box>

        {/* {error ? ( */}
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={snack}
            autoHideDuration={4500}
            onClose={handleClose}
          >
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  size="small"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="inherit" color="red" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      <Footer />
    </Box>
  );
};

export default Login;
