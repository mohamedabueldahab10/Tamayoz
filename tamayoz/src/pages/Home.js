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
import styles from "../assets/css/modules/layout/Dashboard.module.css"
import Loading from "../components/Loading"
import Sidebar from '../components/Layout/Sidebar';
import { useLocation } from "react-router-dom";
import MainMenu from './MainMenu';
const Home = () => {
  const { i18n } = useTranslation();
  const { language } = i18n;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);
  const [currentWidth, setCurrentWidth] = useState("73px");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const AuthedUser = JSON.parse(localStorage.getItem("AuthedUser"));
  const accessToken = AuthedUser?.token;
  const location = useLocation().pathname;
  // const { data: AppsData, isLoading, error, isError } = useQuery("homePage", async () => {
  //   const res = await axios.post(
  //     `http://168.119.12.58/modulesData/GetAllData`,
  //       {
  //         pageNumber: 1,
  //         pageSize: 10,
  //       },
  //       {
  //         headers: {
  //         "Content-Type": 'application/json',
  //         "Accept-Encoding": "gzip, deflate, br",
  //         "Authorization": `Bearer ${accessToken}`,
  //         }
  //     }
  //   );
  //   return res.data.data;
  // });
    if (isLoggedIn) {
      return (
        <>
          {location === "/" ? <></> :<Navbar />}
          <Box
            className={styles.cardContainer}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            {location === "/" ? <></> :<Sidebar setCurrentWidth={setCurrentWidth} />}
            
            <Box 
              sx={{ 
                width: location === "/" ? "100%" : `calc(100% - ${currentWidth})`,
                padding: location === "/" ? "0px" : "30px",
                marginTop: location === "/" ? "0px" : "var(--navbar-height)"
              }}
            >
              {location === "/" ? <MainMenu /> : <></>}
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
/* {AppsData ? AppsData.map(item => (
                <div key={item.id} className={styles.homeCard}>
                  <div className={styles.cardLogo}>
                    <svg class="" title="Like Operations Field SVG File" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#8899a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </div>
                  <div className={styles.cardName}>{item.name}</div>
                </div>
              )) : <Navigate to="/auth/login" />} */