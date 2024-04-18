import React, { useState } from 'react';
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Input, Button, Popover, Paper, Box } from '@mui/material';
import  FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

const SearchButton = styled(Button)`
  height: 100%;
  border-left: 1px solid var(--primary-color);
  width: 15px !important;
`;
const SearchInput = styled(Input)`
  width: 300px;
  min-width: 280px;
  height: 45px;
  border-radius: 12px !important;
  font-size: 21px;
`;
const searchInputIcon = {
  position: "absolute",
  right: 0,
  minWidth: "45px !important",
};
export default function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation("layout");
  const { i18n } = useTranslation();
  const { language } = i18n;
  const { searchBarInput, setSearchBarInput, handleSearchSubmit } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit();
    setSearchBarInput("");
  };
  const handleOpenActions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the actions popup
  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div>
      <Box sx={{display:"flex",position:"relative",overflow:"hidden"}}>
        <form onSubmit={handleSubmit}>
          <SearchInput
            style={{ paddingInline: "20px",border:"1px solid var(--primary-color)" }}
            disableUnderline
            value={searchBarInput}
            size="md"
            placeholder={t("navbar.search")}
            onChange={(e) => setSearchBarInput(e.target.value)}
            dir={language === "ar" ? "rtl" : "ltr"}
          />
          <SearchButton sx={searchInputIcon} onClick={handleOpenActions}>
            <ExpandMoreIcon
              sx={{
                color: "var(--primary-color)",
                size: "large",
              }}
            />
          </SearchButton>
          <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseActions}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper style={{ padding: '20px',width:'300px',display:'flex',justifyContent:'space-between',alignItems:'center' }}>         
        <div><FilterAltIcon />Filter</div>
        <div><AutoAwesomeMotionIcon />Group By</div>
        </Paper>
      </Popover>
        </form>
      </Box>
    </div>
  );
}
