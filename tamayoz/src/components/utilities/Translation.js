import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArabicFlagSVG, EnglishFlagSVG } from '../icons';
export default function Translation({ isMobile }) {
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
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          width: '40px',
        }}
      >
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 35.155 33"
          >
            <g transform="translate(-2.3 -3)">
              <path
                d="M11.134,16.5,10,20.015h2.268Z"
                transform="translate(1.032 1.809)"
                fill={isMobile ? 'var(--primary-color)' : '#fff'}
              />
              <path
                d="M34.053,3H15.908V8.67h4.536v2.268H5.7a3.341,3.341,0,0,0-3.4,3.4V26.814a3.341,3.341,0,0,0,3.4,3.4H6.836V36l7.144-5.784h7.6V22.278H34.053a3.341,3.341,0,0,0,3.4-3.4V6.4A3.341,3.341,0,0,0,34.053,3ZM14.547,25.567l-.567-1.814H10.465l-.68,1.814H7.063l3.742-10.093h2.722l3.742,10.093Zm17.237-8.959v2.268a10.239,10.239,0,0,1-4.423-1.134,12.155,12.155,0,0,1-4.536,1.134l-.113-2.268a8.633,8.633,0,0,0,2.381-.34,7.747,7.747,0,0,1-2.041-3.629h2.381a5.7,5.7,0,0,0,1.814,2.495,5.866,5.866,0,0,0,2.155-4.2H22.6V8.67H26V6.4h2.268V8.67h3.742L32.125,9.8a8.622,8.622,0,0,1-2.495,6.464A7.706,7.706,0,0,0,31.785,16.608Z"
                fill={isMobile ? '#fff' : 'var(--primary-color)'}
              />
            </g>
          </svg>
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
          button="true"
          onClick={() => changeLanguage('en')}
          selected={language === 'en'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '7px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '5px',
            }}
          >
            <Box sx={{ width: '15px', height: '15px' }}>
              <EnglishFlagSVG />
            </Box>
            <Box sx={{ fontSize: '.70em', pt: '2px' }}>EN</Box>
          </Box>
        </MenuItem>
        <MenuItem
          button="true"
          onClick={() => changeLanguage('ar')}
          selected={language === 'ar'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '7px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '5px',
            }}
          >
            <Box sx={{ width: '15px', height: '15px' }}>
              <ArabicFlagSVG />
            </Box>
            <Box sx={{ fontSize: '.70em', pt: '2px' }}>AR</Box>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
}
