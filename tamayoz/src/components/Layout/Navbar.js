import { useState } from "react";
import styles from "../../assets/css/modules/layout/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logout from "../../assets/images/logout.svg";
import { Box, Menu, MenuItem, Divider, IconButton,Popover,Card,Button } from "@mui/material";
import { handleLogout } from "../../redux/authReducer";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Languages from "../../components/helpers/supportedLanguages";
import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar";
import LogoImg from "../../assets/images/tamayoz-logo.png"
import ButtonsContainer from "../utilities/ButtonsContainer"
import Notification from "../utilities/Notification"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LanguageIcon from '@mui/icons-material/Language';
import styled from "styled-components";
import Translation from "../utilities/Translation";
const Line = styled.hr`
  border: 1px solid var(--primary-color);
`;

const LanguageList = () => {
  const { i18n } = useTranslation();
  const { language, changeLanguage } = i18n;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <FontAwesomeIcon
            icon="globe"
            size="lg"
            color="var(--primary-color)"
          />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Languages.map((lang) => (
          <MenuItem
            key={lang.code}
            button
            onClick={() => changeLanguage(lang.code)}
            selected={language === lang.code}
            // disabled={language !== lang.code}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "7px",
            }}
          >
            <FontAwesomeIcon
              icon="flag"
              size="lg"
              color={
                language === lang.code ? "var(--primary-color)" : "currentColor"
              }
            />
            <Box sx={{ fontSize: ".70em" }}>{lang.name}</Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default function Navbar() {
  const { t } = useTranslation("layout");
  const [searchBarInput, setSearchBarInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchor, setAnchor] = useState(null);
  const openNotification = Boolean(anchor);
  const openTranslation = Boolean(anchor);
  const handleNotificationClick = (event) => {
    setAnchor(event.currentTarget);
  };
  const [notifications, setNotifications] = useState([]);
  const handleSearchSubmit = () => {
    navigate(`/operations/shipment/${searchBarInput.trim()}`);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutBtnClick = () => {
    dispatch(handleLogout());
  };
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarLeft}>
      <img src={LogoImg} alt='Tamayoz' />
      </div>
      <div className={styles.navbarRight}>
        <div className={styles.iconslist}>
          <div className={styles.notifications}>
            <IconButton
              style={{ background: "transparent" }}
              onClick={handleNotificationClick}
              sx={{
                background: "transparent",
                position: "relative",
                "&::before": {
                  content: "''",
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "15px",
                  borderRadius: "50%",
                  height: "15px",
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
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
              <ManageAccountsIcon sx={{color:"var(--primary-color)"}} />
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                button
                component={NavLink}
                to="/home"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "7px",
                }}
              >
                <AccountCircleIcon 
                sx={{color:"var(--primary-color)"}}
                />
                <Box sx={{ fontSize: ".70em" }}>
                  {`${t("navbar.profile")}`}
                </Box>
              </MenuItem>
              <Divider sx={{ background: "var(--primary-color)" }} />
              <MenuItem
                component="div"
                onClick={handleLogoutBtnClick}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "7px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "7px",
                  }}
                >
                <LogoutIcon  sx={{color:"var(--primary-color)"}} />
                </Box>
                <Box sx={{ fontSize: ".70em" }}>{`${t(
                  "navbar.log_out"
                )}`}</Box>
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
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ fontFamily: "Cairo" }}
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
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <Button to="/notifications" onClick={() => setAnchor(null)}>
                  {t("navbar.all_notifications")}
                </Button>
              </ButtonsContainer>
            ) : (
              <ButtonsContainer
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontSize: "18px",
                }}
              >
                {t("navbar.no_Notification")}
              </ButtonsContainer>
            )}
          </div>
        </Card>
      </Popover>
    </div>
  );
}
