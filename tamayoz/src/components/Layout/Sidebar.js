import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import PollIcon from '@mui/icons-material/Poll';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  top: '70px',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Sidebar(props) {
  const { t } = useTranslation('layout');
  const [open, setOpen] = useState(false);
  const [disableFunctions, setDisableFunctions] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [sidebarItems, setSidebarItems] = useState([]);
  const location = useLocation().pathname;
  const { setCurrentWidth } = props;
  const { i18n } = useTranslation();
  const { language } = i18n;
  const handleHoverOn = () => setOpen(true);
  const handleHoverOff = () => setOpen(false);
  const handleToggleNavbar = () => {
    setCurrentWidth(!open ? '200px' : 'var(--sidebar-width)');
    setOpen(!open);
    setDisableFunctions((disableFunctions) => !disableFunctions);
  };
  useEffect(() => {
    // Define sidebar items based on current page
    let newSidebarItems = [];
    if (location === '/dashboard') {
      newSidebarItems = [
        {
          path: '/dashboard',
          text: `${t('home_section.dashboard')}`,
          icon: <HomeIcon />,
        },
        {
          path: '/survey',
          text: `${t('home_section.survey')}`,
          icon: <PollIcon />,
        },
        {
          path: '/documents',
          text: `${t('home_section.documents')}`,
          icon: <FolderOpenIcon />,
        },
        // Add more items as needed
      ];
    } else if (location === '/survey') {
      newSidebarItems = [
        // Define items for other pages
      ];
    } else if (location === '/documents') {
      newSidebarItems = [
        // Define items for other pages
      ];
    } else if (location === '/archivings') {
      newSidebarItems = [
        // Define items for other pages
      ];
    } else if (location === '/transactions') {
      newSidebarItems = [
        // Define items for other pages
      ];
    } else if (location === '/setting') {
      newSidebarItems = [
        // Define items for other pages
      ];
    }
    setSidebarItems(newSidebarItems);
  }, [location]);
  // const sidebarItems = [
  //   { path: "/dashboard", text: `${t("home_section.dashboard")}`, icon: <HomeIcon /> },
  //   { path: "/survey", text: `${t("home_section.survey")}`, icon: <PollIcon /> },
  //   { path: "/documents", text: `${t("home_section.documents")}`, icon: <FolderOpenIcon /> },
  //   { path: "/archivings", text: `${t("home_section.archivings")}`, icon: <ArchiveIcon /> },
  //   { path: "/transactions", text: `${t("home_section.transactions")}`, icon: <BackupTableIcon /> },
  //   { path: "/setting", text: `${t("home_section.setting")}`, icon: <SettingsIcon /> },
  // ];
  return (
    <>
      <Box onClick={handleToggleNavbar}>
        <MenuIcon
          sx={{
            position: 'fixed',
            top: 5,
            left: language === 'ar' ? 'auto' : '15px',
            right: language === 'ar' ? '15px' : 'auto',
            width: '45px',
            height: '45px',
            color: `${open ? 'var(--primary-color)' : 'var(--secondary-color)'}`,
            zIndex: '1001',
            cursor: 'pointer',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          position: disableFunctions ? 'relative' : 'fixed',
          zIndex: '3',
          backgroundColor: 'red',
        }}
        onMouseEnter={!disableFunctions ? handleHoverOn : null}
        onMouseLeave={!disableFunctions ? handleHoverOff : null}
      >
        <Drawer
          variant="permanent"
          dir="ltr"
          anchor={language === 'ar' ? 'right' : 'left'}
          open={open}
        >
          <List
            sx={{
              '& > a , & > div': { left: '7px' },
              top: '85px',
              maxHeight: 'calc(100vh - 55px)',
              overflowX: 'hidden',
              '&::scrollbar': {
                width: '5px',
              },
              scrollbarWidth: 'thin',
              overflowY: 'auto',
            }}
            onClick={() => setOpen(true)}
          >
            {sidebarItems.map((item, index) => (
              <ListItemButton
                selected={selectedIndex === item.text}
                onClick={() => setSelectedIndex(item.text)}
                key={index}
                component={NavLink}
                to={item.path}
                sx={{
                  '& span ': {
                    color:
                      selectedIndex === item.name || location === item.path
                        ? 'var(--primary-color)'
                        : 'currentColor',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      selectedIndex === item.text || location === item.path
                        ? 'var(--primary-color)'
                        : 'var(--secondary-color)',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
}
