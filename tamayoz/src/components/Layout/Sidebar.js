import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import HomeIcon from '@mui/icons-material/Home';
import PollIcon from '@mui/icons-material/Poll';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArchiveIcon from '@mui/icons-material/Archive';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import SettingsIcon from '@mui/icons-material/Settings';

import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import { useTranslation } from "react-i18next";
import MenuIcon from '@mui/icons-material/Menu';
const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  top: "70px",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function Sidebar(props) {
  const { t } = useTranslation("layout");
  const [open, setOpen] = useState(false);
  const [disableFunctions, setDisableFunctions] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const location = useLocation().pathname;
  const { setCurrentWidth } = props;
  const { i18n } = useTranslation();
  const { language } = i18n;
  const handleHoverOn = () => setOpen(true);
  const handleHoverOff = () => setOpen(false);
  const handleToggleNavbar = () => {
    setCurrentWidth(!open ? "260px" : "73px");
    setOpen(!open);
    setDisableFunctions((disableFunctions) => !disableFunctions);
  };
  return (
    <>
      <Box
        onClick={handleToggleNavbar}
        >
        <MenuIcon
        sx={{ 
          position: "fixed",
          top: 25,
          left: language === "ar" ? "auto" : "15px",
          right: language === "ar" ? "28px" : "auto",
          width:"45px", 
          height:"45px",
          color:`${open ? "var(--primary-color)" : "#0f4b56"}`,
          zIndex: "1001",
          cursor: "pointer",
      }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          position: disableFunctions ? "relative" : "fixed",
          zIndex: "3",
        }}
        onMouseEnter={!disableFunctions ? handleHoverOn : null}
        onMouseLeave={!disableFunctions ? handleHoverOff : null}
      >
        <Drawer
          variant="permanent"
          dir="ltr"
          anchor={language === "ar" ? "right" : "left"}
          open={open}
        >
          <List
            sx={{
              "& > a , & > div": { left: "7px" },
              top: "85px",
              maxHeight: "calc(100vh - 85px)",
              overflowX: "hidden",
              "&::scrollbar": {
                width: "5px",
              },
              scrollbarWidth: "thin",
              overflowY: "auto",
            }}
            onClick={() => setOpen(true)}
          >
            <ListItemButton
              selected={selectedIndex === "Dashboard"}
              onClick={() => setSelectedIndex("Dashboard")}
              key="Dashboard"
              sx={{
                "& span ": {
                  color:
                    selectedIndex === "Dashboard" || location === "/dashboard"
                      ? "var(--primary-color)"
                      : "currentColor",
                },
              }}
              component={NavLink}
              to="/dashboard"
            >
              <ListItemIcon>
                <HomeIcon sx={{color: selectedIndex === "Dashboard" || location === "/dashboard" ? "var(--primary-color)" : "#0f4b56"}} />
              </ListItemIcon>
              <ListItemText primary={`${t("home_section.dashboard")}`} />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === "survey"}
              onClick={() => setSelectedIndex("survey")}
              key="survey"
              sx={{
                "& span ": {
                  color:
                    selectedIndex === "survey" || location === "/survey"
                      ? "var(--primary-color)"
                      : "currentColor",
                },
              }}
              component={NavLink}
              to="/survey"
            >
              <ListItemIcon>
                <PollIcon sx={{color: selectedIndex === "survey" || location === "/survey" ? "var(--primary-color)" : "#0f4b56"}} />
              </ListItemIcon>
              <ListItemText primary={`${t("home_section.survey")}`} />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === "documents"}
              onClick={() => setSelectedIndex("documents")}
              key="documents"
              sx={{
                "& span ": {
                  color:
                    selectedIndex === "documents" || location === "/documents"
                      ? "var(--primary-color)"
                      : "currentColor",
                },
              }}
              component={NavLink}
              to="/documents"
            >
              <ListItemIcon>
                <FolderOpenIcon sx={{color: selectedIndex === "documents" || location === "/documents" ? "var(--primary-color)" : "#0f4b56"}} />
              </ListItemIcon>
              <ListItemText primary={`${t("home_section.documents")}`} />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === "archivings"}
              onClick={() => setSelectedIndex("archivings")}
              key="archivings"
              sx={{
                "& span ": {
                  color:
                    selectedIndex === "archivings" || location === "/archivings"
                      ? "var(--primary-color)"
                      : "currentColor",
                },
              }}
              component={NavLink}
              to="/archivings"
            >
              <ListItemIcon>
                <ArchiveIcon sx={{color: selectedIndex === "archivings" || location === "/archivings" ? "var(--primary-color)" : "#0f4b56"}} />
              </ListItemIcon>
              <ListItemText primary={`${t("home_section.archivings")}`} />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === "transactions"}
              onClick={() => setSelectedIndex("transactions")}
              key="transactions"
              sx={{
                "& span ": {
                  color:
                    selectedIndex === "transactions" || location === "/transactions"
                      ? "var(--primary-color)"
                      : "currentColor",
                },
              }}
              component={NavLink}
              to="/transactions"
            >
              <ListItemIcon>
                <BackupTableIcon sx={{color: selectedIndex === "transactions" || location === "/transactions" ? "var(--primary-color)" : "#0f4b56"}} />
              </ListItemIcon>
              <ListItemText primary={`${t("home_section.transactions")}`} />
            </ListItemButton>
            <ListItemButton
              selected={selectedIndex === "setting"}
              onClick={() => setSelectedIndex("setting")}
              key="setting"
              sx={{
                "& span ": {
                  color:
                    selectedIndex === "setting" || location === "/setting"
                      ? "var(--primary-color)"
                      : "currentColor",
                },
              }}
              component={NavLink}
              to="/setting"
            >
              <ListItemIcon>
                <SettingsIcon sx={{color: selectedIndex === "setting" || location === "/setting" ? "var(--primary-color)" : "#0f4b56"}} />
              </ListItemIcon>
              <ListItemText primary={`${t("home_section.setting")}`} />
            </ListItemButton>
           
          </List>
        </Drawer>
      </Box>
    </>
  );
}
