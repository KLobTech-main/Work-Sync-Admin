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
  TextField,
  Button,
  Box
} from '@mui/material';
import { useLocation } from 'react-router-dom';

const SubAdminAttendance = () => {
  const location = useLocation(); // Get the current location object

  // Extract the email from the query string using URLSearchParams
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email'); // Get the email parameter from the URL query

  // Sample attendance data
  const attendanceData = [
    { email: 'admin1@example.com', name: 'Admin One', date: '2024-12-01', status: 'Present' },
    { email: 'admin2@example.com', name: 'Admin Two', date: '2024-12-01', status: 'Absent' },
    { email: 'admin1@example.com', name: 'Admin One', date: '2024-12-02', status: 'Absent' },
    { email: 'admin3@example.com', name: 'Admin Three', date: '2024-12-02', status: 'Present' },
    { email: 'admin1@example.com', name: 'Admin One', date: '2024-12-03', status: 'Present' },
    { email: 'admin2@example.com', name: 'Admin Two', date: '2024-12-03', status: 'Present' },
    { email: 'admin1@example.com', name: 'Admin One', date: '2024-12-04', status: 'Present' },
    { email: 'admin2@example.com', name: 'Admin Two', date: '2024-12-04', status: 'Absent' },
    { email: 'admin1@example.com', name: 'Admin One', date: '2024-12-05', status: 'Absent' },
    { email: 'admin3@example.com', name: 'Admin Three', date: '2024-12-05', status: 'Present' },
    { email: 'admin1@example.com', name: 'Admin One', date: '2024-12-06', status: 'Present' },
    { email: 'admin2@example.com', name: 'Admin Two', date: '2024-12-06', status: 'Present' },
    { email: 'admin1@example.com', name: 'Admin One', date: '2024-12-07', status: 'Absent' },
    { email: 'admin2@example.com', name: 'Admin Two', date: '2024-12-07', status: 'Present' },
    { email: 'admin1@example.com', name: 'Admin One', date: '2024-12-08', status: 'Present' },
    { email: 'admin3@example.com', name: 'Admin Three', date: '2024-12-08', status: 'Absent' },
  ];

  // Filter attendance data by the email from query parameters
  const filteredAttendance = attendanceData.filter((record) => record.email === email);

  // Pagination state
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Filter state for searching by date
  const [selectedDate, setSelectedDate] = useState('');

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle resetting the date filter
  const handleReset = () => {
    setSelectedDate('');
  };

  // Filter data based on selected date
  const dateFilteredAttendance = selectedDate
    ? filteredAttendance.filter((record) => record.date === selectedDate)
    : filteredAttendance;

  // Slice the filtered attendance data for the current page
  const currentPageData = dateFilteredAttendance.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // If there's at least one record, get the name from the first record
  const adminName = filteredAttendance.length > 0 ? filteredAttendance[0].name : email;

  return (
    <div className="p-6">
    <div className='flex justify-between items-center py-4'>

      <Typography variant="h4" gutterBottom>
        Attendance for {adminName}
      </Typography>

      
      {/* Date Filter */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', marginBottom: 2 }}>
        <TextField
          label="Search by Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          variant="outlined"
          sx={{ width: '250px' }}
        />
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </div>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No attendance records found for this email.
                  </TableCell>
                </TableRow>
              ) : (
                currentPageData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.email}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        component="div"
        count={dateFilteredAttendance.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </div>
  );
};

export default SubAdminAttendance;
