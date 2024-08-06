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
  ListItemButton,
  ListItemIcon,
  Divider,
  Typography,
  Pagination,
} from '@mui/material';
import Loading from '../../components/Loading';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
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
import AxiosInstance from '../../components/helpers/AxiosInstance';
import NotFound from '../../components/NotFound';
const instance = AxiosInstance();
const CustomListItemButton = styled(ListItemButton)({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  '& .css-cveggr-MuiListItemIcon-root': {
    minWidth: '40px',
  },
  color: 'var(--dark-color)',
  border: 'none',
  height: '30px',
  '&:hover': {
    color: 'var(--primary-color)',
    '& svg': {
      color: 'var(--primary-color)',
    },
  },
});
const CustomTypography = styled(Typography)({
  fontSize: '12px',
  fontWeight: '800',
  cursor: 'pointer',
});
export default function Employees() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleActionClick = (event) => {
    event.stopPropagation(); //to prevent the RowClick in this column only
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAction = () => {
    setAnchorEl(null);
  };
  const handleRowClick = (id) => {
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
                  width: '150px',
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
                <CustomListItemButton>
                  <ListItemIcon>
                    <PlayCircleFilledWhiteIcon
                      sx={{ color: 'var(--dark-color)', fontSize: '18px' }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.start')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton>
                  <ListItemIcon>
                    <SendIcon
                      sx={{ color: 'var(--dark-color)', fontSize: '18px' }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.send')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton>
                  <ListItemIcon>
                    <LoopIcon
                      sx={{ color: 'var(--dark-color)', fontSize: '18px' }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.resend')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton>
                  <ListItemIcon>
                    <PauseCircleIcon
                      sx={{ color: 'var(--dark-color)', fontSize: '18px' }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.stop')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton>
                  <ListItemIcon>
                    <CancelIcon
                      sx={{ color: 'var(--dark-color)', fontSize: '18px' }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.close')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton>
                  <ListItemIcon>
                    <BorderColorIcon
                      sx={{ color: 'var(--dark-color)', fontSize: '18px' }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <CustomTypography>{t('employees.edit')}</CustomTypography>
                  </ListItemText>
                </CustomListItemButton>
                <Divider />
                <CustomListItemButton>
                  <ListItemIcon>
                    <DeleteForeverIcon
                      sx={{ color: 'var(--dark-color)', fontSize: '18px' }}
                    />
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

  const [pageNumber, setPageNumber] = useState(1);
  const [pagination, setPagination] = useState({
    page: pageNumber,
    pageCount: 1,
  });
  const [employeeData, setEmployeeData] = useState([]);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await instance.post(`/Employee/GetAllData`, {
        pageSize: 10,
        pageNumber: pageNumber,
      });
      setEmployeeData(response.data);
      setRows(response.data.data);
      setTotalCount(response.data.totalCount);
      setPagination({
        page: pageNumber,
        pageCount: Math.ceil(response.data.totalCount / 10),
      });
      setLoading(false);
    } catch (error) {
      setError(error);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };
  const [view, setView] = useState(
    () => localStorage.getItem('view') || 'list'
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
              alignItems: 'center',
              gap: '15px',
            }}
          >
            <Box>
              <Pagination
                count={pagination.pageCount}
                page={pageNumber}
                defaultPage={1}
                siblingCount={0}
                onChange={handlePageChange}
                sx={{ mb: '5px' }}
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
  }, [
    navigate,
    pageNumber,
    pagination.pageCount,
    setAdditionalNavbarItems,
    view,
  ]);
  return (
    <div>
      {error ? (
        <NotFound />
      ) : loading ? (
        <Loading />
      ) : view === 'list' ? (
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
              // rowsPerPageOptions={[10]}
              // page={pageNumber - 1}
              rows={rows}
              columns={columns}
              pageSize={10}
              rowCount={totalCount}
              paginationMode="server"
              loading={loading}
              onRowClick={(params) => handleRowClick(params.id)}
              onPageChange={handlePageChange}
              checkboxSelection
              autoHeight
              disableRowSelectionOnClick
              getRowId={(rowData) => {
                return rowData.id;
              }}
            />
          </div>
        </>
      ) : (
        <List
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'start',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {rows &&
            rows?.map((row) => (
              <ListItem
                sx={{
                  width: '49.5%',
                  minWidth: '250px',
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
