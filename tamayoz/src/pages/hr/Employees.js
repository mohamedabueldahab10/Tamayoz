import React, { useContext, useEffect, useState } from 'react';
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
  CircularProgress,
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
import NavbarContext from '../../context/NavbarContext';
import { useQuery } from 'react-query';
import AxiosInstance from '../../components/helpers/AxiosInstance';
const instance = AxiosInstance();

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
  const handleActionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAction = () => {
    setAnchorEl(null);
  };
  const handleRowClick = (id) => {
    console.log(id);
    navigate(`/employees/${id}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Employee Name', width: 200 },
    { field: 'phone', headerName: 'Phone Number', width: 200 },
    {
      field: 'jobName',
      headerName: 'Job Position',
      width: 200,
    },
    { field: 'email', headerName: 'Email', width: 300 },
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
              onClick={handleActionClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseAction}
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

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const fetchData = async ({ page, pageSize }) => {
    const response = await instance.post(`/Employee/GetAllData`, {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  };
  const {
    isLoading,
    data: employeeData,
    error,
  } = useQuery('employeesdatagrid', async () => fetchData({ page, pageSize }), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  const rows = employeeData?.data || [];
  const totalCount = employeeData?.totalCount || 0;
  console.log('employeeData: ' + employeeData);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const [pagination, setPagination] = useState({
    page: 0,
    pageCount: 10,
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
  const { t } = useTranslation('modules');
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem('currentPage', location.pathname);
    return () => {
      localStorage.removeItem('currentPage');
    };
  }, [location.pathname]);
  const { setAdditionalNavbarItems } = useContext(NavbarContext);

  useEffect(() => {
    setAdditionalNavbarItems([
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              columnGap: '10px',
            }}
          >
            <Box>
              <ModuleHeader>
                <Box>
                  <HeaderBtn
                    onClick={() => navigate('/employees/new_employee')}
                  >
                    {t('employees.new')}
                  </HeaderBtn>
                </Box>
              </ModuleHeader>
            </Box>
            <Box>
              <TypographyHeader>{t('employees.name')}</TypographyHeader>
            </Box>
          </Box>
          <Box>
            <SearchBar />
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
      </Box>,
    ]);

    return () => setAdditionalNavbarItems([]);
  }, [setAdditionalNavbarItems]);
  return (
    <div>
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
                cursor: 'pointer',
              }}
              rows={rows}
              columns={columns}
              page={page}
              pageSize={pageSize}
              rowCount={totalCount}
              paginationMode="server"
              loading={isLoading}
              onRowClick={(params) => handleRowClick(params.id)}
              components={{
                Pagination: () => (
                  <CustomPagination
                    pagination={{
                      page,
                      pageCount: Math.ceil(totalCount / pageSize),
                      hasPrevPage: page > 0,
                      hasNextPage: page < Math.ceil(totalCount / pageSize) - 1,
                    }}
                    onPageChange={handlePageChange}
                  />
                ),
              }}
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
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'start',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {rows?.map((row) => (
            <ListItem
              sx={{
                width: '48%',
                minWidth: '250px',
                maxWidth: '600px',
                border: '1px solid var(--secondary-color)',
                cursor: 'pointer',
              }}
              key={row.id}
              onClick={() => handleRowClick(row.id)}
              o
            >
              {columns.slice(0, -1).map((column) => (
                <ListItemText
                  key={column.field}
                  primary={column.headerName}
                  secondary={row[column.field] || '-'}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                />
              ))}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
