import { Suspense } from 'react';
import '../src/assets/css/global.css';
import '../src/assets/css/App.css';
import Loading from './components/Loading';
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Auth from './components/routes/Auth';
import NotFound from './components/NotFound';

function App() {
  const { i18n } = useTranslation();
  const { language } = i18n;
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
        <div className="App"
        data-lang="en"
        dir={language === "ar" ? "rtl" : "ltr"}
        >
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/Auth/*" element={<Auth />} />
            <Route path="/" element={<Home />}>
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </Suspense>
    
  );
}

export default App;
