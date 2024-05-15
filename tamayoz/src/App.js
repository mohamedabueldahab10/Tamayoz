import { Suspense, useEffect } from 'react';
import '../src/assets/css/global.css';
import '../src/assets/css/App.css';
import Loading from './components/Loading';
import { Routes, Route, useNavigate } from "react-router-dom";
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
import Discuss from './pages/Discuss/Discuss';
import MeetingRoom from './pages/MeetingRoom/MeetingRoom';
import Calender from './pages/Calender/Calender';
import ToDo from './pages/ToDo/ToDo';
import Contacts from './pages/Contacts/Contacts';
import TimeSheet from './pages/TimeSheet/TimeSheet';
import Knowledge from './pages/Knowledge/Knowledge';
import Planning from './pages/Planning/Planning';
import Appraisals from './pages/Appraisals/Appraisals';
import Attendances from './pages/Attendances/Attendances';
import TimeOff from './pages/TimeOff/TimeOff';
import Employees from './pages/hr/Employees';
import NewEmployee from './pages/hr/NewEmployee';
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
  const navigate = useNavigate();
  useEffect(() => {
    const currentPage = localStorage.getItem('currentPage');

    if (currentPage) {
      navigate(currentPage)
    }
  }, [navigate]);
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
              <Route path='/discuss' element={<Discuss />} />
              <Route path='/meeting-room' element={<MeetingRoom />} />
              <Route path='/calender' element={<Calender />} />
              <Route path='/to-do' element={<ToDo />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/time-sheet' element={<TimeSheet />} />
              <Route path='/knowledge' element={<Knowledge />} />
              <Route path='/planning' element={<Planning />} />
              <Route path='/appraisals' element={<Appraisals />} />
              <Route path='/attendances' element={<Attendances />} />
              <Route path='/time-off' element={<TimeOff />} />
              <Route path="/employees/" element={<Employees />} />
              <Route path="/employees/new_employee" element={<NewEmployee />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </Suspense>
    
  );
}

export default App;
