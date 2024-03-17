import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const handleUserLogin = createAsyncThunk(
  "auth/handleUserLogin",
  async (userObject) => {
    const { userName, Password } = userObject;
    console.log(userObject);
    const response = await axios.post(
      "http://10.10.8.223:8080/users/authenticate",
      {
        userName,
        Password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("login response",response);
    
    return response.data;
  }
);

export const handleLogout = () => {
  return (dispatch) => {
    dispatch(logOut());
    console.log(logOut());
    localStorage.removeItem("AuthedUser");
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: null,
    AuthedUser: null,
    LoginError: false,
  },
  reducers: {
    setAuthedUser: (state, action) => {
      console.log("action",action);
      console.log("state",state);
      state.AuthedUser = action.payload;
      state.isLoggedIn = true;
      state.LoginError = false;
    },
    checkUser: (state) => {
    const AuthedUser = localStorage.getItem("AuthedUser");
    if (AuthedUser) {
      const authedUserData = JSON.parse(AuthedUser);
      state.AuthedUser = authedUserData;
      state.isLoggedIn = true;
    } else {
      state.isLoggedIn = false;
    }
  },
    logOut: (state) => {
      state.AuthedUser = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(handleUserLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })  
    .addCase(
        handleUserLogin.fulfilled,
        (state, action) => {
          console.log("isLoggedIn",state.isLoggedIn);
          console.log("fulfilled", state, action);
          state.AuthedUser = action.payload;
          state.isLoggedIn = true;
          localStorage.setItem("AuthedUser", JSON.stringify(action.payload));
        }
      )
      .addCase(handleUserLogin.rejected, (state,action) => {
        console.log("rejected", state);
        state.LoginError = true;
        console.log("rejected", action)
      });
  },
});

export const { setAuthedUser, logOut,checkUser } = authSlice.actions;

export default authSlice.reducer;
