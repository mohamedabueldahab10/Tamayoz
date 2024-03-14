import React, { useEffect, useState } from 'react'
import Navbar from '../components/Layout/Navbar'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "../redux/authReducer";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import axios from "axios";


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
  const accessToken = "eyJpZCI6IjEiLCJuYmYiOjE3MTA0MTQ1ODEsImV4cCI6MTcxMTAxOTM4MSwiaWF0IjoxNzEwNDE0NTgxfQ";
  const { data } = useQuery("homePage", async () => {
    const res = await axios.get(
      `http://10.10.8.223:8080/users`,{
       headers:{
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  });
  console.log(data);

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
              
            </Box>
          </Box>
        </>
      );
    } else {
      return <Navigate to="/auth/login" />;
    }
    

}

export default Home
