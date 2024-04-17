import React, { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { List, ListItem, ListItemText } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import Tooltip from '@mui/material/Tooltip';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row?.firstName || ''} ${row?.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
const Dashboard = () => {
const [view, setView] = useState(() => localStorage.getItem('view') || 'kanban');
  const handleViewChange = (newView) => {
    setView(newView);
  };
  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);
  console.log('view', view);
  return (
    <div>
      <div style={{ marginBottom: '1rem',display:"flex",gap:"10px" }}>
        <Tooltip title="List">
        <ViewListIcon sx={{color:view === 'list'?"var(--secondary-color)":"var(--primary-color)",fontSize:"30px",cursor:"pointer"}} onClick={() => handleViewChange('kanban')} />
        </Tooltip>
        <Tooltip title="Kanban">
        <ViewKanbanIcon sx={{color:view === 'kanban'?"var(--secondary-color)":"var(--primary-color)",fontSize:"30px",cursor:"pointer"}} onClick={() => handleViewChange('list')} />
        </Tooltip>
      </div>
      {view === 'kanban' && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      )}
      {view === 'list' && (
        <List sx={{width:"100%",display:"flex",flexWrap:"wrap",gap:"10px"}}>
          {rows.map((row) => (
            <ListItem sx={{width:"48%",minWidth:"250px",maxWidth:"600px",border:"1px solid var(--secondary-color)"}} key={row.id}>
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
};
export default Dashboard;
