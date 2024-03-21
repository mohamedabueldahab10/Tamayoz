import { useState } from "react";
import styles from "../../assets/css/modules/layout/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logout from "../../assets/images/logout.svg";
import { Box, Menu, MenuItem, Divider, IconButton } from "@mui/material";
import { handleLogout } from "../../redux/authReducer";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Languages from "../../components/helpers/supportedLanguages";
import { useTranslation } from "react-i18next";
import SearchBar from "../SearchBar";
import LogoImg from "../../assets/images/tamayoz-logo.png"

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
        {/* <SearchBar
          searchBarInput={searchBarInput}
          handleSearchSubmit={handleSearchSubmit}
          setSearchBarInput={setSearchBarInput}
        /> */}
        <div className={styles.iconslist}>
          <div className={styles.messages}>
            <FontAwesomeIcon
              icon="comment-dots"
              size="lg"
              color="var(--primary-color)"
            />
          </div>
          <div className={styles.notifications}>
            <FontAwesomeIcon
              icon={["fas", "bell"]}
              size="lg"
              color="var(--primary-color)"
            />
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
                <FontAwesomeIcon
                  icon="user"
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
                <FontAwesomeIcon
                  icon="home"
                  size="lg"
                  color="var(--primary-color)"
                />
                <Box sx={{ fontSize: ".70em" }}>
                  {`${t("navbar_section.company_profile")}`}
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
                    width: "18px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    aspectRatio: "1",
                    "& > img": {
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      left: "2px",
                    },
                  }}
                >
                  <img src={Logout} alt="logout" />
                </Box>
                <Box sx={{ fontSize: ".70em" }}>{`${t(
                  "navbar_section.log_out"
                )}`}</Box>
              </MenuItem>
            </Menu>
          </div>
          <div className={styles.profile}>
            <LanguageList />
          </div>
        </div>
      </div>
    </div>
  );
}
