import React, { useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { useParams } from 'react-router-dom';

const SubAdminLeave = () => {
  const { id } = useParams(); // Get the admin ID from URL
  
  // Sample leave requests
  const leaveRequests = [
    { id: 1, name: 'Admin One', leaveDate: '2024-12-05', status: 'Approved' },
    { id: 2, name: 'Admin Two', leaveDate: '2024-12-10', status: 'Pending' },
    { id: 3, name: 'Admin One', leaveDate: '2024-12-11', status: 'Pending' },
    { id: 4, name: 'Admin Three', leaveDate: '2024-12-12', status: 'Approved' },
    { id: 5, name: 'Admin Two', leaveDate: '2024-12-13', status: 'Approved' },
    { id: 6, name: 'Admin One', leaveDate: '2024-12-14', status: 'Pending' },
    { id: 7, name: 'Admin Two', leaveDate: '2024-12-15', status: 'Approved' },
    { id: 8, name: 'Admin Three', leaveDate: '2024-12-16', status: 'Approved' },
    { id: 9, name: 'Admin One', leaveDate: '2024-12-17', status: 'Pending' },
    { id: 10, name: 'Admin Two', leaveDate: '2024-12-18', status: 'Pending' },
    { id: 11, name: 'Admin One', leaveDate: '2024-12-19', status: 'Approved' },
    { id: 12, name: 'Admin Three', leaveDate: '2024-12-20', status: 'Pending' },
  ];

  // Filter leave requests based on admin ID
  const adminLeaveRequests = leaveRequests.filter(request => request.id === parseInt(id));

  // Extract admin name (assumes first match is correct)
  const adminName = adminLeaveRequests.length > 0 ? adminLeaveRequests[0].name : `Admin ${id}`;

  // Pagination state
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Slice the filtered leave requests for the current page
  const currentPageData = adminLeaveRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Leave  for {adminName}
      </Typography>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Leave Date</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No leave found for this Sub Admin.
                  </TableCell>
                </TableRow>
              ) : (
                currentPageData.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.leaveDate}</TableCell>
                    <TableCell>{request.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        component="div"
        count={adminLeaveRequests.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </div>
  );
};

export default SubAdminLeave;
