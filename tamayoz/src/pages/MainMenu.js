import React, { useEffect, useState } from 'react';
import { Grid, Typography, Container, Box } from '@mui/material';
import "../assets/css/App.css"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    DashboardIcon,
    SurveyIcon,
    DocsIcon,
    ArchiveIcon,
    TransactionsIcon,
    SettingIcon,
    DiscussIcon,
    MeetingRoomIcon,
    CalenderIcon,
    ToDoIcon,
    ContactIcon,
    TimeSheetIcon,
    KnowledgeIcon,
    PlanningIcon,
    AppraisalIcon,
    AttendancesIcon,
    TimeOffIcon,
    EmployeesIcon,
} from '../components/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
const MainMenu = () => {
    const { t } = useTranslation("layout");
    const [loading, setLoading] = useState(false);
    const [modules, setModules] = useState([]);
    const accessToken = useSelector((state) => state.auth.AuthedUser.token);
    useEffect(() => {
      getAllUsers();
    }, [])
    
    const getAllUsers = async () => {
    setLoading(true);
    await axios.post(
      "http://168.119.12.58/modulesData/GetAllData",
      {
        pageNumber :"1",
        pageSize : "10"
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setLoading(false);
        console.log(res.data.data);
        setModules(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
    const sidebarItems = [
        { path: "/dashboard", text: `${t("home_section.dashboard")}`, icon: <DashboardIcon /> },
        { path: "/survey", text: `${t("home_section.survey")}`, icon: <SurveyIcon /> },
        { path: "/documents", text: `${t("home_section.documents")}`, icon: <DocsIcon /> },
        { path: "/archivings", text: `${t("home_section.archivings")}`, icon: <ArchiveIcon /> },
        { path: "/transactions", text: `${t("home_section.transactions")}`, icon: <TransactionsIcon/> },
        { path: "/setting", text: `${t("home_section.setting")}`, icon: <SettingIcon/> },
        { path: "/discuss", text: `${t("home_section.discuss")}`, icon: <DiscussIcon /> },
        { path: "/meeting-room", text: `${t("home_section.meeting_room")}`, icon: <MeetingRoomIcon /> },
        { path: "/calender", text: `${t("home_section.calender")}`, icon: <CalenderIcon /> },
        { path: "/to-do", text: `${t("home_section.to_do")}`, icon: <ToDoIcon /> },
        { path: "/contacts", text: `${t("home_section.contacts")}`, icon: <ContactIcon /> },
        { path: "/time-sheet", text: `${t("home_section.time_sheet")}`, icon: <TimeSheetIcon /> },
        { path: "/knowledge", text: `${t("home_section.knowledge")}`, icon: <KnowledgeIcon /> },
        { path: "/planning", text: `${t("home_section.planning")}`, icon: <PlanningIcon /> },
        { path: "/appraisals", text: `${t("home_section.appraisals")}`, icon: <AppraisalIcon /> },
        { path: "/attendances", text: `${t("home_section.attendances")}`, icon: <AttendancesIcon /> },
        { path: "/time-off", text: `${t("home_section.time_off")}`, icon: <TimeOffIcon /> },
        { path: "/employees", text: `${t("home_section.employees")}`, icon: <EmployeesIcon /> },
      ];
const navigate = useNavigate();
  return (
    <>
    <div className="mainMenu">
      <Container sx={{width:"80%",minWidth:"300px",marginBlock:"60px"}}>
        <Grid container spacing={6} justifyContent="start">
            {sidebarItems.map((item, index) => (
                <Grid key={index} item xs={6} sm={4} md={2} sx={{display:"grid",placeItems:"center"}}>
                    <Box className='mainCard' onClick={() => navigate(item.path)}>
                        <Box>
                            {item.icon}
                        </Box>
                        <Typography className='cardTxt'>{item.text}</Typography>
                    </Box>
                </Grid>
            ))}
            {/* {modules.map((module, index) => {console.log(module.svgicon) 
            return (
                <Grid key={index} item xs={6} sm={4} md={2} sx={{display:"grid",placeItems:"center"}}>
                    <Box className='mainCard' >
                      onClick={() => navigate(module.path)}
                        <Box className='iconContainer' dangerouslySetInnerHTML={{ __html: module.svgicon }}>
                        </Box>
                        <Typography className='cardTxt'>{module.name}</Typography>
                    </Box>
                </Grid>
            )})} */}
        </Grid>
      </Container>
    </div>
    </>
  );
};

export default MainMenu;
