// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Tooltip, Box, List, ListItem, ListItemText } from '@mui/material';
// import ViewListIcon from '@mui/icons-material/ViewList';
// import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
// import CustomPagination from './CustomPagination';
// import SearchBar from '../SearchBar';
// import { PageHeader } from '../../pages/Employees/Employees';
// const ViewSwitcher = ({ rows, columns}) => {
// const [pagination, setPagination] = useState({
//     page: 0,
//     pageCount: Math.ceil(rows?.length / 10),
//     hasPrevPage: false,
//     hasNextPage: true,
//     });
//     const onPageChange = (page) => {
//     if (page < 0) {
//         page = 0;
//     }
//     page = Math.min(Math.max(page, 0), pagination.pageCount - 1);
//     const newPagination = {
//         ...pagination,
//         page,
//         hasPrevPage: page > 0,
//         hasNextPage: page < pagination.pageCount - 1,
//     };
//     setPagination(newPagination);
//     };
//   const [view, setView] = useState(() => localStorage.getItem('view') || 'kanban');

//   const handleViewChange = (newView) => {
//     setView(newView);
//   };

//   useEffect(() => {
//     localStorage.setItem('view', view);
//   }, [view]);
//   const visibleRows = rows?.slice(pagination.page * 10, (pagination.page + 1) * 10);

//   return (
//     <>
//         <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center",flexWrap:"wrap", width:"100%" }}>
//             <Box>
//                 <PageHeader />
//             </Box>
//             <Box>
//                 <SearchBar />
//             </Box>
//             <Box>
//                 <CustomPagination pagination={pagination} onPageChange={onPageChange}/>
//             </Box>
//             <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
//             <div>
//                 <Tooltip title="list">
//                 <ViewListIcon sx={{ color: view === 'list' ? "var(--primary-color)" : "var(--secondary-color)", fontSize: "30px", cursor: "pointer" }} onClick={() => handleViewChange('list')} />
//                 </Tooltip>
//             </div>
//             <div>
//                 <Tooltip title="kanban">
//                 <ViewKanbanIcon sx={{ color: view === 'kanban' ? "var(--primary-color)" : "var(--secondary-color)", fontSize: "30px", cursor: "pointer" }} onClick={() => handleViewChange('kanban')} />
//                 </Tooltip>
//             </div>
//             </Box>
//         </Box>

//         {view === 'list' && (
//         <>
//             <div style={{ height: 450, width: '100%' }}>
//             <DataGrid
//                 sx={{
//                 "& .MuiDataGrid-footerContainer": {
//                     display: "none !important",
//                 },
//                 "& .css-1iyq7zh-MuiDataGrid-columnHeaders": {
//                     backgroundColor:"#f8f8f8",
//                 },
//                 "& .css-t89xny-MuiDataGrid-columnHeaderTitle": {
//                     fontSize:"16px",
//                     fontWeight:"bold",
//                 },
//                 }}
//                 rows={visibleRows}
//                 columns={columns}
//                 pagination
//                 components={{
//                 Pagination: () => <CustomPagination pagination={pagination} onPageChange={onPageChange} />,
//                 }}
//                 pageSize={10}
//                 checkboxSelection
//                 disableRowSelectionOnClick
//                 getRowId={(rowData) => {
//                     return rowData.id;
//                 }}
//             />
//             </div>
//         </>
//         )}
//         {view === 'kanban' && (
//         <List sx={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "10px" }}>
//             {visibleRows?.map((row) => (
//             <ListItem sx={{ width: "48%", minWidth: "250px", maxWidth: "600px", border: "1px solid var(--secondary-color)" }} key={row.id}>
//                 {columns.map((column) => (
//                 <ListItemText
//                     key={column.field}
//                     primary={column.headerName}
//                     secondary={row[column.field]}
//                 />
//                 ))}
//             </ListItem>
//             ))}
//         </List>
//         )}
//     </>
//   );
// };
// export default ViewSwitcher;
