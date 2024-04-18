import React, { useState } from 'react'
import ModuleHeader from '../../components/utilities/ModuleHeader'
import HeaderBtn from '../../components/utilities/HeaderBtn'
import { Box } from "@mui/material";
import AdvancedSearch from '../../components/utilities/AdvancedSearch';
import SearchBar from '../../components/SearchBar';
import ViewSwitcher from '../../components/utilities/ViewSwitcher';
const cellStatusActive = {
  width:'70px',
  borderRadius:'5px',
  height:"40px",
  display:'grid',
  placeItems:'center',
  color:'var(--secondary-color)',
  backgroundColor:'var(--primary-color)'
};
const cellStatusPending = {
  width:'70px',
  borderRadius:'5px',
  height:"40px",
  display:'grid',
  placeItems:'center',
  color:'var(--primary-color)',
  backgroundColor:'var(--secondary-color)'
};
export default function Employees() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 100 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'status', headerName: 'Status', width: 200,
    renderCell: ({ row }) => {
      return (
        <strong>
          {row.status === 'active' ?
          <Box sx={cellStatusActive}>
            Active
          </Box>
          : row.status === 'pending' ?  
          <Box sx={cellStatusPending}>
            Pending
          </Box>
          : <Box>No Status</Box>
        }
        </strong>
      );
    }, },
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
  return (
    <div>
      <ModuleHeader>
        <Box>
          <HeaderBtn>New</HeaderBtn>
          Employees
        </Box>
        <Box>
          <SearchBar />
        </Box>
      </ModuleHeader>
      <ViewSwitcher rows={rows} columns={columns} />
    </div>
  )
}


