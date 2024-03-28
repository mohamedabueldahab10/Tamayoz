import { Suspense } from 'react';
import '../src/assets/css/global.css';
import '../src/assets/css/App.css';
import Loading from './components/Loading';
import { Routes, Route } from "react-router-dom";
import "./components/helpers/i18n"
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Auth from './components/routes/Auth';
import NotFound from './components/NotFound';
import Dashboard from "./pages/Dashboard/Dashboard"
import Survey from './pages/Survey/Survey';
import Documents from './pages/Documents/Documents';
import Archivings from './pages/Archivings/Archivings';
import Transactions from './pages/Transactions/Transactions';
import Setting from './pages/Setting/Setting';
function App() {
  const { i18n } = useTranslation();
  const { language } = i18n;
  console.log("current Language",language);
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
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/survey' element={<Survey />} />
              <Route path='/documents' element={<Documents />} />
              <Route path='/archivings' element={<Archivings />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path='/setting' element={<Setting />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </Suspense>
    
  );
}

export default App;
