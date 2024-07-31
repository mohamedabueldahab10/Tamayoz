import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const handleUserLogin = createAsyncThunk(
  'auth/handleUserLogin',
  async (userObject) => {
    const { userName, Password } = userObject;
    const response = await axios.post(
      'https://api.crevisoft.org/users/authenticate',
      {
        userName,
        Password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
);

export const handleLogout = () => {
  return (dispatch) => {
    dispatch(logOut());
    localStorage.removeItem('AuthedUser');
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isLoading: false,
    AuthedUser: null,
    LoginError: null,
  },
  reducers: {
    setAuthedUser: (state, action) => {
      state.AuthedUser = action.payload;
      state.isLoggedIn = true;
      state.LoginError = null;
    },
    checkUser: (state) => {
      const AuthedUser = localStorage.getItem('AuthedUser');
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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(handleUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AuthedUser = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem('AuthedUser', JSON.stringify(action.payload));
      })
      .addCase(handleUserLogin.rejected, (state, action) => {
        console.log(action);
        state.LoginError = action;
        state.isLoading = false;
        // state.LoginError = true;
      });
  },
});

export const { setAuthedUser, logOut, checkUser } = authSlice.actions;

export default authSlice.reducer;
