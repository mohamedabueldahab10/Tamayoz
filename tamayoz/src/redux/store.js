// import { configureStore } from "@reduxjs/toolkit";
// import authReducerToolKit from "./reducers/authReducerToolKit";
// const store = configureStore({
//   reducer: {
//     auth: authReducerToolKit,
//   },
// });

// export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
