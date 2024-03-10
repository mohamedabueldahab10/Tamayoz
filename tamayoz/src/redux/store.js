import { configureStore } from "@reduxjs/toolkit";
import authReducerToolKit from "./reducers/authReducerToolKit";
const store = configureStore({
  reducer: {
    auth: authReducerToolKit,
  },
});

export default store;
