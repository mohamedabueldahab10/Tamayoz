import React, { useEffect, useState } from 'react';
import ModuleHeader from '../../components/utilities/ModuleHeader';
import HeaderBtn from '../../components/utilities/HeaderBtn';
import { DataGrid } from '@mui/x-data-grid';
import {
  Tooltip,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  ListItemButton,
  ListItemIcon,
  MenuList,
  Divider,
  Typography,
} from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import CustomPagination from '../../components/utilities/CustomPagination';
import SearchBar from '../../components/SearchBar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TypographyHeader from '../../components/utilities/TypographyHeader';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import SendIcon from '@mui/icons-material/Send';
import LoopIcon from '@mui/icons-material/Loop';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from 'styled-components';
const cellStatusActive = {
  width: '70px',
  borderRadius: '5px',
  height: '40px',
  display: 'grid',
  placeItems: 'center',
  color: 'var(--secondary-color)',
  backgroundColor: 'var(--primary-color)',
};
const cellStatusPending = {
  width: '70px',
  borderRadius: '5px',
  height: '40px',
  display: 'grid',
  placeItems: 'center',
  color: 'var(--primary-color)',
  backgroundColor: 'var(--secondary-color)',
};
const CustomListItemButton = styled(ListItemButton)({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  '& .css-cveggr-MuiListItemIcon-root': {
    minWidth: '40px',
  },
  height: '30px',
  color: 'var(--dark-color)',
  '&:hover': {
    color: 'var(--primary-color)', // Change text color on hover
    '& svg': {
      color: 'var(--primary-color)', // Change icon color on hover
    },
  },
});
const CustomTypography = styled(Typography)({
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
});

