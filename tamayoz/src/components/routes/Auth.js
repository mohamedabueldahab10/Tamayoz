import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../../assets/css/global.css";
import { useSelector } from "react-redux";
import {
  ForgetPassword,
  Login,
  // NewPassword,
  // Signup,
  // Verify,
} from "../../pages/Auth";
import NotFound from "../NotFound";
export default function Auth() {
  const { isLoggedIn } = useSelector((state) => {
    console.log(state);

    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="auth">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/verify-code" element={<Verify />} />
        <Route path="/new-password" element={<NewPassword />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
