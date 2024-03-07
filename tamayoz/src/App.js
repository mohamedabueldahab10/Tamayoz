import { Suspense } from 'react';
import '../src/assets/css/global.css';
import '../src/assets/css/App.css';
import Loading from './components/Loading';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Auth/Login';
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  console.log(
    getComputedStyle(document.body.querySelector("#root")).getPropertyValue(
      "--primary-color"
    ).trim()
  );
  const theme = createTheme({
    palette: {
      primary: {
        main: getComputedStyle(document.body)
          .getPropertyValue("--primary-color")
          .trim(),
        contrastText: "#000000",
      },
    },
  });
  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            {/* <Route path="*" element={<NotFound />} /> */}
            <Route path="auth/login" element={<Login />} />
            <Route path="/" element={<Home />}>
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </Suspense>
    
  );
}

export default App;
