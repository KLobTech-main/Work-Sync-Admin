import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const SubAdminLeave = () => {
  const { id } = useParams(); // Get the admin ID from the URL

  // Sample leave requests
  const leaveRequests = [
    { id: 1, name: 'Admin One', leaveDate: '2024-12-05', type: 'Sick Leave', status: 'Approved' },
    { id: 2, name: 'Admin Two', leaveDate: '2024-12-10', type: 'Annual Leave', status: 'Pending' },
    { id: 3, name: 'Admin One', leaveDate: '2024-12-11', type: 'Casual Leave', status: 'Pending' },
    { id: 4, name: 'Admin Three', leaveDate: '2024-12-12', type: 'Sick Leave', status: 'Approved' },
    { id: 5, name: 'Admin Two', leaveDate: '2024-12-13', type: 'Annual Leave', status: 'Approved' },
    { id: 6, name: 'Admin One', leaveDate: '2024-12-14', type: 'Casual Leave', status: 'Pending' },
    { id: 7, name: 'Admin Two', leaveDate: '2024-12-15', type: 'Sick Leave', status: 'Approved' },
    { id: 8, name: 'Admin Three', leaveDate: '2024-12-16', type: 'Annual Leave', status: 'Approved' },
    { id: 9, name: 'Admin One', leaveDate: '2024-12-17', type: 'Casual Leave', status: 'Pending' },
    { id: 10, name: 'Admin Two', leaveDate: '2024-12-18', type: 'Sick Leave', status: 'Pending' },
    { id: 11, name: 'Admin One', leaveDate: '2024-12-19', type: 'Annual Leave', status: 'Approved' },
    { id: 12, name: 'Admin Three', leaveDate: '2024-12-20', type: 'Sick Leave', status: 'Pending' },
  ];

  // Filter leave requests based on admin ID
  const adminLeaveRequests = leaveRequests.filter((request) => request.id === parseInt(id));

  // Extract admin name (assumes first match is correct)
  const adminName = adminLeaveRequests.length > 0 ? adminLeaveRequests[0].name : `Admin ${id}`;

  // State for filters and pagination
  const [filteredLeaveType, setFilteredLeaveType] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Handle filters and reset
  const handleReset = () => {
    setFilteredLeaveType('');
    setSearchDate('');
  };

  // Apply filters to the leave requests
  const filteredRequests = adminLeaveRequests.filter((request) => {
    return (
      (filteredLeaveType === '' || request.type === filteredLeaveType) &&
      (searchDate === '' || request.leaveDate === searchDate)
    );
  });

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const currentPageData = filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-6">
    <div className='flex justify-between items-center'>
      
      <Typography variant="h4" gutterBottom>
        Leave for {adminName}
      </Typography>

      {/* Filters */}
      <div className="flex gap-4 py-5"> 
        {/* Leave Type Dropdown */}
        <Select
          value={filteredLeaveType}
          onChange={(e) => setFilteredLeaveType(e.target.value)}
          displayEmpty
          variant="outlined"
          sx={{ width: '250px' }}
        >
          <MenuItem value="">All Leave Types</MenuItem>
          <MenuItem value="Sick Leave">Sick Leave</MenuItem>
          <MenuItem value="Annual Leave">Annual Leave</MenuItem>
          <MenuItem value="Casual Leave">Casual Leave</MenuItem>
        </Select>

        {/* Search by Date */}
        <TextField
          label="Search by Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          variant="outlined"
          sx={{ width: '250px' }}
        />

        {/* Reset Button */}
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>

      {/* Leave Requests Table */}
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Leave Date</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Type</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No leave found for this Sub Admin.
                  </TableCell>
                </TableRow>
              ) : (
                currentPageData.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.leaveDate}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredRequests.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </div>
  );
};

export default SubAdminLeave;
