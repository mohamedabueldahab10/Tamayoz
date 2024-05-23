import React, { useState } from 'react';
import { TextField, Button, Popover, Paper } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import StyledInputBase from './StyledInputBase';
const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle search
  const handleSearch = () => {
    // Perform search based on searchQuery, filterOption, and groupByOption
    console.log('Searching...');
  };

  // Function to handle opening the actions popup
  const handleOpenActions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the actions popup
  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', paddingInline: '0px' }}
      >
        <StyledInputBase
          sx={{ width: '300px', minWidth: '280px', borderRadius: '5px' }}
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                sx={{ minWidth: '30px', margin: '0px', width: '40px' }}
                onClick={handleOpenActions}
              >
                <ExpandMoreIcon />
              </Button>
            ),
          }}
        />

        {/* <Button variant="contained" color="primary" style={{ marginLeft: '10px' }} onClick={handleSearch}>
          Search
        </Button> */}
      </div>
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
        <Paper
          style={{
            padding: '20px',
            width: '300px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <FilterAltIcon />
            Filter
          </div>
          <div>
            <AutoAwesomeMotionIcon />
            Group By
          </div>
        </Paper>
      </Popover>
    </div>
  );
};

export default AdvancedSearch;
