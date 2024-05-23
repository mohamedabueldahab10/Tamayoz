import React, { useState } from 'react';
import ViewSwitcher from '../../components/utilities/ViewSwitcher';
const Dashboard = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

  const [rows] = useState(() => {
    const initialRows = [];
    for (let i = 1; i <= 20; i++) {
      initialRows.push({
        id: i,
        firstName: `John ${i}`,
        lastName: `Doe ${i}`,
        age: Math.floor(Math.random() * 80) + 20,
        email: `john${i}@example.com`,
      });
    }
    return initialRows;
  });
  return (
    <div>
      <ViewSwitcher rows={rows} columns={columns} />
    </div>
  );
};
export default Dashboard;
