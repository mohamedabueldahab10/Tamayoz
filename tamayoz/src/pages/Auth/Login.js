import React, { useState } from 'react'
import LoginInputUser from '../../components/utilities/LoginInputUser'
import PasswordInput from '../../components/utilities/PasswordInput'
import styles from "../../assets/css/modules/auth/Login.module.css";
import {Backdrop, Box, Alert, CircularProgress, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoImg from "../../assets/images/tamayoz-logo.png"
import StyledButton from '../../components/utilities/StyledButton';
import Footer from '../../components/Layout/Footer';
import { Link } from 'react-router-dom';
import { handleUserLogin } from "../../redux/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const Login = () => {
  const [userData, setUserData] = useState({ userName: "", password: "" });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { LoginError } = useSelector((state) => ({
    LoginError: state.LoginError,
  }));
  console.log(LoginError);
  // const handleLogin = async (e: { preventDefault: () => void }) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   if (userData.userName || userData.password) {
  //     dispatch(handleUserLogin(userData));
  //     setLoading(false);
  //   } else {
  //     setError(LoginError);
  //   }
  // };
  async function handleLogin(data) {
    const userName = data.userName;
    const Password = data.password;
    const userData = { userName , Password };
    if (userName || Password) {
      dispatch(handleUserLogin(userData));
      setLoading(false);
    } else {
      setError(LoginError);
    }
    console.log("Credentials",userData);
  //   setIsLoading(true);
  //   setDisable(true);
  //   await axios
  //     .put(`https://vsoft.com-eg.net:4041/api/Branches/Update`, data)
  //     .then((res) => {
  //       queryClient.invalidateQueries("gridtablebranch");
  //       props.setUpdateModalOpen(false);
  //       setIsLoading(false);
  //       setDisable(false);
  //     })
  //     .catch((err) => {
  //       setSnack(true);
  //       setIsLoading(false);
  //       setDisable(false);
  //     });
  }
  const schema = yup.object().shape({
    userName: yup.string().required("User Name is Required"),
    password: yup.string().required("Password is Required"),
  });

    const methods = useForm({
      mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const { handleSubmit, register, formState: { errors } } = methods;

  return (
    <Box sx={{height:"100vh"}}>
    <div className={styles.authContainer}>
        <Box className={styles.authHeader}>
        <div className={styles.logo}>
          <img src={LogoImg} alt='Tamayoz' />
        </div>
        <div className={styles.quickActions}>
          <div>Privacy Policy</div>
          <div>About Us</div>
          <div>Contact Us</div>
          <div>Help</div>
          <div>العربية</div>
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
                  error={errors.userName}
                />
                <PasswordInput 
                  id="password"
                  name="password"
                  type="password" 
                  error={errors.password}
                />
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
                <StyledButton type='submit' small="true">Log in</StyledButton>
                <Link className={styles.forgetPass} to="/auth/forget-password">Forget password ?</Link>
                </Box>
                <div className={styles.or}>
                  <p>OR</p>
                </div>
                <div className={styles.register}>
                  <StyledButton >Register</StyledButton>
                </div>
            </div>
          </form>
        </FormProvider>
          <div className={styles.loginWord}>
              <h2>Welcome To Tamayoz</h2>
              <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
              </p>
              
          </div>
        </Box>

      
    </div>
      <Footer />
    </Box>
  )
}

export default Login
