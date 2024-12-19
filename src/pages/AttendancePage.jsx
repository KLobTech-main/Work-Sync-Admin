import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Box,
  TablePagination,
  Button,
} from '@mui/material';

const AttendancePage = () => {
  const { state } = useLocation(); 
  const { employee } = state || {}; 

  const [selectedDate, setSelectedDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const attendanceData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-12-01', punchIn: '09:00', punchOut: '18:00' },
    { id: 2, name: 'John Doe', email: 'john@example.com', date: '2024-12-02', punchIn: '09:30', punchOut: '18:30' },
    { id: 3, name: 'Jane Doe', email: 'jane@example.com', date: '2024-12-01', punchIn: '08:45', punchOut: '17:45' },
    { id: 4, name: 'Jane Doe', email: 'jane@example.com', date: '2024-12-02', punchIn: '09:00', punchOut: '18:00' },
  ];

  // Filter attendance data based on employee email and selected date
  const filteredAttendance = attendanceData.filter((attendance) => {
    const matchesEmail = employee && attendance.email === employee.email;
    const matchesDate = selectedDate ? attendance.date === selectedDate : true;
    return matchesEmail && matchesDate;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleReset = () => {
    setSelectedDate('');
    setPage(0);
  };

  useEffect(() => {
    if (employee) {
      console.log("Employee Data:", employee);
    } else {
      console.log("No employee data found in state.");
    }
  }, [employee]);

  if (!employee) {
    return (
      <Typography variant="h6" color="error" align="center">
        Employee not found
      </Typography>
    );
  }

  return (
    <div className="p-6" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flexGrow: 1 }}>
        <div className="flex justify-between py-5">
          <Typography variant="h4" gutterBottom>
            {employee.name}'s Attendance Details
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attendance ID</TableCell>
                  <TableCell>Name </TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Punch In</TableCell>
                  <TableCell>Punch Out</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAttendance.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No attendance records found for this employee.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttendance.map((attendance) => (
                    <TableRow key={attendance.id}>
                      <TableCell>{attendance.id}</TableCell>
                      <TableCell>{attendance.name }</TableCell>
                      <TableCell>{attendance.date}</TableCell>
                      <TableCell>{attendance.punchIn}</TableCell>
                      <TableCell>{attendance.punchOut}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={filteredAttendance.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default AttendancePage;
