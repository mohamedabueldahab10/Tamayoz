import React, { useEffect, useState } from 'react'
import Navbar from '../components/Layout/Navbar'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "../redux/authReducer";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios from "axios";
import "../assets/css/App.css"

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
  const AuthedUser = JSON.parse(localStorage.getItem("AuthedUser"));
  console.log("AuthedUser",AuthedUser);
  const accessToken = AuthedUser?.token
  const { data } = useQuery("homePage", async () => {
    const res = await axios.post(
      `http://10.10.8.223:8080/modulesData/GetAllData`,{
       headers:{
        "Content-Type": 'application/json',
        "Accept-Encoding": "gzip, deflate, br",
        "Authorization": `Bearer ${accessToken}`,
       },
      body: {
          pageSize: 1,
          pageNumber: 10,
      }
    });
    return res;
  });
  console.log(data);

    if (isLoggedIn) {
      return (
        <div className='main-content'>
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
              
            </Box>
          </Box>
        </div>
      );
    } else {
      return <Navigate to="/auth/login" />;
    }
    

}

export default Home
