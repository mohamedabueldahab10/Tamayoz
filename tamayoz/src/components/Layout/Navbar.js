import styles from '../../assets/css/modules/layout/Navbar.module.css';
import { handleLogout } from '../../redux/authReducer';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchBar from '../SearchBar';
import LogoImg from '../../assets/images/tamayoz-logo.png';
import ButtonsContainer from '../utilities/ButtonsContainer';
import Notification from '../utilities/Notification';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import styled from 'styled-components';
import Translation from '../utilities/Translation';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PollIcon from '@mui/icons-material/Poll';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArchiveIcon from '@mui/icons-material/Archive';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Groups3Icon from '@mui/icons-material/Groups3';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import SchoolIcon from '@mui/icons-material/School';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import BadgeIcon from '@mui/icons-material/Badge';
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Popover,
  Card,
  Button,
} from '@mui/material';
import StyledButton from '../utilities/StyledButton';
const Line = styled.hr`
  border: 1px solid var(--primary-color);
`;
export default function Navbar() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const location = useLocation().pathname;
  const { t } = useTranslation('layout');
  // const [searchBarInput, setSearchBarInput] = useState("");
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const openEl = Boolean(anchorEl);
  const [anchor, setAnchor] = useState(null);
  const openNotification = Boolean(anchor);
  const handleNotificationClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const [notifications, setNotifications] = useState([]);
  // const handleSearchSubmit = () => {
  //   navigate(`/mainLink/subLink/${searchBarInput.trim()}`);
  // };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutBtnClick = () => {
    dispatch(handleLogout());
  };
  const [quickLinks, setQuickLinks] = useState(null);
  const openQuick = Boolean(quickLinks);
  const handleQuickLink = (event) => {
    setQuickLinks(event.currentTarget);
  };
  const handleCloseQuick = () => {
    setQuickLinks(null);
  };
  const sidebarItems = [
    { path: '/', text: `${t('home_section.main_menu')}`, icon: <HomeIcon /> },
    {
      path: '/dashboard',
      text: `${t('home_section.dashboard')}`,
      icon: <DashboardIcon />,
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
    {
      path: '/archivings',
      text: `${t('home_section.archivings')}`,
      icon: <ArchiveIcon />,
    },
    {
      path: '/transactions',
      text: `${t('home_section.transactions')}`,
      icon: <BackupTableIcon />,
    },
    {
      path: '/setting',
      text: `${t('home_section.setting')}`,
      icon: <SettingsIcon />,
    },
    {
      path: '/discuss',
      text: `${t('home_section.discuss')}`,
      icon: <ChatBubbleIcon />,
    },
    {
      path: '/meeting-room',
      text: `${t('home_section.meeting_room')}`,
      icon: <Groups3Icon />,
    },
    {
      path: '/calender',
      text: `${t('home_section.calender')}`,
      icon: <EventNoteIcon />,
    },
    {
      path: '/to-do',
      text: `${t('home_section.to_do')}`,
      icon: <ChecklistRtlIcon />,
    },
    {
      path: '/contacts',
      text: `${t('home_section.contacts')}`,
      icon: <AssignmentIndIcon />,
    },
    {
      path: '/time-sheet',
      text: `${t('home_section.time_sheet')}`,
      icon: <PunchClockIcon />,
    },
    {
      path: '/knowledge',
      text: `${t('home_section.knowledge')}`,
      icon: <SchoolIcon />,
    },
    {
      path: '/planning',
      text: `${t('home_section.planning')}`,
      icon: <NoteAltIcon />,
    },
    {
      path: '/appraisals',
      text: `${t('home_section.appraisals')}`,
      icon: <StarHalfIcon />,
    },
    {
      path: '/attendances',
      text: `${t('home_section.attendances')}`,
      icon: <PeopleAltIcon />,
    },
    {
      path: '/time-off',
      text: `${t('home_section.time_off')}`,
      icon: <TimerOffIcon />,
    },
    {
      path: '/employees',
      text: `${t('home_section.employees')}`,
      icon: <BadgeIcon />,
    },
  ];
  return (
    <div
      className={
        location === '/' ? styles.homenavbarContainer : styles.navbarContainer
      }
    >
      <div className={styles.navbarLeft}>
        <img src={LogoImg} alt="Tamayoz" />
      </div>
      <div className={styles.navbarRoutes}>
        {location === '/' ? (
          <></>
        ) : (
          <div>
            <StyledButton
              small="true"
              id="basic-button"
              aria-controls={openEl ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openEl ? 'true' : undefined}
              onClick={handleQuickLink}
            >
              {`${t('home_section.apps')}`}
            </StyledButton>
            <Menu
              id="basic-menu"
              anchorEl={quickLinks}
              open={openQuick}
              onClose={handleCloseQuick}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <List
                sx={{
                  maxHeight: '250px',
                  overflowX: 'hidden',
                  '&::scrollbar': {
                    width: '5px',
                  },
                  scrollbarWidth: 'thin',
                  overflowY: 'auto',
                }}
                onClick={() => setQuickLinks(false)}
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
            </Menu>
          </div>
        )}
      </div>
      <div className={styles.navbarRight}>
        <div className={styles.iconslist}>
          <div className={styles.notifications}>
            <IconButton
              style={{ background: 'transparent' }}
              onClick={handleNotificationClick}
              sx={{
                background: 'transparent',
                position: 'relative',
                '&::before': {
                  content: "''",
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '15px',
                  borderRadius: '50%',
                  height: '15px',
                  // backgroundColor: data?.notifications.length
                  //   ? "var(--primary-color)"
                  //   : "transparent",
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 29.255 33"
              >
                <path
                  d="M32.288,23.088,29.25,20.015V14.78A11.412,11.412,0,0,0,19.125,3.4V1.125h-2.25V3.4A11.5,11.5,0,0,0,6.75,14.78v5.234L3.712,23.088a1.041,1.041,0,0,0-.337.8V27.3a1.076,1.076,0,0,0,.307.827,1.05,1.05,0,0,0,.818.311h7.875a5.625,5.625,0,1,0,11.25,0H31.5a1.05,1.05,0,0,0,.818-.311,1.076,1.076,0,0,0,.307-.827V23.884A1.041,1.041,0,0,0,32.288,23.088ZM18,31.849a3.4,3.4,0,0,1-3.375-3.414h6.75A3.4,3.4,0,0,1,18,31.849Z"
                  transform="translate(-3.373 -1.125)"
                  fill="var(--primary-color)"
                />
              </svg>
            </IconButton>
          </div>
          <div className={styles.profile}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={openEl ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openEl ? 'true' : undefined}
              >
                <ManageAccountsIcon sx={{ color: 'var(--primary-color)' }} />
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openEl}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem
                button
                component={NavLink}
                to="/home"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '7px',
                }}
              >
                <AccountCircleIcon sx={{ color: 'var(--primary-color)' }} />
                <Box sx={{ fontSize: '.70em' }}>{`${t('navbar.profile')}`}</Box>
              </MenuItem>
              <Divider sx={{ background: 'var(--primary-color)' }} />
              <MenuItem
                component="div"
                onClick={handleLogoutBtnClick}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '7px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '7px',
                  }}
                >
                  <LogoutIcon sx={{ color: 'var(--primary-color)' }} />
                </Box>
                <Box sx={{ fontSize: '.70em' }}>{`${t('navbar.log_out')}`}</Box>
              </MenuItem>
            </Menu>
          </div>
          <div className={styles.profile}>
            <Translation />
          </div>
        </div>
      </div>
      <Popover
        open={openNotification}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        onClick={() => {
          setAnchor(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ fontFamily: 'Cairo' }}
      >
        <Card>
          <div dir="rtl">
            {notifications.slice(0, 3).map((notification, index) => (
              <Notification
                key={index}
                setNotifications={setNotifications}
                notifications={notifications}
                notificationIndex={index}
                AWB={notification.AWB}
                Body={notification.Body}
                Status={notification.StatusName}
                Serial={notification.Serial}
              />
            ))}
            <Line />
            {notifications.length ? (
              <ButtonsContainer
                style={{ marginTop: '10px', marginBottom: '10px' }}
              >
                <Button to="/notifications" onClick={() => setAnchor(null)}>
                  {t('navbar.all_notifications')}
                </Button>
              </ButtonsContainer>
            ) : (
              <ButtonsContainer
                style={{
                  marginTop: '10px',
                  marginBottom: '10px',
                  fontSize: '18px',
                  paddingInline: '10px',
                }}
              >
                {t('navbar.no_Notification')}
              </ButtonsContainer>
            )}
          </div>
        </Card>
      </Popover>
    </div>
  );
}