export default function Employees() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 100 },
    { field: 'email', headerName: 'Email', width: 300 },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: ({ row }) => {
        return (
          <strong>
            {row.status === 'active' ? (
              <Box sx={cellStatusActive}>Active</Box>
            ) : row.status === 'pending' ? (
              <Box sx={cellStatusPending}>Pending</Box>
            ) : (
              <Box>No Status</Box>
            )}
          </strong>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: ({ row }) => {
        return (
          <strong>
            <IconButton
              aria-label="more"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{
                '& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper': {
                  boxShadow: 'none',
                },
              }}
            >
              <List
                sx={{
                  width: '130px',
                  maxHeight: '250px',
                  border: '1.5px solid #555',
                  borderRadius: '5px',
                  zIndex: '100',
                  height: '200px',
                  overflowX: 'hidden',
                  '&::scrollbar': {
                    width: '5px',
                  },
                  scrollbarWidth: 'thin',
                  overflowY: 'auto',
                }}
                onClick={() => setAnchorEl(false)}
              >
                <CustomListItemButton sx={{ height: '30px' }}>
                  <ListItemIcon>
                    <PlayCircleFilledWhiteIcon
                      sx={{ color: 'var(--dark-color)' }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.start')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton sx={{ height: '30px' }}>
                  <ListItemIcon>
                    <SendIcon sx={{ color: 'var(--dark-color)' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.send')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton sx={{ height: '30px' }}>
                  <ListItemIcon>
                    <LoopIcon sx={{ color: 'var(--dark-color)' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.resend')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton sx={{ height: '30px' }}>
                  <ListItemIcon>
                    <PauseCircleIcon sx={{ color: 'var(--dark-color)' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.stop')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton sx={{ height: '30px' }}>
                  <ListItemIcon>
                    <CancelIcon sx={{ color: 'var(--dark-color)' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.close')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton sx={{ height: '30px' }}>
                  <ListItemIcon>
                    <BorderColorIcon sx={{ color: 'var(--dark-color)' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.edit')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton sx={{ height: '30px' }}>
                  <ListItemIcon>
                    <DeleteForeverIcon sx={{ color: 'var(--dark-color)' }} />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.delete')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
              </List>
            </Menu>
          </strong>
        );
      },
    },
  ];

  const [rows] = useState(() => {
    const initialRows = [];
    for (let i = 1; i <= 20; i++) {
      let statusOptions = ['active', 'pending'];
      let randomStatusIndex = Math.floor(Math.random() * statusOptions.length);
      initialRows.push({
        id: i,
        firstName: `John ${i}`,
        lastName: `Doe ${i}`,
        age: Math.floor(Math.random() * 80) + 20,
        email: `john${i}@example.com`,
        status: `${statusOptions[randomStatusIndex]}`,
      });
    }
    return initialRows;
  });
  const [pagination, setPagination] = useState({
    page: 0,
    pageCount: Math.ceil(rows?.length / 10),
    hasPrevPage: false,
    hasNextPage: true,
  });
  const onPageChange = (page) => {
    if (page < 0) {
      page = 0;
    }
    page = Math.min(Math.max(page, 0), pagination.pageCount - 1);
    const newPagination = {
      ...pagination,
      page,
      hasPrevPage: page > 0,
      hasNextPage: page < pagination.pageCount - 1,
    };
    setPagination(newPagination);
  };
  const [view, setView] = useState(
    () => localStorage.getItem('view') || 'kanban'
  );

  const handleViewChange = (newView) => {
    setView(newView);
  };

  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);
  const visibleRows = rows?.slice(
    pagination.page * 10,
    (pagination.page + 1) * 10
  );
  const { t } = useTranslation('modules');
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('currentPage', location.pathname);
    return () => {
      localStorage.removeItem('currentPage');
    };
  }, [location.pathname]);
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Box>
          <TypographyHeader>{t('employees.name')}</TypographyHeader>
        </Box>
        <Box>
          <SearchBar />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        <Box>
          <ModuleHeader>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <HeaderBtn onClick={() => navigate('/employees/new_employee')}>
                {t('employees.new')}
              </HeaderBtn>
            </Box>
          </ModuleHeader>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'end',
            gap: '10px',
          }}
        >
          <Box>
            <CustomPagination
              pagination={pagination}
              onPageChange={onPageChange}
            />
          </Box>
          <div>
            <Tooltip title="list">
              <ViewListIcon
                sx={{
                  color:
                    view === 'list'
                      ? 'var(--primary-color)'
                      : 'var(--secondary-color)',
                  fontSize: '30px',
                  cursor: 'pointer',
                }}
                onClick={() => handleViewChange('list')}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="kanban">
              <ViewKanbanIcon
                sx={{
                  color:
                    view === 'kanban'
                      ? 'var(--primary-color)'
                      : 'var(--secondary-color)',
                  fontSize: '30px',
                  cursor: 'pointer',
                }}
                onClick={() => handleViewChange('kanban')}
              />
            </Tooltip>
          </div>
        </Box>
      </Box>

      {view === 'list' && (
        <>
          <div style={{ height: 450, width: '100%' }}>
            <DataGrid
              sx={{
                '& .MuiDataGrid-footerContainer': {
                  display: 'none !important',
                },
                '& .css-1iyq7zh-MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8f8f8',
                },
                '& .css-t89xny-MuiDataGrid-columnHeaderTitle': {
                  fontSize: '16px',
                  fontWeight: 'bold',
                },
              }}
              rows={visibleRows}
              columns={columns}
              pagination
              components={{
                Pagination: () => (
                  <CustomPagination
                    pagination={pagination}
                    onPageChange={onPageChange}
                  />
                ),
              }}
              pageSize={10}
              checkboxSelection
              disableRowSelectionOnClick
              getRowId={(rowData) => {
                return rowData.id;
              }}
            />
          </div>
        </>
      )}
      {view === 'kanban' && (
        <List
          sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '10px' }}
        >
          {visibleRows?.map((row) => (
            <ListItem
              sx={{
                width: '48%',
                minWidth: '250px',
                maxWidth: '600px',
                border: '1px solid var(--secondary-color)',
              }}
              key={row.id}
            >
              {columns.map((column) => (
                <ListItemText
                  key={column.field}
                  primary={column.headerName}
                  secondary={row[column.field]}
                />
              ))}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
