import React, { useState } from 'react'
import Navbar from '../components/Layout/Navbar'
import { Navigate, Outlet } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
    if (isLoggedIn) {
      return (
        <>
          <Navbar />
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <Sidebar setCurrentWidth={setCurrentWidth} />
            <Box
              sx={{ width: `calc(100% - ${currentWidth})` }}
              className="payload"
            >
              <Outlet />
            </Box>
          </Box> */}
        </>
      );
    } else {
      return <Navigate to="/auth/login" />;
    }
    

}

export default Home
