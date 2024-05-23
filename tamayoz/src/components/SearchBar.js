import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ExpandMore as ExpandMoreIcon, Height } from '@mui/icons-material';
import {
  Input,
  Button,
  Popover,
  Paper,
  Box,
  Typography,
  Divider,
  Menu,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
const CategoryGroup = styled(Box)`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  gap: 5px;
  width: 30%;
  font-size: 14px;
`;
const CategoryHeader = styled(Box)`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  width: 100%;
  height: 100%;
`;
const SearchTypography = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
`;
const SearchItem = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
`;
const SearchButton = styled(Button)`
  height: 100%;
  border-left: 1px solid var(--primary-color);
  width: 15px !important;
`;
const SearchInput = styled(Input)`
  width: 300px;
  min-width: 280px;
  height: 35px;
  border: 1px solid var(--primary-color);
  border-radius: 5px;
  font-size: 18px;
  padding-inline: 45px;
`;
const expandSearchIcon = {
  position: 'absolute',
  right: 0,
  minWidth: '45px !important',
};
const searchInputIcon = {
  position: 'absolute',
  left: 0,
  minWidth: '45px !important',
};
const searchitem = {
  padding: '3px 0px',
  fontSize: '14px',
  fontWeight: 'bold',
};
const paperDesign = {
  marginTop: '5px',
  padding: '20px',
  width: '600px',
  scrollable: true,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  border: '1px solid #ccc',
  '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
    boxShadow: 'none !important',
  },
};
export default function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation('layout');
  const { i18n } = useTranslation();
  const { language } = i18n;
  const { searchBarInput, setSearchBarInput, handleSearchSubmit } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchSubmit();
    setSearchBarInput('');
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
      <Box sx={{ display: 'flex', position: 'relative', overflow: 'hidden' }}>
        <form onSubmit={handleSubmit}>
          <SearchInput
            disableUnderline
            value={searchBarInput}
            size="md"
            placeholder={t('navbar.search')}
            onChange={(e) => setSearchBarInput(e.target.value)}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
          <SearchButton sx={expandSearchIcon} onClick={handleOpenActions}>
            <ExpandMoreIcon
              sx={{
                color: 'var(--primary-color)',
                fontSize: '25px',
              }}
            />
          </SearchButton>
          <SearchButton sx={searchInputIcon}>
            <SearchIcon
              sx={{
                color: 'var(--primary-color)',
                fontSize: '25px',
              }}
            />
          </SearchButton>
          <Menu
            sx={{
              '& .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
                boxShadow: 'none !important',
              },
            }}
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseActions}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box sx={paperDesign}>
              <CategoryGroup>
                <CategoryHeader>
                  <FilterAltIcon sx={{ color: 'var(--primary-color)' }} />
                  <Box>
                    <SearchTypography>Filter</SearchTypography>
                  </Box>
                </CategoryHeader>
                <Box sx={searchitem}>
                  <SearchItem>Upcoming Appraisals</SearchItem>
                </Box>
                <Divider flexItem />
                <Box>
                  <Box sx={searchitem}>
                    <SearchItem>On Time Off</SearchItem>
                  </Box>
                  <Box sx={searchitem}>
                    <SearchItem>At Work</SearchItem>
                  </Box>
                </Box>
                <Divider flexItem />
                <Box>
                  <Box sx={searchitem}>
                    <SearchItem>My Team</SearchItem>
                  </Box>
                  <Box sx={searchitem}>
                    <SearchItem>My Department</SearchItem>
                  </Box>
                </Box>
                <Divider flexItem />
                <Box>
                  <Box sx={searchitem}>
                    <SearchItem>Newly Hired</SearchItem>
                  </Box>
                </Box>
                <Divider flexItem />
                <Box>
                  <Box sx={searchitem}>
                    <SearchItem>Fixed Hours</SearchItem>
                  </Box>
                  <Box sx={searchitem}>
                    <SearchItem>Flexible Hours</SearchItem>
                  </Box>
                </Box>
                <Divider flexItem />
                <Box>
                  <Box sx={searchitem}>
                    <SearchItem>Archived</SearchItem>
                  </Box>
                </Box>
              </CategoryGroup>
              <Divider orientation="vertical" variant="middle" flexItem />
              <CategoryGroup>
                <CategoryHeader>
                  <AutoAwesomeMotionIcon sx={{ color: 'var(--dark-color)' }} />
                  <Box>
                    <SearchTypography>Group By</SearchTypography>
                  </Box>
                </CategoryHeader>
                <Box>
                  <SearchItem sx={searchitem}>Manager</SearchItem>
                  <SearchItem sx={searchitem}>Presence</SearchItem>
                  <SearchItem sx={searchitem}>Department</SearchItem>
                </Box>
                <Divider flexItem />
                <Box>
                  <Box>
                    <SearchItem sx={searchitem}>Work Location</SearchItem>
                    <SearchItem sx={searchitem}>Job</SearchItem>
                    <SearchItem sx={searchitem}>Skills</SearchItem>
                    <SimpleTreeView>
                      <TreeItem itemId="start-date" label="Start Date">
                        <TreeItem itemId="year" label="Year" />
                        <TreeItem itemId="quarter" label="Quarter" />
                        <TreeItem itemId="month" label="Month" />
                        <TreeItem itemId="week" label="Week" />
                        <TreeItem itemId="day" label="Day" />
                      </TreeItem>
                      <TreeItem itemId="new-appraisal" label="New Appraisal">
                        <TreeItem itemId="year-appraisal" label="Year" />
                        <TreeItem itemId="quarter-appraisal" label="Quarter" />
                        <TreeItem itemId="month-appraisal" label="Month" />
                        <TreeItem itemId="week-appraisal" label="Week" />
                        <TreeItem itemId="day-appraisal" label="Day" />
                      </TreeItem>
                    </SimpleTreeView>
                    <SearchItem sx={searchitem}>Tags</SearchItem>
                  </Box>
                  <Divider flexItem />
                  <Box>
                    <SearchItem sx={searchitem}>
                      # Dependent Children ...
                    </SearchItem>
                  </Box>
                </Box>
              </CategoryGroup>
              <Divider orientation="vertical" variant="middle" flexItem />
              <CategoryGroup>
                <CategoryHeader>
                  <FavoriteIcon sx={{ color: '#b30000' }} />
                  <Box>
                    <SearchTypography>Favorites</SearchTypography>
                  </Box>
                </CategoryHeader>
                <Divider flexItem />
                <Box>
                  <Box sx={searchitem}>
                    <SearchItem>My Team</SearchItem>
                  </Box>
                  <Box sx={searchitem}>
                    <SearchItem>My Department</SearchItem>
                  </Box>
                </Box>
                <Divider flexItem />
                <Box>
                  <Box sx={searchitem}>
                    <SearchItem>Newly Hired</SearchItem>
                  </Box>
                </Box>
                <Divider flexItem />
                <Box>
                  <Box sx={searchitem}>
                    <SearchItem>Fixed Hours</SearchItem>
                  </Box>
                  <Box sx={searchitem}>
                    <SearchItem>Flexible Hours</SearchItem>
                  </Box>
                </Box>
                <Divider flexItem />
                <Box>
                  <Box sx={searchitem}>
                    <SearchItem>Archived</SearchItem>
                  </Box>
                </Box>
              </CategoryGroup>
            </Box>
          </Menu>
        </form>
      </Box>
    </div>
  );
}
