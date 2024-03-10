import React, { useEffect, useState } from 'react'
import Navbar from '../components/Layout/Navbar'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "../redux/authReducer";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);
  const { isLoggedIn } = useSelector((state) => {
    console.log(state);

    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  console.log("isLoggedIn",isLoggedIn);

    if (isLoggedIn) {
      return (
        <>
          <Navbar />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <Box
              // sx={{ width: `calc(100% - ${currentWidth})` }}
              className="payload"
            >
              <Outlet />
            </Box>
          </Box>
        </>
      );
    } else {
      return <Navigate to="/auth/login" />;
    }
    

}

export default Home
